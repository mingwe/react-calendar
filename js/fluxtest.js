//Application State
var MENU = {
    Pasta: 0,
    Salada: 1
}

//Payload
var Payload = (function () {
    function Payload(invokedActionType) {
        this.actionType = invokedActionType;
    }
    console.log('Payload');
    return Payload;
})();

//Action
var Action = {
    switchMenu: function(menu){
        Dispatcher.handleViewAction(new Payload(menu));
    }
}

//Dispatcher
var Dispatcher = {
    callbacks: [],
    handleViewAction: function(payload){
        this.dispatch(payload);
    },
    register: function(callback){
        this.callbacks.push(callback);
    },
    dispatch: function(payload){
        this.callbacks.forEach(function(cb){
            cb(payload);
        });
    }
}

//Store
var MenuStore = {
    menu: MENU.Pasta,
    listeners: [],
    getMenu: function(){
        return this.menu;
    },
    setMenu: function(menu){
        if(this.menu != menu){
            this.menu = menu;
            //emit the change
            this.listeners.forEach(function(cb){
                cb();
            });
        }
    },
    receive: function(payload){
        this.setMenu(payload.actionType);
    },
    addListener: function(callback){
        this.listeners.push(callback);
    }
};

//Context expresses the current application states to render the views.
var getContext = function(){
    return {
        menu: MenuStore.getMenu()
    }
}

//View(Header)
var Header = React.createClass({
    handleClick: function(event) {
        var selected = event.target.getAttribute("data-value");
        Action.switchMenu(selected);
    },
    render: function() {
        var self = this;
        var selected = this.props.context.menu;
        var menus = Object.keys(MENU).map(function(m){
            return {name:m, value:MENU[m], className: (MENU[m] == selected ? "menu active" : "menu")}
        });
        var nodes = menus.map(function(m){
            return <div data-value={m.value} className={m.className} onClick={self.handleClick}>{m.name}</div>;
        });
        return <div>{nodes}</div>;
    }
});


//View(Pager)
var Pager = React.createClass({
    handleClick: function(event) {
        var next = (this.props.context.menu == MENU.Pasta ? MENU.Salada : MENU.Pasta);
        Action.switchMenu(next);
    },
    render: function() {
        var arrow = (this.props.context.menu == MENU.Pasta ? ">>" : "<<");
        return <button onClick={this.handleClick}>{arrow}</button>;
    }
})

var initial = getContext();
var header = React.render(<Header context={initial} />, document.getElementById("header"));
var pager = React.render(<Pager context={initial} />, document.getElementById("pager"));

//Add Dispatcher callback
Dispatcher.register(function(payload){
    MenuStore.receive(payload);
});

//Add Store callback
MenuStore.addListener(function(){
    [header, pager].forEach(function(v){
        v.setProps({context: getContext()});
    })
})

Date.prototype.getDaysInMonth = function () {
      var here = new Date(this.getTime());
      here.setDate(32);
      return 32 - here.getDate();
};

var myMonths = [
  {
    name: 'Jan'
  },
  {
    name: 'Feb'
  },
  {
    name: 'Mar'
  },
  {
    name: 'Apr'
  },
  {
    name: 'May'
  },
  {
    name: 'Jun'
  },
  {
    name: 'Jul'
  },
  {
    name: 'Aug'
  },
  {
    name: 'Sep'
  },
  {
    name: 'Oct'
  },
  {
    name: 'Nov'
  },
  {
    name: 'Dec'
  }
];

var myEvents = [
    {
        "event_start" : "2017-09-26T06:25:24Z",
        "event_end" : "2017-09-27T06:26:24Z",
        "event_status" : "2",
        "event_title" : "some problems",
    },
    {
        "event_start" : "2017-10-04T06:25:24Z",
        "event_end" : "2017-10-06T06:26:24Z",
        "event_status" : "2",
        "event_title" : "some problems",
    },
    {
        "event_start" : "2017-11-09T21:59:59Z",
        "event_end" : "2017-12-09T23:59:59Z",
        "event_status" : "2",
        "event_title" : "big problem",
    },
    {
        "event_start" : "2017-10-05T04:13:24Z",
        "event_end" : "2017-10-05T05:13:24Z",
        "event_status" : "3",
        "event_title" : "its very big problem!"
    }
];

const DaySeconds = 86400000;

//func for formatting val to numbers from 0 to 11
function formatVal (val) {
    if (val > 11) {
        val = val - 12;
    }
    else {
        if (val < 0) {
            val = val + 12;
        }
    }
    return(val);
};

var App = React.createClass({

	render: function() {
		return (
      <div>
       <Month monthnum={myMonths}>
       </Month>
       </div>
		);
	}

});

var EventsDay = React.createClass({
   render: function() {
       return (
         <div>
             <div>Events from day:<br/>
             {new Date(this.props.params.thedate).toString()}
             </div>
         </div>
       );
   }
});

var dateNow = new Date(),
    monthCurrent = dateNow.getMonth(),
    yearCurrent = dateNow.getFullYear();

var onlyDateNow = new Date(yearCurrent, (monthCurrent), dateNow.getDate());

var Month = React.createClass({

  getInitialState: function() {
    return {
      monthCurrent: monthCurrent,
      yearCurrent: yearCurrent,
      DIMCurrent: dateNow.getDaysInMonth(),
      picked: 1,
    };
  },

    pickDate: function(value){
        this.setState({picked:value});
    },

    //onclick func for changing month
    changeMonth: function(step, e) {
      e.preventDefault();

      var monthChanged = formatVal(this.state.monthCurrent+step);
      if (step > 0 && monthChanged < this.state.monthCurrent) {
        this.setState({
           yearCurrent: this.state.yearCurrent+1
        });
      }
      if (step < 0 && monthChanged > this.state.monthCurrent) {
        this.setState({
           yearCurrent: this.state.yearCurrent-1
        });
      }
      var dateNew = new Date(this.state.yearCurrent, monthChanged);

      this.setState({
          monthCurrent: monthChanged,
          DIMCurrent: dateNew.getDaysInMonth()
      });

    },

  render: function() {

      var monthCurrent = this.state.monthCurrent,
          yearCurrent = this.state.yearCurrent,
          DIMCurrent = this.state.DIMCurrent,
          dateCurrent = new Date(yearCurrent, monthCurrent);


      //for week start at monday
      let dayOffset = dateCurrent.getDay() -1;
      if (dayOffset == -1) {
          dayOffset = 6;
      }

      var daysToView = parseInt((DIMCurrent + dayOffset)/7)*7+7;

      var fullDate;

      let totalEvents = myEvents.length;

      var daysEventsArray = [];

      for (var i = 0; i < daysToView; i++) {

          fullDate = new Date(dateCurrent - (dayOffset * DaySeconds) + (i * DaySeconds));
          daysEventsArray[+fullDate] = [];


      }
      for (var count = 0; count < totalEvents; count++ ) {

          let eventStartDate = new Date(myEvents[count].event_start),
              eventEndDate = +new Date(myEvents[count].event_end),
              eventLength = Math.ceil((eventEndDate - +eventStartDate)/DaySeconds),
              eventStartDMY = +new Date(eventStartDate.getFullYear(), eventStartDate.getMonth(), eventStartDate.getDate());

          for (var n = 0; n < eventLength; n++ ) {
              let eventNextDay = eventStartDMY+(DaySeconds*n);
              if (eventNextDay in daysEventsArray) {
                  for (var y = 0; (daysEventsArray[eventNextDay][y]); y++) {}
                  daysEventsArray[eventNextDay][y] = {};
                  daysEventsArray[eventNextDay][y].event_title = myEvents[count].event_title;
                  daysEventsArray[eventNextDay][y].event_status = myEvents[count].event_status;
              }
          }
      }

      var daysTemplate = [],
          daysArr;

      for (var i = 0; i < daysToView; i++) {

          daysArr = daysEventsArray[Object.keys(daysEventsArray)[i]];
          daysTemplate.push(<Day picked={this.pickDate} key={i} fulldate={new Date(+(Object.keys(daysEventsArray)[i]))} mth={monthCurrent} event={daysArr[0] && daysArr}></Day>);

      }

    return (
      <div>
        <div className='calendar-head'>
            <a href="#" onClick={this.changeMonth.bind(this, -1)} className={'calendar-button calendar-button-prev'}>prev</a>
            <h3 className={'calendar-title'}>{this.props.monthnum[monthCurrent].name} {yearCurrent}</h3>
            <a href="#" onClick={this.changeMonth.bind(this, 1)} className={'calendar-button calendar-button-next'}>next</a>
        </div>
        <div className='calendar-body'>
           <DayNames/>
           <div className='calendar'>{daysTemplate}</div>
        </div>
      </div>
    );
  }
});


var Day = React.createClass({

    pickDate: function(event) {
        this.props.picked(+this.props.fulldate);
        Action.setDate(+this.props.fulldate);
    },

   render: function () {
       let event;
       let status = '';
       let current = '';

       if (this.props.event) {
           event = this.props.event.map(function(event, index){
               if (event.event_status > status) {
                   status = event.event_status;
               }
               return (
                           <p className="event-title" key={index}>{event.event_title}</p>
                   )
           });
           event = (<div className={'event-preview'}>{event}</div>);
       }
       if (this.props.fulldate.getMonth() != this.props.mth) {
            current = 'side-month';
       }
       if (this.props.fulldate < dateNow) {
           console.log('prev');
       }
       else {
           console.log('new');
       }


       return (
           <div onClick={status && this.pickDate} className={
               ((+this.props.fulldate == +onlyDateNow) ? ' day-current ' : '') +
               ((this.props.fulldate < dateNow) ? ' day-passed ' : '') +
               (current && current) +' single-day ' +
               (status && 'day-has-event event-status-'+status)
           }>
               {this.props.date}
               <span>{this.props.fulldate.getDate()}{event}</span>
           </div>
       )
   }
});

//week day's names
const DayNames = React.createClass({
   render: function () {
     return (
        <div className='dayNames'>
          <div className='dayName'>Mon</div>
          <div className='dayName'>Tue</div>
          <div className='dayName'>Wed</div>
          <div className='dayName'>Thu</div>
          <div className='dayName'>Fri</div>
          <div className='dayName'>Sat</div>
          <div className='dayName'>Sun</div>
        </div>
     )
   }
});


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
    },
    setDate: function(newdate){
        Dispatcher.handleViewAction(new Payload(newdate));
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
var DateStore = {
    date: +onlyDateNow,
    listeners: [],
    getDate: function(){
        return this.date;
    },
    setDate: function(newdate){
        if(this.date != newdate){
            this.date = newdate;
            //emit the change
            this.listeners.forEach(function(cb){
                cb();
            });
        }
    },
    receive: function(payload){
        this.setDate(payload.actionType);
    },
    addListener: function(callback){
        this.listeners.push(callback);
    }
};

//Context expresses the current application states to render the views.
var getMyDate = function(){
    return {
        thedate: DateStore.getDate()
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

var initial = getMyDate();

var calendar = ReactDOM.render(<App />, document.getElementById("calendar"));
var events = ReactDOM.render(<EventsDay params={initial} />, document.getElementById("events-block"));

//Add Dispatcher callback
Dispatcher.register(function(payload){
    DateStore.receive(payload);
});

//Add Store callback
DateStore.addListener(function(){
    [events].forEach(function(v){
        v.setProps({params: getMyDate()});
    })
})



//
//
//
//
// ReactDOM.render(
//   <App />,
//   document.getElementById('calendar')
// );
//
// ReactDOM.render(
//     <EventsDay date={pickedDate}/>,
//     document.getElementById('events-block')
// );
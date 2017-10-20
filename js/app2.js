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

var App = React.createClass({

	render: function() {
		return (
      <div>
       <Month monthnum={myMonths} />
       </div>
		);
	}

});

var dateNow = new Date();    
var now = dateNow.getMonth();    
var year = dateNow.getFullYear();    
var day = dateNow.getDay();
console.log(day);

var Month = React.createClass({  

  getInitialState: function() {    

    if (now != this.props.monthnum.length-1 && now!= 0) {
      var ended = false; 
    }    
    else {
      var ended = true;
    }
    return {
      current: now,
      ended: ended,
      year: year
    };
  },

  nextMonth: function(e) {
    e.preventDefault();
    if (this.state.current < this.props.monthnum.length-1) {
      this.setState({
        current: this.state.current+1,
        ended: false
      });
    }
    else {
      this.setState({
        ended: true,
        current: 0,
        year: this.state.year+1
      });
    }
  },

  prevMonth: function(e) {
    e.preventDefault();
    if (this.state.current > 0) {
      this.setState({
        current: this.state.current-1,
        ended: false
      });
    }
    else {
      this.setState({
        ended: true,
        current: 11,
        year: this.state.year-1
      });
    }
  },

  render: function() {  

    var current = this.state.current;    

    var days = dateNow.getDaysInMonth();

    console.log(days);

    console.log(current);

    var monthnum = this.props.monthnum;    
    var thismonth = this.props.monthnum[current].name;

    console.log(thismonth);
        
    console.log(monthnum);    

    return (      
      <div> 
        <a href="#" onClick={this.prevMonth} className={'testClass ' + (current > 0 ? 'active': 'not')}>prev</a>
        <a href="#" onClick={this.nextMonth} className={'testClass ' + (current < 11 ? 'active': 'not')}>next</a>   
        <h2>{this.state.year}</h2>
        <h1 days={days}>{thismonth}</h1>
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

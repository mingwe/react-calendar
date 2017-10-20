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
var thisDate = new Date(year, now);


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
      year: year,
      day: thisDate.getDay(),
      days: thisDate.getDaysInMonth()
    };
  },

  nextMonth: function(e) {
    e.preventDefault();   

    if (this.state.current < this.props.monthnum.length-1) {

      var currentNext = this.state.current+1;
      var thisDate = new Date(this.state.year, currentNext);

      this.setState({
        current: currentNext,
        ended: false,
        day: thisDate.getDay(),
        days: thisDate.getDaysInMonth(),
        // monthName: this.props.monthnum[currentNext].name
      });
    }
    else {

      var yearNext = this.state.year+1;
      var thisDate = new Date(yearNext, 0);

      this.setState({
        ended: true,
        current: 0,
        year: yearNext,
        day: thisDate.getDay(),
        days: thisDate.getDaysInMonth()
      });
    }
    console.log(thisDate + 'ttt');
  },

  prevMonth: function(e) {
    e.preventDefault();
    if (this.state.current > 0) {

      var currentPrev = this.state.current-1;
      var thisDate = new Date(this.state.year, currentPrev);      

      this.setState({
        current: currentPrev,
        ended: false,
        day: thisDate.getDay(),
        days: thisDate.getDaysInMonth()
      });
    }
    else {

      var yearPrev = this.state.year-1;
      var thisDate = new Date(yearPrev, 11);

      this.setState({
        ended: true,
        current: 11,
        year: yearPrev,
        day: thisDate.getDay(),
        days: thisDate.getDaysInMonth()
      });
    }
    var thisDate = new Date(this.state.year, this.state.current);
    this.setState({
      day: thisDate.getDay(),
      days: thisDate.getDaysInMonth()
    });
    console.log(thisDate + 'bbb');

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

    console.log(this.state.day + 'is day');
    console.log(this.state.days + 'is total days');

    return (      
      <div> 
        <a href="#" onClick={this.prevMonth} className={'testClass ' + (current > 0 ? 'active': 'not')}>prev</a>
        <a href="#" onClick={this.nextMonth} className={'testClass ' + (current < 11 ? 'active': 'not')}>next</a>   
        <h2>{this.state.year}</h2>
        <h1 days={days}>{thismonth}</h1>
        <div className='calc-block'>

        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

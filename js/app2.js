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
    1: {      
        title: 'Something happened',
        status: 1,
        link: 'google.com'
    },
    4: {      
        title: 'another event',
        status: 2,
        link: 'yahoo.com'
    },
    7: {      
        title: 'another bad event',
        status: 3,
        link: 'yahoo.com'
    },
    10: {      
        title: 'third event',
        status: 3,
        link: 'youtube.com'
    }
  }
];

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

var dateNow = new Date();    
var now = dateNow.getMonth();    
var year = dateNow.getFullYear();    
var thisDate = new Date(year, now);


var Month = React.createClass({  

  getInitialState: function() {    
    
    return {
      current: now,
      year: year,
      day: thisDate.getDay(),
      days: thisDate.getDaysInMonth()
    };
  },

  changeMonth: function(step, e) {
    e.preventDefault();   

    var changedYear = this.state.year+step;

      if ((this.state.current == 11) && (step == 1)) {        
        var thisDate = new Date(changedYear, 0);

        this.setState({          
          current: 0,
          year: changedYear
        });
      }

      else {

        if ((this.state.current == 0) && (step == -1)) {
          var thisDate = new Date(changedYear, 11);

          this.setState({
            current: 11,
            year: changedYear
          });
        }

        else {

          var currentNext = this.state.current+step;
          var thisDate = new Date(this.state.year, currentNext);

          this.setState({
            current: currentNext
          });
        }
      }
      this.setState({
        day: thisDate.getDay(),
        days: thisDate.getDaysInMonth()
      });
  },

  render: function() {  

    var current = this.state.current;    

    var days = dateNow.getDaysInMonth();
    var monthnum = this.props.monthnum;    
    var thismonth = this.props.monthnum[current].name;

    return (      
      <div> 
        <a href="#" onClick={this.changeMonth.bind(this, -1)} className={'testClass ' + (current > 0 ? 'active': 'not')}>prev</a>
        <a href="#" onClick={this.changeMonth.bind(this, 1)} className={'testClass ' + (current < 11 ? 'active': 'not')}>next</a>   
        <h2>{this.state.year}</h2>
        <h1 days={days}>{thismonth}</h1>
        <Calendar days={this.state.days} day={this.state.day}/>
      </div>
    );
  }
});

var Calendar = React.createClass({

    render: function() {
      var days = this.props.days;
      var day = this.props.day;

      let daysArray = [];

        var dayOffset = this.props.day;
        if (dayOffset == 0) {
           dayOffset = 7;
        }


        for (var i = 2; i <= dayOffset; i++) {          
          daysArray.push(
            <Day myDay='00' key={100+i}></Day>
          );
        }

        for (var i = 1; i <= this.props.days; i++) {
          var myDay = {
              number: i,
          };
          daysArray.push(
            <Day myDay={myDay} key={i}></Day>
          );
        }

        console.log (daysArray);

        return (
          <div className="row month">
            {daysArray}
          </div>
        );        
    }

});

var Day = React.createClass({

  render: function () {
    var dayEvent = this.props.myDay.number
    var eventTitle = myEvents['0'][dayEvent];
    if (eventTitle) {
      console.log('the title is: ' + eventTitle.title);
      this.props.myDay.eventTitle = eventTitle.title;
      this.props.myDay.eventStatus = eventTitle.status;
      this.props.myDay.eventLink = eventTitle.link;
    }
    console.log(eventTitle);
    return (
      <div className={'single-day eventstatus'+this.props.myDay.eventStatus}>      
        <span>{this.props.myDay.number}</span>
        { eventTitle && <a href={this.props.myDay.eventLink}>{this.props.myDay.eventTitle}</a> }        
      </div>
    )
  }

});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

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
        "event_start" : "2017-11-09T11:25:13Z",
        "event_end" : "2017-12-09T14:25:13Z",
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

var dateNow = new Date(),
    monthCurrent = dateNow.getMonth(),
    yearCurrent = dateNow.getFullYear();

var Month = React.createClass({

  getInitialState: function() {
    return {
      monthCurrent: monthCurrent,
      yearCurrent: yearCurrent,
      DIMCurrent: dateNow.getDaysInMonth(),
      picked: 1
    };
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

    //func when picking a day
    dayClicked: function(i, e) {
      e.preventDefault();
      this.setState({
         picked: this.state.picked= i+'.'+(this.state.monthCurrent+1)+'.'+this.state.yearCurrent
      });
      console.log(this.state.picked);
    },

  render: function() {

      var monthCurrent = this.state.monthCurrent,
          yearCurrent = this.state.yearCurrent,
          DIMCurrent = this.state.DIMCurrent,
          dateCurrent = new Date(yearCurrent, monthCurrent),
          firstDay = dateCurrent.getDay();


      //for week start at monday
      let dayOffset = dateCurrent.getDay() -1;
      if (dayOffset == -1) {
          dayOffset = 6;
      }


      console.log (yearCurrent +' '+ monthCurrent);
      // console.log(new Date(dateCurrent-dayOffset));

      var daysToView = parseInt((DIMCurrent + dayOffset)/7)*7+7;
      console.log(daysToView);
      console.log(DIMCurrent);

      var days = [];
      var fullDate;
      console.log(new Date(new Date(dateCurrent - (dayOffset * 86400000) + (1 * 86400000)).toString()));

      // var dataTemplate = function () {
          for (var i = 0; i < daysToView; i++) {
              // console.log(new Date(dateCurrent-(dayOffset*86400000)+(i*86400000)));

              fullDate = new Date(dateCurrent - (dayOffset * 86400000) + (i * 86400000));

              days.push(
                <Day key={i} date={fullDate.getDate()} fulldate={fullDate}></Day>
              );


          }
      //     return days;
      // }

      if (monthCurrent == 0) {
          var monthPrev = 12,
              yearPrev = yearCurrent - 1;
      }
      else {
          var monthPrev = monthCurrent,
              yearPrev = yearCurrent;
      }



      let totalEvents = myEvents.length;


      if (monthCurrent == 11) {
          var monthNext = 0,
              yearNext = yearCurrent + 1;
      }
      else {
          var monthNext = monthCurrent+1,
              yearNext = yearCurrent;
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
           <div className='calendar'>{days}asd</div>
        </div>
      </div>
    );
  }
});

var Day = React.createClass({
   render: function () {
       return (
           <div>{this.props.date}<span>{this.props.fulldate.getFullYear()}</span></div>
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

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

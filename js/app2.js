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
          monthPrev = this.state.monthCurrent-1,
          datePrev = new Date(yearCurrent, monthPrev),
          DIMPrev = datePrev.getDaysInMonth(),
          stampfirstDay = +new Date(yearCurrent, monthCurrent, 1),//first day's of current month timestamp
          stamplastDay = +new Date(yearCurrent, monthCurrent, DIMCurrent, 23, 59, 59);//last day's of current month timestamp

      let daysArray = [],
          daysEventsArray = [];

      //for week start at monday
      let dayOffset = dateCurrent.getDay() -1;
      if (dayOffset == -1) {
          dayOffset = 6;
      }

      if (monthCurrent == 0) {
          var monthPrev = 12,
              yearPrev = yearCurrent - 1;
      }
      else {
          var monthPrev = monthCurrent,
              yearPrev = yearCurrent;
      }

      //filling days array with part of prev month
      for(var x = DIMPrev-dayOffset+1; x <= DIMPrev; x++) {
        daysArray.push(
            <div thedate={x+'.'+monthPrev+'.'+yearPrev} className='side-month' key={+('0.'+x)}>{x}</div>
        );
      }

      //filling array with day numbers of current month
      for(var i = 1; i <= DIMCurrent; i++) {
          daysEventsArray['day' + i] = {};
      }

      let totalEvents = myEvents.length;

      //adding events to days in current month array
      for (var count = 0; count < totalEvents; count++ ) {
          var eventStartDate = +new Date(myEvents[count].event_start);
          let eventEndDate = +new Date(myEvents[count].event_end);

          //checking if this month have some events
          if ((stampfirstDay < eventStartDate && eventStartDate < stamplastDay) || (stampfirstDay < eventEndDate && eventEndDate < stamplastDay)) {

              //true if event started in prev month
              if (!(stampfirstDay < eventStartDate && eventStartDate < stamplastDay)) {
                  var eventStartDayNum = 1;
                  var eventStartDate = +new Date(yearCurrent, monthCurrent);
              }
              //if event started in current month
              else {
                  var eventStartDayNum = (new Date(myEvents[count].event_start)).getDate(); //day number of event start
              }

              let eventLength = Math.ceil((eventEndDate - eventStartDate)/86400000); //counting event length in days

              //for events few days length
              for (let z=1; z<=eventLength; z++) {
                  var dayNumber = eventStartDayNum + z - 1;
                  if (dayNumber <= DIMCurrent) {
                      //if this day already has a event, adding this event with another index
                      for (var i = 0; (daysEventsArray['day' + dayNumber][i]); i++) {}
                      daysEventsArray['day' + dayNumber][i] = {};
                      daysEventsArray['day' + dayNumber][i]['event_title'] = myEvents[count].event_title;
                      daysEventsArray['day' + dayNumber][i]['event_status'] = myEvents[count].event_status;
                  }
              }

          }
      }
      for(var i = 1; i <= DIMCurrent; i++) {

        var toPush = [];
        let eventStatus = 0;

        if (daysEventsArray['day' + i][0]) {
            for (var z = 0; (daysEventsArray['day' + i][z]); z++) {
                toPush.push(
                    daysEventsArray['day' + i][z]
                )
            }
        }

        let dayTemplate;

        if (toPush.length) {
            var toPush = toPush.map(function (item, index) {
                eventStatus = item.event_status;
                return (
                    <p key={index}>
                        {item.event_title}
                    </p>
                )
            });

            dayTemplate = (
                <a href='#' onClick={this.dayClicked.bind(this, i)}>
                    {i}
                    <div className='event-preview'>
                        { toPush }
                    </div>
                </a>
            )
        }
        else {
            dayTemplate = (i)
        }


        daysArray.push(
          <div key={i} className={ 'single-day '+ (eventStatus ? 'day-has-event event-status-'+eventStatus : '') }>
              {dayTemplate}
          </div>
        );
        console.log(eventStatus);
      }


      console.log(daysEventsArray);


      if (monthCurrent == 11) {
          var monthNext = 0,
              yearNext = yearCurrent + 1;
      }
      else {
          var monthNext = monthCurrent+1,
              yearNext = yearCurrent;
      }

      let PCDCount = i+dayOffset-1;
      let daysNext = (7*(Math.floor(PCDCount/7))+7)-PCDCount;

      //filling days array with part of next month
      for(var y = 1; y <= daysNext; y++) {
          daysArray.push(
              <div thedate={y+'.'+(monthNext+1)+'.'+yearNext} className='side-month' key={+('1.'+y)} >{y}</div>
          );
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
           <div className='calendar'>{daysArray}</div>
        </div>
      </div>
    );
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

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
        "event_status" : "1",
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


function formatVal (val) {
    if (val > 11) {
        val = val - 12;
    }
    else {
        if (val < 0) {
            val = val + 12;
        }
    }
    console.log(val);
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

var dateNow = new Date();

var monthCurrent = dateNow.getMonth();
var yearCurrent = dateNow.getFullYear();

// console.log(monthCurrent);
// console.log(yearCurrent);

var Month = React.createClass({

  getInitialState: function() {
    return {
      monthCurrent: monthCurrent,
      yearCurrent: yearCurrent,
      DIMCurrent: dateNow.getDaysInMonth()
    };
  },

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

    dayClicked: function(e) {
      e.preventDefault();
      console.log(e);
    },

  render: function() {


      var monthCurrent = this.state.monthCurrent;
      var yearCurrent = this.state.yearCurrent;
      var DIMCurrent = this.state.DIMCurrent;
      var dateCurrent = new Date(yearCurrent, monthCurrent);

      var monthPrev = this.state.monthCurrent-1;
      var datePrev = new Date(yearCurrent, monthPrev);
      var DIMPrev = datePrev.getDaysInMonth();


      var stampfirstDay = +new Date(yearCurrent, monthCurrent, 1);
      var stamplastDay = +new Date(yearCurrent, monthCurrent, DIMCurrent, 23, 59, 59);
      var timestampFirst = new Date(stampfirstDay);
      var timestampLast = new Date(stamplastDay);
        // alert(stampfirstDay);
        // alert(stamplastDay);



      let daysArray = [];

      let daysEventsArray = [];

      var dayOffset = dateCurrent.getDay() -1;
      if (dayOffset == -1) {
          dayOffset = 6;
      }

      if (monthCurrent == 0) {
          var monthPrev = 12;
          var yearPrev = yearCurrent - 1;
      }
      else {
          var monthPrev = monthCurrent;
          var yearPrev = yearCurrent;
      }
      for(var x = DIMPrev-dayOffset+1; x <= DIMPrev; x++) {
        daysArray.push(
            <div thedate={x+'.'+monthPrev+'.'+yearPrev} className='side-month' key={+('0.'+x)}>{x}.{monthPrev}.{yearPrev}</div>
        );
      }

      for(var i = 1; i <= DIMCurrent; i++) {
          daysEventsArray['day' + i] = {};
      }
      var totalEvents = myEvents.length;
      var eventsArray = [ {'test': {}}];

      for (var count = 0; count < totalEvents; count++ ) {
          var eventStartDate = +new Date(myEvents[count].event_start);
          let eventEndDate = +new Date(myEvents[count].event_end);

          if ((stampfirstDay < eventStartDate && eventStartDate < stamplastDay) || (stampfirstDay < eventEndDate && eventEndDate < stamplastDay)) {

              if (!(stampfirstDay < eventStartDate && eventStartDate < stamplastDay)) {
                  var eventStartDayNum = 1;
                  var eventStartDate = +new Date(yearCurrent, monthCurrent);
                  console.log(eventStartDate + 'ESD');
              }
              else {
                  var eventStartDayNum = (new Date(myEvents[count].event_start)).getDate();
              }

              let eventLength = Math.ceil((eventEndDate - eventStartDate)/86400000);

              for (let z=1; z<=eventLength; z++) {

                  var dayNumber = eventStartDayNum + z - 1;

                  if (dayNumber <= DIMCurrent) {

                      for (var i = 0; (daysEventsArray['day' + dayNumber][i]); i++) {}

                      daysEventsArray['day' + dayNumber][i] = {};
                      daysEventsArray['day' + dayNumber][i]['event_title'] = myEvents[count].event_title;
                      daysEventsArray['day' + dayNumber][i]['event_status'] = myEvents[count].event_status;

                  }

              }

          }
      }
      for(var i = 1; i <= DIMCurrent; i++) {

          var toPush = '';

          for (var z = 0; (daysEventsArray['day' + i][z]); z++) {
              toPush += daysEventsArray['day' + i][z]['event_title'];
          }
        daysArray.push(
          <div thedate={i+'.'+(monthCurrent+1)+'.'+yearCurrent} key={i}>
              <a href='#' onClick={this.dayClicked}>
                {i}.{monthCurrent+1}.{yearCurrent}
                  {toPush}
              </a>
          </div>
        );
        // daysEventsArray.push(
        //     {
        //         'dayNumber': i,
        //     }
        // );
      }

      console.log(daysEventsArray);


      if (monthCurrent == 11) {
          var monthNext = 0;
          var yearNext = yearCurrent + 1;
      }
      else {
          var monthNext = monthCurrent+1;
          var yearNext = yearCurrent;
      }

      let PCDCount = i+dayOffset-1;
      let daysNext = (7*(Math.floor(PCDCount/7))+7)-PCDCount;

      for(var y = 1; y <= daysNext; y++) {
          daysArray.push(
              <div thedate={y+'.'+(monthNext+1)+'.'+yearNext} className='side-month' key={+('1.'+y)} >{y}.{monthNext+1}.{yearNext}</div>
          );
      }




    return (
      <div>
        <a href="#" onClick={this.changeMonth.bind(this, -1)} className={'testClass'}>prev</a>
        <a href="#" onClick={this.changeMonth.bind(this, 1)} className={'testClass'}>next</a>
        <h1>{this.props.monthnum[monthCurrent].name} {yearCurrent}</h1>
        <DayNames/>
        {/*<h2>{this.state.currentDate}</h2>*/}
        {/*<h1 days={days}>{thismonth}</h1>*/}

        {/*<Calendar days={this.state.days} day={this.state.day}/>*/}
        <div className='calendar'>{daysArray}</div>
      </div>
    );
  }
});

// var Calendar = React.createClass({
//
//     render: function() {
//       var days = this.props.days;
//       var day = this.props.day;
//
//       // let daysArray = [];
//       //
//       //   var dayOffset = this.props.day;
//       //   if (dayOffset == 0) {
//       //      dayOffset = 7;
//       //   }
//       //
//       //
//       //   for (var i = 2; i <= dayOffset; i++) {
//       //     daysArray.push(
//       //       <Day myDay='00' key={100+i}></Day>
//       //     );
//       //   }
//       //
//       //   for (var i = 1; i <= this.props.days; i++) {
//       //     var myDay = {
//       //         number: i,
//       //     };
//       //     daysArray.push(
//       //       <Day myDay={myDay} key={i}></Day>
//       //     );
//       //   }
//       //
//       //   console.log (daysArray);
//
//         return (
//           <div className="row month">
//             {/*{daysArray}*/}
//           </div>
//         );
//     }
//
// });

// var Day = React.createClass({
//
//   render: function () {
//     var dayEvent = this.props.myDay.number
//     // var eventTitle = myEvents['0'][dayEvent];
//     // if (eventTitle) {
//     //   console.log('the title is: ' + eventTitle.title);
//     //   this.props.myDay.eventTitle = eventTitle.title;
//     //   this.props.myDay.eventStatus = eventTitle.status;
//     //   this.props.myDay.eventLink = eventTitle.link;
//     // }
//     // console.log(eventTitle);
//     if (dayEvent) {
//         this.props.myDay.mydate = this.props.myDay.number +'.'+;
//     }
//     return (
//       <div className={'single-day eventstatus'+this.props.myDay.eventStatus}>
//         <span>{this.props.myDay.number}</span>
//         {/*{ eventTitle && <a href={this.props.myDay.eventLink}>{this.props.myDay.eventTitle}</a> }        */}
//       </div>
//     )
//   }
//
// });

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

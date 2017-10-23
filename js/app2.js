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
    0: {
        title: 'Something happened',
        status: 1,
        link: 'google.com'
    },
    1: {
        title: 'another event',
        status: 2,
        link: 'yahoo.com'
    },
    2: {
        title: 'another bad event',
        status: 3,
        link: 'yahoo.com'
    },
    3: {
        title: 'third event',
        status: 3,
        link: 'youtube.com'
    }
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

console.log(monthCurrent);
console.log(yearCurrent);

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

  render: function() {

    // var current = this.state.current;

    // var days = dateNow.getDaysInMonth();
    // var monthnum = this.props.monthnum;

      var monthCurrent = this.state.monthCurrent;
      var yearCurrent = this.state.yearCurrent;
      var DIMCurrent = this.state.DIMCurrent;
      var dateCurrent = new Date(yearCurrent, monthCurrent);

      var monthPrev = this.state.monthCurrent-1;
      var datePrev = new Date(yearCurrent, monthPrev);
      var DIMPrev = datePrev.getDaysInMonth();

      console.log('lets start!: ');
      console.log(monthCurrent +''+ yearCurrent);
      console.log(DIMCurrent);
      console.log(datePrev);
      console.log(DIMPrev);

      let daysArray = [];

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
            <div thedate={x+'.'+monthPrev+'.'+yearPrev} className='side-month' key={+('0.'+x)}>{x}.{monthPrev}</div>
        );
      }

      for(var i = 1; i <= DIMCurrent; i++) {
        daysArray.push(
          <div thedate={i+'.'+(monthCurrent+1)+'.'+yearCurrent} key={i}>{i}.{monthCurrent}.{yearCurrent}</div>
        );
      }

      let PCDCount = i+dayOffset-1;
      let daysNext = (7*(Math.floor(PCDCount/7))+7)-PCDCount;

      for(var y = 1; y <= daysNext; y++) {
          daysArray.push(
              <div thedate={y+'.'+(monthCurrent+2)+'.'+yearCurrent} className='side-month' key={+('1.'+y)}>{y}.{monthCurrent+1}</div>
          );
      }


    return (
      <div>
        <a href="#" onClick={this.changeMonth.bind(this, -1)} className={'testClass'}>prev</a>
        <a href="#" onClick={this.changeMonth.bind(this, 1)} className={'testClass'}>next</a>
        <h1>{this.props.monthnum[monthCurrent].name}</h1>
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

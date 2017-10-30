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
        "start" : "2017-09-26T06:25:24Z",
        "end" : "2017-09-27T06:26:24Z",
        "status" : "2",
        "title" : "some problems",
    },
    {
        "start" : "2017-10-04T06:25:24Z",
        "end" : "2017-10-06T06:26:24Z",
        "status" : "2",
        "title" : "some problems",
    },
    {
        "start" : "2017-11-09T21:59:59Z",
        "end" : "2017-12-09T00:00:01Z",
        "status" : "2",
        "title" : "big problem",
    },
    {
        "start" : "2017-10-05T04:13:24Z",
        "end" : "2017-10-05T05:13:24Z",
        "status" : "3",
        "title" : "its very big problem!"
    },
    {
        "start" : "2017-10-25T04:13:24Z",
        "end" : "2017-11-12T05:13:24Z",
        "status" : "3",
        "title" : "its very big problem 2!"
    },
    {
        "start" : "2017-11-01T04:13:24Z",
        "end" : "2017-11-02T05:13:24Z",
        "status" : "3",
        "title" : "its very big problem 3!"
    }
];

const DaySeconds = 86400000,
      HourSeconds = 60000;

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

var eventsInDay = [

]

var EventsDay = React.createClass({

    getInitialState: function() {
        return {
            thedate: getMyDate(),
            events: []
        };
    },

    componentDidUpdate: function() {

        var self = this;

        var xhr = new XMLHttpRequest();

        xhr.open('POST', 'single.json', true);

        xhr.send([this.state.thedate]); // (1)

        xhr.onreadystatechange = function() { // (3)
            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {
                var myFirstEvent = JSON.parse(xhr.responseText);
                if (self.state.events.toString() !== myFirstEvent.toString() ) {
                    self.setState({
                        events: myFirstEvent,
                    });
                }
            }

        }
    },

    render: function() {

        var eventsTemplate;
        var eventsArr = this.state.events;

        if (eventsArr.length > 0) {
            eventsTemplate = eventsArr.map(function (event, index) {
                return (
                    <div className="spoiler-event" key={index}>
                        <div className="spoiler status-normal">Технические работы на сервере</div>
                        <div className="spoiler-body">
                            <ul>
                                <li>
                                    <div className="spoiler-list-ttl">{event.title}</div>
                                    <div className="spoiler-list-body">19.09.2017 01:42 (GMT +2) – Технические работы
                                        завершены, все системы работают в штатном режиме
                                    </div>
                                </li>
                                <li>
                                    <div className="spoiler-list-ttl">Тип:</div>
                                    <div className="spoiler-list-body">{event.status}</div>
                                </li>
                                <li>
                                    <div className="spoiler-list-ttl">Начало работ:</div>
                                    <div className="spoiler-list-body">{event.start} по Берлину (GMT +2)</div>
                                </li>
                                <li>
                                    <div className="spoiler-list-ttl">Окончание работ:</div>
                                    <div className="spoiler-list-body">{event.end} по Берлину (GMT +2)</div>
                                </li>
                                <li>
                                    <div className="spoiler-list-ttl">Особенности:</div>
                                    <div className="spoiler-list-body">{event.body}</div>
                                </li>
                                <li>
                                    <div className="spoiler-list-ttl">Инструкция для пользователей:</div>
                                    <div className="spoiler-list-body">С вашей стороны не требуется никаких активных
                                        действий.
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                )
            })
        }
        else {
            eventsTemplate =
                    <div className={'nothing-happened'}>
                        Событий нет
                    </div>
        }

        return (
          <div>
              <div className="date">{new Date(this.state.thedate).toString()}</div>
              {/*<div>event: {this.state.body}</div>*/}
              {eventsTemplate}
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

      function roundDate(datestamp) {
          let offset = new Date(datestamp).getTimezoneOffset()*HourSeconds;
          return (
              Math.round((datestamp) / DaySeconds)*DaySeconds + offset
          )
      }

      var daysToView = parseInt((DIMCurrent + dayOffset)/7)*7+7;

      var fullDate;

      let totalEvents = myEvents.length;

      var daysEventsArray = [];

      for (var i = 0; i < daysToView; i++) {

          fullDate = roundDate(+(new Date(dateCurrent - (dayOffset * DaySeconds) + (i * DaySeconds))));
          daysEventsArray[fullDate] = [];
      }

      for (var count = 0; count < totalEvents; count++ ) {

          let eventStartDate = new Date(myEvents[count].start),
              eventEndDate = new Date(myEvents[count].end);

          eventStartDate = +new Date(eventStartDate.getFullYear(), eventStartDate.getMonth(), eventStartDate.getDate());

          eventEndDate = new Date(+eventEndDate + eventEndDate.getTimezoneOffset()*HourSeconds);

          let eventLength = Math.ceil((+eventEndDate - +eventStartDate)/DaySeconds);

          for (var n = 0; n < eventLength; n++ ) {
              let eventNextDay = eventStartDate+(DaySeconds*n);
              eventNextDay = roundDate(eventNextDay);
              if (eventNextDay in daysEventsArray) {
                  for (var y = 0; (daysEventsArray[eventNextDay][y]); y++) {}
                  daysEventsArray[eventNextDay][y] = {};
                  daysEventsArray[eventNextDay][y].title = myEvents[count].title;
                  daysEventsArray[eventNextDay][y].status = myEvents[count].status;
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
               if (event.status > status) {
                   status = event.status;
               }
               return (
                           <p className="event-title" key={index}>{event.title}</p>
                   )
           });
           event = (<div className={'event-preview'}>{event}</div>);
       }
       if (this.props.fulldate.getMonth() != this.props.mth) {
            current = 'side-month';
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
    return DateStore.getDate()
}

var calendar = ReactDOM.render(<App />, document.getElementById("calendar"));
var events = ReactDOM.render(<EventsDay events={eventsInDay}/>, document.getElementById("events-block"));

//Add Dispatcher callback
Dispatcher.register(function(payload){
    DateStore.receive(payload);
});

//Add Store callback
DateStore.addListener(function(){
    [events].forEach(function(v){
        v.setState({thedate: getMyDate()});
    })
});
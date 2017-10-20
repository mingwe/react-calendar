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

var Month = React.createClass({  

  getInitialState: function() {
    var now = new Date();
    var now = now.getMonth();
    return {
      current: now      
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
        ended: true
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
        ended: true
      });
    }
  },

  render: function() {  

    var current = this.state.current;    

    console.log(current);

    var monthnum = this.props.monthnum;    
    var thismonth = this.props.monthnum[current].name;

    console.log(thismonth);
        
    console.log(monthnum);    

    return (      
      <div> 
        <a href="#" onClick={this.nextMonth} className={'testClass ' + (current < 12 ? 'not': 'active')}>next</a>
        <a href="#" onClick={this.prevMonth} className={'testClass ' + (current > 0 ? 'not': 'active')}>prev</a>
        <h1>{thismonth}</h1>
      </div>
    );
  }
});

var SingleMonth = React.createClass({

  render: function() {
    var monthName = this.props.data.name;
    return (
      <p>{monthName}</p>
    )
  }

});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

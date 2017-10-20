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

  render: function() {  

    var now = new Date();
    var now = now.getMonth();

    var monthnum = this.props.monthnum;    
    var thismonth = this.props.monthnum[now].name;

    console.log(thismonth);
    
    
    var singleMonth = monthnum.map(
      function (item, index) {
        return (
            <div key={index}>
                <SingleMonth data={item}/>
            </div>
        )
      }
    );

    console.log(monthnum);
    console.log(singleMonth);

    return (
      <div> 
        {singleMonth}       
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

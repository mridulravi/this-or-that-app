var Chart = React.createClass({
  render: function() {
    return (
      <svg width={this.props.width} height={this.props.height}>{this.props.children}</svg>
    );
  }
});



//var Bar = React.createClass({
//  getDefaultProps: function() {
//    return {
//      width: 0,
//      height: 0,
//      offset: 0
//    }
//  },

//  render: function() {
//    return (
//      <rect fill={this.props.color}
//        width={this.props.width} height={this.props.height} 
//        x={this.props.offset} y={this.props.availableHeight - this.props.height} />
//    );
//  }
//});



//var DataSeries = React.createClass({
//  getDefaultProps: function() {
//    return {
//      title: '',
//      data: []
//    }
//  },

//  render: function() {
//    var props = this.props;

//    var yScale = d3.scale.linear()
//      .domain([0, d3.max(this.props.data)])
//      .range([0, this.props.height]);

//    var xScale = d3.scale.ordinal()
//      .domain(d3.range(this.props.data.length))
//      .rangeRoundBands([0, this.props.width], 0.05);

//    var bars = _.map(this.props.data, function(point, i) {
//      return (
//        <Bar height={yScale(point)} width={xScale.rangeBand()} offset={xScale(i)} availableHeight={props.height} color={props.color} key={i} />
//      )
//    });

//    return (
//      <g>{bars}</g>
//    );
//  }
//});





//var BarChart = React.createClass({
//  render: function() {
//    return (
//      <Chart width={this.props.width} height={this.props.height}>
//        <DataSeries data={[ 30, 10, 5, 8, 15, 10 ]} width={this.props.width} height={this.props.height} color="cornflowerblue" />
//      </Chart>
//    );
//  }
//});

//React.render(
//  <BarChart width={600} height={300} />,
//  document.getElementById('content')
//);

var Line = React.createClass({
  getDefaultProps: function() {
    return {
      path: '',
      color: 'blue',
      width: 2
    }
  },

  render: function() {
    return (
      <path d={this.props.path} stroke={this.props.color} strokeWidth={this.props.width} fill="none" />
    );
  }
});


var DataSeries = React.createClass({
  getDefaultProps: function() {
    return {
      data: [],
      interpolate: 'linear'
    }
  },

  render: function() {
    var self = this,
        props = this.props,
        yScale = props.yScale,
        xScale = props.xScale;
    
    var path = d3.svg.line()
        .x(function(d) { return xScale(d.x); })
        .y(function(d) { return yScale(d.y); })
        .interpolate(this.props.interpolate);

    return (
      <Line path={path(this.props.data)} color={this.props.color} />
    )
  }
});



var LineChart = React.createClass({
  getDefaultProps: function() {
    return {
      width: 60000,
      height: 300
    }
  },

  render: function() {
    var data = this.props.data,
        size = { width: this.props.width, height: this.props.height };

    var max = _.chain(data)
      .zip()
      .map(function(values) {
        return _.reduce(values, function(memo, value) { return Math.max(memo, value.y); }, 0);
      })
      .max()
      .value();
     
    var min = _.chain(data)
      .zip()
      .map(function(values) {
        return _.reduce(values, function(memo, value) { return Math.min(memo, value.y); }, 0);
      })
      .min()
      .value();

    var xScale = d3.scale.linear()
      .domain([new Date(1995,0,1), new Date(2014,11,31)])
      .range([0, this.props.width]);

    var yScale = d3.scale.linear()
      .domain([min, max])
      .range([this.props.height, 0]);

    return (
      <Chart width={this.props.width} height={this.props.height}>
        <DataSeries data={data} size={size} xScale={xScale} yScale={yScale} ref="series1" color="cornflowerblue" />
      </Chart>
    );
  }
});








var StrategyOption = React.createClass({
	
	getInitialState: function() {
        return {
        	log_returns: '',
            netReturn: '',
            annualizedReturn: '',
            maxDrawdown: ''
        };
    },
    
    componentWillReceiveProps: function(nextProps) {
    	//console.log(nextProps.ID);
    	//alert(nextProps.ID);
        $.ajax({
			url: nextProps.ID + "/get_strategy_data/?format=json",
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({
				    log_returns: data.log_returns,
				    netReturn: data.netReturn,
				    annualizedReturn: data.annualizedReturn,
				    maxDrawdown: data.maxDrawdown
				});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(err.toString());
			}.bind(this)
		});
    },
    
	render: function() {
		datalist = [];
		for(i = 0; i<this.state.log_returns.length;i++)
		{
//			datalist.push(
//		   			<div>
//                        <div>
//                            {i+1}
//                        </div>
//                        <div>
//                           	{this.state.log_returns[i].date.substring(0,4)}
//                           	{parseInt(this.state.log_returns[i].date.substring(5,7))-1}
//                           	{this.state.log_returns[i].date.substring(8)}
//                        </div>
//                        <div>
//                            {parseFloat(this.state.log_returns[i].value)}
//                        </div>
//                    </div>);
			var singleObj = {};
			singleObj['x'] = new Date(parseInt(this.state.log_returns[i].date.substring(0,4)),
									  parseInt(this.state.log_returns[i].date.substring(5,7))-1,
									  parseInt(this.state.log_returns[i].date.substring(8)));
			singleObj['y'] = parseFloat(this.state.log_returns[i].value);
			datalist.push(singleObj);
//			datalist.push(x: new Date({parseInt(this.state.log_returns[i].date.substring(0,4))},
//									  {parseInt(this.state.log_returns[i].date.substring(5,7))-1},
//									  {parseInt(this.state.log_returns[i].date.substring(8))}), 
//						   y: {parseFloat(this.state.log_returns[i].value)});
		}
		return (
			<div>
				{this.props.ID}
				<br/>
				<LineChart data={datalist} legend={true} title = "Line Chart"/>
				<br/>
				{this.state.netReturn}
				<br/>
				{this.state.annualizedReturn}
				<br/>
				{this.state.maxDrawdown}
			</div>
		);
	}
});
    
var AppBody = React.createClass({
	
	getInitialState: function() {
        new_state = {
            firstID: '',
            secondID: ''
        };
        this.loadInitialState();
        return new_state;
    },
    
    loadInitialState: function() {
        $.ajax({
			url: this.props.username + "/get_user_strategies/?format=json",
			dataType: 'json',
			cache: false,
			success: function(data) {
				var state = this.state;
				state.firstID = data.firstID;
				state.secondID = data.secondID;
		    	this.setState(state);
				/*this.setState({
				    firstID: data.firstID,
				    secondID: data.secondID
				});*/
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(err.toString());
			}.bind(this)
		});
    },
	
	handleRadioSubmit: function(e) {
		e.preventDefault();
		var firstRadioButton = React.findDOMNode(this.refs.firstRadioButton);
		var secondRadioButton = React.findDOMNode(this.refs.secondRadioButton);
		var clickedID = '';
		if (firstRadioButton.checked) {
			clickedID = firstRadioButton.value;
		}
		else if (secondRadioButton.checked) {
			clickedID = secondRadioButton.value;
		}
		else {
			alert("Please pick a strategy before submit !");
			return;
		}
		
		$.ajax({
			url: this.props.username + "/" + clickedID + "/get_next_strategies/?format=json",
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({
					firstID: data.firstID,
					secondID: data.secondID
				});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(err.toString());
			}.bind(this)
		});
				
		return;
	},
	
	render: function() {
		return (
			<div>
				<h1>Hi, {this.props.username}</h1>
				<div>
					<StrategyOption ID = {this.state.firstID} />
				</div>
				<div>
					<StrategyOption ID = {this.state.secondID} />
				</div>
				<div>
					<form className="selectForm" onSubmit={this.handleRadioSubmit}>
						<input type="radio" name="choice" ref="firstRadioButton" value={this.state.firstID} />
						{this.state.firstID}
						<input type="submit" value="Submit stratgy choice" />
						<input type="radio" name="choice" ref="secondRadioButton" value={this.state.secondID} />
						{this.state.secondID}
					</form>
				</div>
			</div>
		);
	}
});

var LoginForm = React.createClass({
	
	handleLoginSubmit: function(e) {
		e.preventDefault();
		var username = React.findDOMNode(this.refs.loginusername).value.trim();
		if (!username) {
			return;
		}
		
		React.findDOMNode(this.refs.loginusername).value = '';
		
		$.ajax({
			url: username + "/check_login/?format=json",
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.props.onUserLogin(data.loginStatus, data.username);
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(err.toString());
			}.bind(this)
		});
				
		return;
	},

	render: function() {
		return (
			<form className="loginForm" onSubmit={this.handleLoginSubmit}>
				<h1>Log in</h1>
				<input type="text" placeholder="Username" ref="loginusername" required = "required" required pattern="[a-zA-Z0-9]+"/>
				<input type="submit" value="Log in" />
				<br/>
				<br/>
			</form>
		);
	}
});


var SignupForm = React.createClass({
  
	handleSignupSubmit: function(e) {
		e.preventDefault();
		var username = React.findDOMNode(this.refs.signupusername).value.trim();
		var age = React.findDOMNode(this.refs.age).value.trim();
		var income = React.findDOMNode(this.refs.income).value.trim();
		var riskAppetite = React.findDOMNode(this.refs.riskAppetite).value.trim();
		var savings = React.findDOMNode(this.refs.savings).value.trim();
		if (!username || !age || !income || !riskAppetite || !savings) {
			return;
		}

		$.ajax({
			url: username + "/check_signup/?format=json",
			dataType: 'json',
			type: 'POST',
			data: {'age': age, 'income': income, 'riskAppetite': riskAppetite, 'savings': savings},
			cache: false,
			success: function(data) {
				this.props.onUserLogin(data.loginStatus, data.username);
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(err.toString());
			}.bind(this)
		});
				
		return;
	},

	render: function() {
		return (
			<form className="signupForm" onSubmit={this.handleSignupSubmit}>
				<br><h1>Sign up</h1></br>
				Username(alpha-numeric): <input type="text" ref="signupusername" required = "required" required pattern="[a-zA-Z0-9]+"/>
				<br>Age: <input type="number"  min="18" max="150" ref="age" required = "required" /></br>
				<br>Annual Income(in LPA): <input type="number" step="0.50" min="0" max="10000" ref="income" required = "required"/></br>
				<br>Risk Appetite(in %): <input type="number"  min="0" max ="100" step ="0.50" ref="riskAppetite" required = "required"/></br>
				<br>Savings(in %): <input type="number"  min="0" max ="100" step="0.50"ref="savings" required = "required"/></br>
				<br><input type="submit" value="Sign up" /></br>
			</form>
		);
	}
});

var LoginSignup = React.createClass({
	
	getInitialState: function() {
        return {
            loginStatus: false,
            username: ''
        };
    },
    
    handleUserLogin: function(loginStatus,username) {
        this.setState({
            loginStatus: loginStatus,
            username: username
        });
    },
    
	render: function() {
		if(this.state.loginStatus == true)
		{
			return (
				<AppBody username = {this.state.username} />
			);
		}
		else
		{
			return (
				<div className="loginSignup">
					<LoginForm onUserLogin = {this.handleUserLogin}/>
					<h1>OR</h1>
					<SignupForm onUserLogin = {this.handleUserLogin}/>
					<script type="text/javascript">alert(1);</script>
				</div>
			);
		}
	}
});


React.render(
	<LoginSignup />,
	document.getElementById('content')
);




/*
var AppBody = React.createClass({
	
	render: function() {
		return (
			<h1>App Body : {this.props.username}</h1>
		);
	}
});

var LoginForm = React.createClass({
	
	handleLoginSubmit: function(e) {
		e.preventDefault();
		var username = React.findDOMNode(this.refs.loginusername).value.trim();
		if (!username) {
			return;
		}
		
		//React.findDOMNode(this.refs.loginusername).value = '';
		// TODO: send request to the server and on response call onUserLogin(response.loginStatus, response.username)
		$.ajax({
			url: username + "/check_login/",
			dataType: 'json',
			cache: false,
			success: function(data) {
				console.log(data.loginStatus);
				this.props.onUserLogin(data.loginStatus, data.username)
				//console.log(this.props.loginStatus);
				alert(this.props.loginStatus);
				console.log(this.props.loginStatus);
			}.bind(this),
			error: function(xhr, status, err) {
				//console.error(err.toString());
			}.bind(this)
		});
		//console.log("HIIIIIIIII");
		//console.log(this.state.loginStatus);
		//return;
	},

	render: function() {
        var content = "";
		if(this.props.loginStatus == true)
		{
			content = (
				<AppBody username = {this.props.username} />
			);
		}
		else
		{
			content =  (
				<form className="loginForm" onSubmit={this.handleLoginSubmit}>
					<h1>Log in</h1>
					<input type="text" placeholder="Username" ref="loginusername" />
					<input type="submit" value="Log in" />
					<br/>
					<br/>
				</form>
			);
		}
		return (
            <span>{this.props.loginStatus}{content}</span>
        );
	}
});


var SignupForm = React.createClass({
  
	handleSignupSubmit: function(e) {
		var username = React.findDOMNode(this.refs.signupusername).value.trim();
		var age = React.findDOMNode(this.refs.age).value.trim();
		var income = React.findDOMNode(this.refs.income).value.trim();
		var riskAppetite = React.findDOMNode(this.refs.riskAppetite).value.trim();
		var savings = React.findDOMNode(this.refs.savings).value.trim();
		if (!username) {
			return;
		}
		if (!age ) {
			return;
		}
		if (!income ) {
			return;
		}
		if (!riskAppetite ) {
			return;
		}
		if (!savings ) {
			return;
		}
		// TODO: send request to the server
		return;
	},

	render: function() {
		return (
			<form className="signupForm" onSubmit={this.handleSignupSubmit}>
				<br><h1>Sign up</h1></br>
				Username: <input type="text" ref="signupusername" />
				<br>Age: <input type="number"  min="18" max="150" ref="age" /></br>
				<br>Income: <input type="number" step="0.50" min="0" max="10000" ref="income" /></br>
				<br>Risk Appetite(in %): <input type="number"  min="0" max ="100" step ="0.50" ref="riskAppetite" /></br>
				<br>Savings(in %): <input type="number"  min="0" max ="100" step="0.50"ref="savings" /></br>
				<br><input type="submit" value="Sign up" /></br>
			</form>
		);
	}
});

var LoginSignup = React.createClass({
	
	getInitialState: function() {
        return {
            loginStatus: false,
            username: ''
        };
    },
    
    handleUserLogin: function(loginStatus,username) {
    	console.log("9999999999999999999999999999999");
    	console.log(this.isMounted());
        this.setState({
            loginStatus: loginStatus,
            username: username
        });
    },
    
	render: function() {
//		if(this.state.loginStatus == true)
//		{
//			return (
//				<AppBody username = {this.state.username} />
//			);
//		}
//		else
//		{
			return (
				<div className="loginSignup">
					<LoginForm loginStatus = {this.state.loginStatus} username = {this.state.username} onUserLogin = {this.handleUserLogin}/>
					<h1>OR</h1>
					<SignupForm />
				</div>
			);
//		}
	}
});


React.render(
	<LoginSignup />,
	document.getElementById('content')
);
*/


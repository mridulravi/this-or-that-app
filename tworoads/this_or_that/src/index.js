    
var AppBody = React.createClass({
	
	getInitialState: function() {
        return {
            firstID: '',
            secondID: ''
        };
    },
    
    componentDidMount: function() {
        $.ajax({
			url: this.props.username + "/get_user_strategies/?format=json",
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
    },
	
	render: function() {
		return (
			//<h1>App Body : {this.props.username}</h1>
			<div>
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
				<input type="text" placeholder="Username" ref="loginusername" />
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


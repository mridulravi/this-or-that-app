
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
      width: 600,
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

    var xScale = d3.scale.linear()
      .domain([new Date(99,5,24), new Date(99,5,30)])
      .range([0, this.props.width]);

    var yScale = d3.scale.linear()
      .domain([0, max])
      .range([this.props.height, 0]);

    return (
      <Chart width={this.props.width} height={this.props.height}>
        <DataSeries data={data} size={size} xScale={xScale} yScale={yScale} ref="series1" color="cornflowerblue" />
      </Chart>
    );
  }
});

var data = [ { x: new Date(99,5,24), y: 5.5 }, { x: new Date(99,5,25), y: 5 }, { x: new Date(99,5,26), y: 6 }, { x: new Date(99,5,27), y: 5 }, { x: new Date(99,5,28), y: 8 }, { x: new Date(99,5,29), y: 15 }, { x: new Date(99,5,30), y: 10 }  ];

React.render(
  <LineChart data={data} />,
  document.getElementById('content')
);

















//////////var LoginSignup = React.createClass({
//////////	
//////////	getInitialState: function() {
//////////        return {
//////////            loginStatus: false,
//////////            username: ''
//////////        };
//////////    },
//////////    
//////////    handleUserLogin: function(loginStatus,username) {
//////////        this.setState({
//////////            loginStatus: loginStatus,
//////////            username: username
//////////        });
//////////    },
//////////    
//////////	render: function() {
//////////		if(this.state.loginStatus == true)
//////////		{
//////////			return (
//////////				<AppBody username = {this.state.username} />
//////////			);
//////////		}
//////////		else
//////////		{
//////////			return (
//////////				<div className="loginSignup">
//////////					<LoginForm onUserLogin = {this.handleUserLogin}/>
//////////					<h1>OR</h1>
//////////					<SignupForm onUserLogin = {this.handleUserLogin}/>
//////////				</div>
//////////			);
//////////		}
//////////	}
//////////});

//////////var React = require('react');
//////////var Chart = require('react-google-charts').Chart;

////////var LoginSignup = React.createClass({

////////    componentDidMount: function() {

////////        var options = {
////////            title: 'Age vs. Weight comparison',
////////            hAxis: {title: 'Age', minValue: 0, maxValue: 15},
////////            vAxis: {title: 'Weight', minValue: 0, maxValue: 15},
////////            legend: 'none'
////////        };

////////         var rows = [
////////            [ 8,      12],
////////            [ 4,      5.5],
////////            [ 11,     14],
////////            [ 4,      5],
////////            [ 3,      3.5],
////////            [ 6.5,    7]
////////        ];

////////        var columns = [
////////            {
////////                'type': 'number',
////////                'label' : 'Age'
////////            }, 
////////            {
////////                'type' : 'number',
////////                'label' : 'Weight'
////////            }
////////        ];

////////        this.setState({
////////            'rows' : rows,
////////            'columns' : columns,
////////            'options' : options
////////      });


////////    },
////////    
////////    render: function() {
////////    	//var Chart = require('react-google-charts').Chart;
////////        //<Chart chartType = "ScatterChart" rows = {this.state.rows} columns = {this.state.columns} options = {this.state.options} graph_id = "ScatterChart"  width={"100%"} height={"400px"}  legend_toggle={true} />

////////    }
////////    
////////}); 


////////module.exports = LoginSignup   

//////////React.render(
//////////	<LoginSignup />,
//////////	document.getElementById('content')
//////////);





//////////var React=require('react');
//////////var vis = require('vis');
//////////var React = require('react');
//////////var uuid = require('uuid');

//////////var Graph = React.createClass({
//////////  getDefaultProps: function () {
//////////    return {
//////////        graph: {},
//////////        identifier:uuid.v4(),
//////////        style:{width:"640px",height:"480px"}
//////////    };
//////////  },

//////////  getInitialState:function(){
//////////    return {
//////////      hierarchicalLayout:true
//////////    };
//////////  },

//////////  render: function() {
//////////    return React.createElement("div", {onDoubleClick: this.changeMode, id: this.props.identifier, style: this.props.style}, this.props.identifier);
//////////  },

//////////  changeMode:function(event) {
//////////    this.setState({hierarchicalLayout: !this.state.hierarchicalLayout});
//////////    this.updateGraph();
//////////  },

//////////  componentDidMount: function (){
//////////    this.updateGraph();
//////////  },

//////////  componentDidUpdate: function (){
//////////    this.updateGraph();
//////////  },

//////////  updateGraph:function(){
//////////    // Container
//////////    var container = document.getElementById(this.props.identifier);

//////////    // Options
//////////    var options = {
//////////      stabilize: false,
//////////      smoothCurves: false,
//////////      edges: {
//////////        color: '#000000',
//////////        width: 0.5,
//////////        arrowScaleFactor:0.5,
//////////        style:"arrow"
//////////      }

//////////    };
//////////    if (this.state.hierarchicalLayout) {
//////////      options.hierarchicalLayout = {
//////////        enabled: true,
//////////        direction: "UD",
//////////        levelSeparation:100,
//////////        nodeSpacing:1
//////////      };
//////////    } else {
//////////      options.hierarchicalLayout = {
//////////        enabled: false
//////////      };
//////////    }

//////////    var network = new vis.Network(container, this.props.graph, options);
//////////  }



//////////});
//////////module.exports = Graph;






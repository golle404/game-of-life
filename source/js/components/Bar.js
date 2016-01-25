'use strict';

var React = require("react");

module.exports = React.createClass({
	displayName: 'Bar',
	render: function(){
		var liveHeight = 200 *(this.props.stats.live - this.props.stats.newBorn)/this.props.total+"px";
		var newHeight = 200 * this.props.stats.newBorn/this.props.total+"px";
		var	barStyle={order: this.props.stats.gen}
		var newStyle={height: newHeight}; 
		var liveStyle={height: liveHeight};

		var barClass = "bar";
		if((this.props.stats.gen % 25) === 0){
			barClass += " mark";
		}
		return(
			<div className={barClass} data-mark={this.props.stats.gen} style={barStyle}>
				<div style={newStyle} className="val" ></div>
				<div style={liveStyle} className="val" ></div> 
			</div>
		);
	}
})
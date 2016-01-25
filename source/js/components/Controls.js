'use strict';

var React = require("react");
var Switch = require("./Switch")
module.exports=React.createClass({
	displayName: 'Controls',
	render: function(){
		return(
			<div className="controls">
				<Switch 
					id="toogle-interval" 
					onLabel="ON" 
					offLabel="OFF"
					checked={true}
					handleChange={this.props.toggleInterval}
				/> 
				<div className="reset" onClick={this.props.reset}>RESET</div>
			</div>
		);
	}
})

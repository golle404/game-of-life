'use strict';

var React = require("react");

module.exports=React.createClass({
	displayName: 'Switch',
	getInitialState: function(){
		return ({checked: this.props.checked || false});
	},
	getLabel: function(){
		return this.state.checked ? this.props.checkedLabel : this.props.unckeckedLabel;
	},
	onSwitch: function(){
		var state = !this.state.checked
		this.setState({checked: state});
		this.props.handleChange(state);
	},
	render: function(){

		return(
			<div className="switch">
				<input type="checkbox" id={this.props.id} onChange={this.onSwitch} defaultChecked={this.props.checked}/>
				<label className="on-label" htmlFor={this.props.id}>{this.props.onLabel}</label>
				<label className="knob" htmlFor={this.props.id}></label>
				<label className="off-label" htmlFor={this.props.id}>{this.props.offLabel}</label>
			</div>
		);
	}
})

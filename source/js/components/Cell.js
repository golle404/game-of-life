'use strict';

var React = require("react");

module.exports=React.createClass({
	displayName: 'Cell',
	render: function(){
		var style = this.props.cell.isAlive ? this.props.cell.isNew ? "new" : "live" : "dead";
		style += " cell";
		
		return(
			<div 
				className={style} 
				onClick={this.props.cellClickHandler.bind(null, this.props.cell.row, this.props.cell.col)}
			>
			</div>
		);
	}
})

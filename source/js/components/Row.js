'use strict';

var React = require("react");
var Cell = require("./Cell");

module.exports=React.createClass({
	displayName: 'Row',
	render: function(){
		var cellClickHandler = this.props.cellClickHandler
		function makeCells(cell, id){
			return (
				<Cell 
					key={id} 
					cell={cell} 
					cellClickHandler={cellClickHandler}
				/>
			)
		}
		
		return(
			<div className="row">
				{this.props.cells.map(makeCells)}
			</div>
		);
	}
})

'use strict';

var React = require("react");
var Row = require("./Row");

module.exports=React.createClass({
	displayName: 'Grid',
	render: function(){
		var cellClickHandler = this.props.cellClickHandler
		function makeRows(row, id){
			return <Row key={id} cells={row} cellClickHandler={cellClickHandler}/>
		};
		return(
			<div className="grid">
				{this.props.cells.map(makeRows)}
			</div>
		);
	}
})
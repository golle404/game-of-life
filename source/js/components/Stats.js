'use strict';

var React = require("react");
var Bar = require("./Bar");

module.exports=React.createClass({
	displayName: 'Stats',
	getInitialState: function(){
		return({bars: []});
	},
	render: function(){
		var total = this.props.totalCells
		var stats = this.props.stats
		var gen = this.props.gen;
		var barId = gen % 100;
		var current = stats[stats.length-1];
		return(
			<div className="stats">
				<div className="graph">
					<div className="max"></div>
					<div className="bars">
						{this.props.stats.map(function(stat){
							return (
								<Bar stats={stat} total={total} gen={gen} key={stat.gen}/>
							)
						})}				
					</div>
				</div>
				<div className="info">
					<div className="info-box total">{total}</div>
					<div className="info-box alive">{current.live + current.newBorn}</div>
					<div className="info-box newborn">{current.newBorn}</div>
					<div className="info-box gen">{gen}</div>
				</div>
			</div>
		);
	}
})
'use strict';

var React = require("react");
var Grid = require("./Grid");
var Controls = require("./Controls");
var Stats = require("./Stats");

var pat = [
	[-1, -1],
	[0, -1],
	[1, -1],
	[-1, 0],
	[1, 0],
	[-1, 1],
	[0, 1],
	[1, 1]
];
var initRows = 30;
var initCols = 60;
var initInterval = 250;

module.exports = React.createClass({
	displayName: 'Game',
	getInitialState: function() {
		return ({
			rows: initRows,
			cols: initCols,
			cells: [],
			total: 0,
			interval: initInterval,
			isRunning: true,
			generation: 0,
			liveCells: 0,
			newBorn: 0,
			stats: []
		})
	},
	generateCells: function(randomAlive) {
		var r = this.state.rows;
		var c = this.state.cols;

		var cells = [];
		var stats = [];
		var stat = {live: 0, newBorn: 0, gen: 0};

		for (var i = 0; i < r; i++) {
			var row = [];
			for (var j = 0; j < c; j++) {
				var alive = Math.random() > randomAlive;
				row.push({
					row: i,
					col: j,
					isAlive: alive,
					isNew: alive
				});
				stat.live += Number(alive);
			}
			cells.push(row);
		}
		stat.newBorn = stats.live;
		stats.push(stat);
		this.setState({
			cells: cells,
			stats: stats, 
			total: r*c,
			generation: 0
		})
	},
	updateCells: function() {
		var test = this.testCell;
		var cells = [];
		var liveCells = 0;
		var newBorn = 0;
		var stat = {live: 0, newBorn: 0, gen: this.state.generation+1};

		this.state.cells.forEach(function(row, i) {
			cells[i]=[];
			row.forEach(function(cell,j) {
				var lives = test(cell.row, cell.col, cell.isAlive);
				cells[i][j]={
					row: i,
					col: j,
					isAlive: lives,
					isNew: cell.isNew = !cell.isAlive && lives
				};
				stat.live += Number(cells[i][j].isAlive)
				stat.newBorn += Number(cells[i][j].isNew)
			});
		});
		var stats = this.state.stats.concat([stat]);
		if(stats.length > 100){
			stats.shift();
		}
		this.setState({
			cells: cells,
			generation: this.state.generation + 1,
			liveCells: liveCells,
			newBorn: newBorn,
			stats: stats
			}, function(){
				if(this.state.isRunning){
					window.setTimeout(this.updateCells, this.state.interval);	
				}	
			});
	},
	testCell: function(r,c,alive) {
		var nbs = 0;
		var nr, nc;
		
		for(var i=0; i<8; i++){
			nr = (r + pat[i][0] + this.state.rows) % this.state.rows;
			nc = (c + pat[i][1] + this.state.cols) % this.state.cols;
			if(this.state.cells[nr][nc].isAlive){
				nbs++;
			}
		}
		
		if(this.state.cells[r][	c].isAlive){
			if(nbs < 2 || nbs > 3){
				return false;
			}else {
				return true;
			}
		}else{
			if(nbs===3){
				return true;
			}else {
				return false;
			}
		}
	},
	componentDidMount: function() {
		window.setTimeout(this.updateCells, this.state.interval);
	},
	componentWillMount: function(){
		this.generateCells(0.4);
	},
	cellClickHandler: function(r, c){
		var nc = this.state.cells;
		var lives = !nc[r][c].isAlive;
		nc[r][c].isNew = !nc[r][c].isAlive && lives;
		nc[r][c].isAlive = lives
		
		this.setState({cells: nc})	
	},
	toggleInterval: function(state){
		this.setState({isRunning: state},function(){
			if(state){
				this.updateCells();
			}
		});
	},
	reset: function(){
		this.generateCells(1);
		/*this.setState({
			generation: 0
		},function(){
			this.generateCells(1);
		})*/
	},
	render: function() {
		return ( 
			<div className = "game" >
				<div className="title"><a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Conway's Game of Life</a>
				</div>
				<Stats gen={this.state.generation} stats={this.state.stats} totalCells={this.state.total}/>
				<Grid cells = {this.state.cells} cellClickHandler={this.cellClickHandler}/>
				<Controls toggleInterval={this.toggleInterval} reset={this.reset}/>	
			</div>
		);
	}
})
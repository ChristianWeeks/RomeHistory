d3.selection.prototype.moveToFront = function() {

	return this.each(function(){
		this.parentNode.appendChild(this);
	});
};


function MouseWheelHandler(e){
	var e = window.event || e;
	var delta = e.wheelDelta 
	console.log(e);
	var shift = e.wheelDelta / 120 * 30;
	console.log(shift);
	//d3.select(this).attr("viewBox"
}


var width = 1200,
    height = 800;

var projection = d3.geo.mercator()
    .scale(500)
    .translate([width / 2, height / 2]);

var projection = d3.geo.albers()
	.center([20,45])
	.rotate([0, 0])
	.parallels([28, 58])
	.scale(3000)
	.translate([width / 2, height / 2]);
var path = d3.geo.path()
    .projection(projection);

console.log(projection([0,0]));
var zoomCompensation = projection([0,0]);

var svg = d3.select("body").append("svg")
    .style("width", "calc(100% - 200px)")
    .style("height", "calc(100% - 120px)")
	.attr("viewBox", "0 0 " + width + " " + height)
	.attr("preserveAspectRatio", "xMidYMid");

	
var timelineSvg = d3.select("body").append("svg")
    .style("width", "calc(100% - 200px)")
    .style("height", 100);
var test = "hello";
var elements = {};
var data = {};
var dataMap = {};

/*var zoom = d3.behavior.zoom()
	.scale(1)
	.scaleExtent([.05, 25])
	.translate([0,0])
	.on("zoom", zoomed);
svg.call(zoom);


//function zoomed() {
	elements.land.attr("transform", "translate(" + zoom.translate() + ")scale(" + zoom.scale() + ")")
		.style("stroke-width", 2 / zoom.scale() );
	elements.rivers.attr("transform", "translate(" + zoom.translate() + ")scale(" + zoom.scale() + ")")
		.style("stroke-width", 2 / zoom.scale());
	elements.territories.attr("transform", "translate(" + zoom.translate() + ")scale(" + zoom.scale() + ")")
		.style("stroke-width", 10 / zoom.scale() );
	elements.cities.attr("transform", "translate(" + zoom.translate() + ")scale(" + zoom.scale() + ")")
		.style("stroke-width", 2 / zoom.scale())
		.attr("r", 3 / zoom.scale());
	elements.cityLabels.attr("transform", "translate(" + zoom.translate() + ")scale(" + zoom.scale() + ")")
		.style("font-size", 30 / zoom.scale());

}*/


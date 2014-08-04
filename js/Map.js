d3.selection.prototype.moveToFront = function() {
	return this.each(function(){
		this.parentNode.appendChild(this);
	});
};

var width = 1200,
    height = 800;

var projection = d3.geo.mercator()
    .scale(500)
    .translate([width / 2, height / 2]);

var projection = d3.geo.albers()
	.center([0,41.9])
	.rotate([-12.5, 0])
	.parallels([28, 58])
	.scale(1200)
	.translate([width / 2, height / 2]);
var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("body").append("svg")
	.style("border-style", "dotted")
    .style("width", "calc(100% - 200px)")
    .style("height", "calc(100% - 100px)")
	.attr("viewBox", "400 400 " + 250 + " " + 50)
	.attr("preserveAspectRatio", "xMidYMid");
var timelineSvg = d3.select("body").append("svg")
	.style("border-style", "dotted")
    .style("width", "calc(100% - 200px)")
    .style("height", 100);

	timeline(timelineSvg, null)
d3.json("js/eventData.json", function(error, eventData){	
d3.json("json/RomeHistory.json", function(error, Europe) {

	//all data will be stored in a single object
	var data = {};
	console.log(Europe);
	data.land = topojson.feature(Europe, Europe.objects.land).features;
	data.rivers = topojson.feature(Europe, Europe.objects.rivers).features;
	data.cities = topojson.feature(Europe, Europe.objects.cities).features;
	data.events = topojson.feature(Europe, Europe.objects.events).features;
	data.events.foreach(function(currEvent){
		if(eventData.Data[currEvent.properties.Name
	});
	console.log(data.events);
	//similarly, all elements corresponding to the data will be stored in a single object.
	var elements = {};
	elements.land = svg.selectAll("land")
		.data(data.land)
		.enter()
		.append("path")
		.attr("fill", "#ffffcc")
		.attr("stroke", "black")
		.attr("stroke-width", 1)
		.attr("d", path);

	elements.rivers = svg.selectAll("rivers")
		.data(data.rivers)
		.enter()
		.append("path")
		.attr("stroke", "#aaaaff")
		.attr("fill", "none")
		.attr("stroke-width", 1)
		.attr("d", path);

	elements.cities = svg.selectAll("cities")
		.data(data.cities)
		.enter()
		.append("circle")
		.attr("r", 1)
		.attr("stroke", "blue")
		.attr("stroke-width", 1)
		.attr("transform", function(d) { return "translate(" + projection(d.geometry.coordinates) + ")";});

	
});
}


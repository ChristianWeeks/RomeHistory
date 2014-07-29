var width = 1700,
    height = 1000;

var projection = d3.geo.mercator()
    .scale(500)
    .translate([width / 2, height / 2]);

var projection = d3.geo.albers()
	.center([0,41.9])
	.rotate([-12.5, 0])
	.parallels([28, 58])
	.scale(2000)
	.translate([width / 2, height / 2]);
var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("json/ancientEurope.json", function(error, Europe) {
	svg.selectAll("land")
		.data(topojson.feature(Europe, Europe.objects.land).features)
		.enter()
		.append("path")
		.attr("fill", "#ffffcc")
		.attr("stroke", "black")
		.attr("stroke-width", 1)
		.attr("d", path);

	svg.selectAll("rivers")
		.data(topojson.feature(Europe, Europe.objects.rivers).features)
		.enter()
		.append("path")
		.attr("stroke", "#aaaaff")
		.attr("fill", "none")
		.attr("stroke-width", 3)
		.attr("d", path);

	svg.selectAll("cities")
		.data(topojson.feature(Europe, Europe.objects.cities).features)
		.enter()
		.append("path")
		.attr("stroke", "black")
		.attr("stroke-width", 6)
		.attr("d", path);

	
});



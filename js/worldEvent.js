function worldEvent(eventData, modifiers, zoom){
	this.coordinates = projection(eventData.geometry.coordinates);
	this.properties = eventData.properties;
	this.modifiers = modifiers;
	this.zoom = zoom;
	
}


//makes a territory or province visible
worldEvent.prototype.foundTerritory = function(){
	var index = dataMap.territories[this.modifiers.foundTerritory[0]];
	data.territories[index].properties.opacity = 1;

}

//appropriate changes the class of a territory (to whom it now belongs)
worldEvent.prototype.modifyTerritory = function(){

}

//makes a city visible
worldEvent.prototype.foundCity = function(){
	var index = dataMap.cities[this.modifiers.foundCity[0]];
	data.cities[index].properties.opacity = 1;

}

//makes a city invisible
worldEvent.prototype.destroyCity = function(){

}

//writes a sentence describing the event to the written timeline
worldEvent.prototype.writeToWrittenTimeline = function(){

}

//moves the viewbox to give an appropriate view of the event
worldEvent.prototype.modifyViewbox = function(){
	var scaleFactor = 20;

	var center = this.coordinates;

	//point centering attributable to bl.ocks.org/linssen/7352810
	var translate = zoom.translate(),
		translate0 = [],
		l = [],
		//view contains the coordinates of the viewbox and its current scale
		view = {x: translate[0], y: translate[1], k: zoom.scale()};

	translate0 = [(center[0] - view.x) / view.k, (center[1] - view.y) / view.k];
	view.k = scaleFactor;
	l = [translate0[0]*view.k + view.x, translate0[1] * view.k + view.y];

	view.x += center[0] - l[0];
	view.y += center[1] - l[1];
	interpolateZoom([view.x, view.y], view.k);

}

//update function - makes all changes to the map that are a consequence of this event
worldEvent.prototype.happen = function(){	
	this.foundTerritory();
	this.foundCity();
	this.modifyViewbox();

	svg.selectAll("#territory")
		.data(data.territories)
		.transition().duration(5000)
		.attr("opacity", function(d) { return d.properties.opacity;});
	svg.selectAll("#city")
		.data(data.cities)
		.transition().duration(5000)
		.attr("opacity", function(d) { return d.properties.opacity;});
	svg.selectAll(".CityLabel")
		.data(data.cities)
		.transition().duration(5000)
		.attr("opacity", function(d) { return d.properties.opacity;});
//	elements.territories
}

function interpolateZoom(translate, scale) {
	var self = this;
	return d3.transition().duration(8000).tween("zoom", function () {
		var iTranslate = d3.interpolate(zoom.translate(), translate),
		   iScale = d3.interpolate(zoom.scale(), scale);
		return function (t) {
			zoom
				.scale(iScale(t))
				.translate(iTranslate(t));
			zoomed();
		};
	});
}



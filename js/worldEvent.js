function worldEvent(eventData, modifiers, data, dataMap, zoom){
	this.coordinates = eventData.geometry.coordinates;
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
	this.zoom.translate([this.coordinates[0], this.coordinates[1]]).scale(7);

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


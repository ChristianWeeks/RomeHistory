function worldEvent(eventData, modifiers){
	this.coordinates = projection(eventData.geometry.coordinates);
	this.properties = eventData.properties;
	this.modifiers = modifiers;
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
	var scaleFactor = 10; 

	var newCenter = this.coordinates;
	var viewBoxTranslate = [],
		viewBoxDimensions = [];
	viewBoxDimensions[0] = width / scaleFactor;
	viewBoxDimensions[1] = height / scaleFactor;

	viewBoxTranslate[0] = newCenter[0] - viewBoxDimensions[0]/2;
	viewBoxTranslate[1] = newCenter[1] - viewBoxDimensions[1]/2;
	var time = 3000;
	svg.transition().duration(3000).attr("viewBox", viewBoxTranslate[0] + " " + viewBoxTranslate[1] + " " + viewBoxDimensions[0] + " " + viewBoxDimensions[1]);
	function scaleElements(dataArray){
		for(var i = 0; i < dataArray.length; i++)
			dataArray[i].strokeWidth = dataArray[i].strokeWidth / scaleFactor;
	}
	function scaleText(dataArray){
		for(var i = 0; i < dataArray.length; i++)
			dataArray[i].fontSize = dataArray[i].fontSize / scaleFactor;
	}
	scaleElements(data.land);
	scaleElements(data.rivers);
	scaleElements(data.territories);
	scaleElements(data.cities);
	scaleText(data.cities);
	

	//scaling features

}

//update function - makes all changes to the map that are a consequence of this event
worldEvent.prototype.happen = function(){	
	this.foundTerritory();
	this.foundCity();
	this.modifyViewbox();

	svg.selectAll("#land")
		.data(data.land)
		.transition().duration(3000)
		.attr("stroke-width", function(d) {return d.strokeWidth;});
	svg.selectAll("#river")
		.data(data.rivers)
		.transition().duration(3000)
		.attr("stroke-width", function(d) { return d.strokeWidth;});
	svg.selectAll("#territory")
		.data(data.territories)
		.transition().duration(3000)
		.attr("stroke-width", function(d) {return d.strokeWidth;})
		.attr("opacity", function(d) { return d.properties.opacity;});
	svg.selectAll("#city")
		.data(data.cities)
		.transition().duration(3000)
		.attr("stroke-width", function(d) { return d.strokeWidth;})
		.attr("opacity", function(d) { return d.properties.opacity;});
	svg.selectAll(".CityLabel")
		.data(data.cities)
		.transition().duration(3000)
		.style("font-size", function(d) { return d.fontSize;})
		.attr("opacity", function(d) { console.log(d); return d.properties.opacity;});
//	elements.territories
}


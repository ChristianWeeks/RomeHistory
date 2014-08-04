function worldEvent(){

	var data = {}


}

//update function - makes all changes to the map that are a consequence of this event
worldEvent.prototype.happen = function(){


}


//makes a territory or province visible
worldEvent.prototype.foundTerritory = function(){

}

//appropriate changes the class of a territory (to whom it now belongs)
worldEvent.prototype.modifyTerritory = function(){

}

//makes a city visible
worldEvent.prototype.foundCity = function(){

}

//makes a city invisible
worldEvent.prototype.destroyCity = function(){

}

//writes a sentence describing the event to the written timeline
worldEvent.prototype.writeToWrittenTimeline = function(){

}

//moves the viewbox to give an appropriate view of the event
worldEvent.prototype.modifyViewbox = function(){

}

//Only 1 timeline will exist, so no need for prototype
function timeline(svg, events){

	this.currEvent = events[0];
	this.year = events[0].properties.YearStart;
	this.currEventIndex = 0;
	//event incrementers are private - nothing should change the current event other than clicking the buttons

	var nextEvent = function(){
		this.currEventIndex += 1;
		this.currEvent = events[currEventIndex];
		this.currEvent.happen();	
	}
	//decrements the event counter and reverts to conditions before event occurrence
	var prevEvent = function(){
	}
	this.createSvgElements = function(svg, nextEvent, prevEvent){
		var forwardX = width - 100;
		var forwardButton = svg.append("path")
			.attr("d", "M " + forwardX + " 20, L " + forwardX + " 60, " + (forwardX + 50) + " 40, z")
			.style("fill", "#ff9999")
			.attr("stroke", "#444444")
			.attr("stroke-width", 2)
			.on("mouseover", buttonMouseOver)
			.on("mouseout", buttonMouseOut)
			.on("click", nextEvent);

		var backwardX = 100;
		var backwardButton = svg.append("path")
			.attr("d", "M " + backwardX + " 20, L " + backwardX + " 60, " + (backwardX - 50) + " 40, z")
			.style("fill", "#ff9999")
			.attr("stroke", "#444444")
			.attr("stroke-width", 2)
			.on("mouseover", buttonMouseOver)
			.on("mouseout", buttonMouseOut)
			.on("click", prevEvent);


		function buttonMouseOver(){
			d3.select(this).transition()
				.attr("stroke", "#222222")
				.style("fill", "#ff5555")
				.attr("stroke-width", 5);
		}
		function buttonMouseOut(){
			d3.select(this).transition()
				.attr("stroke", "#444444")
				.style("fill", "#ff9999")
				.attr("stroke-width", 2);
		}

	}

	this.createSvgElements(svg);
	this.currEvent.happen();

}



d3.json("js/fixedEvents.json", function(error, eventData){	
	if(error)
		console.log(error);
	d3.json("json/RomeHistory.json", function(error, Europe) {
		if(error)
			console.log(error);
	//	svg.transition().duration(3000).attr("viewBox", "450 340 " + 300 + " " + 120); 
		//all data will be stored in a single object
		dataMap.cities = {};
		dataMap.territories = [];
		data.land = topojson.feature(Europe, Europe.objects.land).features;
		data.rivers = topojson.feature(Europe, Europe.objects.rivers).features;
		data.cities = topojson.feature(Europe, Europe.objects.cities).features;
		data.events = topojson.feature(Europe, Europe.objects.events).features;
		data.territories = topojson.feature(Europe, Europe.objects.territories).features;

		var index = 0;
		data.cities.forEach(function(curr){
			curr.properties.opacity = 0;
			dataMap.cities[data.cities[index].properties.Name] = index;
			index++;
		});
		//
		index = 0;
		data.territories.forEach(function(curr){
			curr.properties.opacity = 0;
			dataMap.territories[data.territories[index].properties.Name] = index;
			index++;
		});

		//similarly, all elements corresponding to the data will be stored in a single object.
		elements.land = svg.selectAll(".Land")
			.data(data.land)
			.enter()
			.append("path")
			.attr("class", "Land")
			.attr("stroke-width", 1)
			.attr("d", path);

		elements.territories = svg.selectAll("territories")
			.data(data.territories)
			.enter()
			.append("path")
			.attr("id", "territory")
			.attr("opacity", function(d) {  return d.properties.opacity;})
			//.attr("opacity", 0)
			.attr("class", function(d) { return d.properties.Sovereign;})
			.attr("d", path);

		elements.rivers = svg.selectAll(".River")
			.data(data.rivers)
			.enter()
			.append("path")
			.attr("class", "River")
			.attr("d", path);

		elements.cities = svg.selectAll("#city")
			.data(data.cities)
			.enter()
			.append("circle")
			.attr("cx", function(d) { return projection(d.geometry.coordinates)[0];})
			.attr("cy", function(d) { return projection(d.geometry.coordinates)[1];})
			.attr("id", "city")
			.attr("r", 1)
			.attr("stroke", "blue")
			.attr("opacity", 0)
			.attr("stroke-width", 1);

		elements.cityLabels = svg.selectAll(".CityLabel")
			.data(data.cities)
			.enter()
			.append("text")
			.attr("x", function(d) { return projection(d.geometry.coordinates)[0];})
			.attr("y", function(d) { return projection(d.geometry.coordinates)[1];})
			.attr("class", "CityLabel")
			.attr("opacity", 0)
			.text(function(d) { return d.properties.Name;})
			.attr("transform", function(d) { return "translate(" + projection(d.geometry.coordinates) + ")";});
		console.log(projection(data.cities[16].geometry.coordinates));
		console.log(data);

		elements.events = svg.selectAll(".events")
			.data(data.events)
			.enter()
			.append("circle")
			.attr("cx", function(d) { return projection(d.geometry.coordinates)[0];})
			.attr("cy", function(d) { return projection(d.geometry.coordinates)[1];})
			.attr("r", 1)
			.attr("stroke", "blue")
			.attr("opacity", 0)
			.attr("stroke-width", 1)
			.attr("transform", function(d) { return "translate(" + projection(d.geometry.coordinates) + ")";});
	
		elements.eventLabels = svg.selectAll(".EventLabel")
			.data(data.events)
			.enter()
			.append("text")
			.attr("x", function(d) { return projection(d.geometry.coordinates)[0];})
			.attr("y", function(d) { return projection(d.geometry.coordinates)[1];})
			.attr("class", "CityLabel")
			.attr("opacity", 0)
			.text(function(d) { return d.properties.Name;})
			.attr("transform", function(d) { return "translate(" + projection(d.geometry.coordinates) + ")";});
		
		var worldEventObjects = new Array(data.events.length);
		//sorting the events sequentially
		index = 0;
		data.events.sort(function(a, b) { return a.properties.YearStart - b.properties.YearEnd;});
		data.events.forEach(function(currEvent){
			if(eventData.Data[currEvent.properties.Name]){
				worldEventObjects[index] = new worldEvent(currEvent, eventData.Data[currEvent.properties.Name]);	
			}
			else
				console.log("No match found for " + currEvent.properties.Name);
			index++;
		});
		var centerSpot;

		timeline(timelineSvg, worldEventObjects);
		/*svg.selectAll(".CityLabel")
			.data(data.cities)
			.text(function(d){ return d.properties.Name;})
			.attr("opacity", 1);
*/

		
	});
});


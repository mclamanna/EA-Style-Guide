/*************************
** Color Key			**
**************************/
function colorKey(containerID,labels,colors) {
	var bSize = 14;
	var lineHeight = bSize + 4;
	
		
	var svg = d3.select('#'+containerID),
		margin = {top: 0, right: 10, bottom: 10, left: 10};
		
	var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	var box = g.selectAll(".color-box")
		.data(colors)
		.enter()
		.append("rect")
			.attr("class", "color-box")
			.attr("fill", function(d){return d;})
			.attr("x", "0")
			.attr("y", function(d,i){ return (i)*lineHeight; })
			.attr("width", bSize)
			.attr("height", bSize);
			
	var txt = g.selectAll(".color-title")
		.data(labels)
		.enter()
		.append("text")
			.attr("class", "color-title")
			.attr("x", 1.5*bSize)
			.attr("y", function(d,i){ return (i)*lineHeight + bSize - 2; })
			.text(function(d) { return d; });		

}

//http://beta.freecodecamp.com/en/challenges/data-visualization-projects/visualize-data-with-a-bar-chart

//Import Data
var data;
d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json", function(error, json) {
  if (error) return console.warn(error);
  data = json.data;

var totalWidth = 900;
var totalHeight = 500;

var margin = {
  top: 20,
  right: 30,
  bottom: 20,
  left: 60
}

var width = totalWidth - margin.left - margin.right
var height = totalHeight - margin.top - margin.bottom
var barWidth = width/data.length

var minDate = data[0][0].split("-")[0];
var maxDate = data[data.length-1][0].split("-")[0];
var maxGDP = data[data.length-1][1];
var minGDP = data[0][1];
// debugger;
var scaleX = d3.scale.linear()
                    .range([0,width])
                    .domain([minDate, maxDate])

var scaleY = d3.scale.linear()
                  .domain([minGDP,maxGDP])
                  .range([height,0])

//Define SVG Container
var svgContainer = d3.select(".chart")
                     .append("svg")
                     .attr("width", totalWidth)
                     .attr("height", totalHeight)
                     .append("g")
                     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var yAxisText = svgContainer.append("g")
                           .append("text")
                           .attr("x", -100)
                           .attr("y", 70)
                           .attr("transform", "rotate(-90)")
                           .text("GDP in billions of $")
                           .style("font-size", "10px")

var tip = d3.tip()
 .attr('class', 'd3-tip')
 .offset([-10, 0])
 .html(function(d) {

    return `<strong>Year:</strong> ${d[0]}\ \
            <strong>GDP:</strong> ${d[1]}`  ;
  })

var tipGroup = svgContainer.append("g")
                          .call(tip)

//Draw Bar Charts
var rectangles = svgContainer.selectAll(".bar")
                             .data(data, (d)=>d[1])
                             .enter()
                             .append("rect")


// Modify Bar chart attr
// y = heightOfSVG - heightOfBar would place the bars right-side-up.
// y = h - m * d, where m is the constant that scales the data points.
var rectangleAttributes = rectangles.attr("x", (d, i) => i*barWidth)
                                    .attr("y", (d)=> scaleY(d[1]))
                                    .attr("height", (d)=> scaleY(0)-scaleY(d[1])+'px')
                                    .attr("width", barWidth+'px')
                                    .attr("class", "bar")
                                    .on('mouseover', tip.show)
                                    .on('mouseout', tip.hide)
                                    .attr('transform', 'translate(55, -6)')
// Define X & Y axis
// X Axis-GDP
// Y Axis-Year

var xAxis = d3.svg.axis()
                 .scale(scaleX)
                 .ticks(16)
                 .tickFormat(d3.format("d"))
                 .orient("bottom");

var yAxis = d3.svg.axis()
                 .scale(scaleY)
                 .ticks(9)
                 .orient("left");

var xAxisGroup = svgContainer.append("g")
                            .attr("class", "axis")
                            .call(xAxis)
                            .attr({
                              'transform':'translate(55,'+(height)+')'
                            });

var yAxisGroup = svgContainer.append("g")
                           .attr("class", "axis")
                           .call(yAxis)
                           .attr({
                             'transform':'translate(55,0)'
                           });

});

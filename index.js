// DATA PLOTTING AND VISUALISATION

// Needed Variables
const height = 720;
const width = 1080;
const margin = {top:40, right:80, bottom:60, left:50};

// Needed Functions
  // Transform year to date time
var createDate = function(date){
  var date = Number(date);
  var dateTime = new Date(date,0,1,1,0,0,0,0)
  return dateTime
}
// Create Necessary HTML Elements

  // Add svg element
d3.select('body')                                                               // Data visualisation will happen on svg element
  .append('svg')                                                                // Add svg element
  .classed('DataVisualisation', true)                                           // Give class
  .attr('height', height)                                                       // Assign height to svg element
  .attr('width', width)                                                         // Assign width to svg element
  ;

var svg = d3.select('svg')                                                      // Shortcut to select svg element

// Visualise Data
function render(data){                                                          // Function that will start visualizing the data

  // Determine Radius of donut chart
  const radius = Math.min(width, height) / 2 - margin.top;

  // Determine different colors
  var colors = d3.scaleOrdinal()
    .range(["#264653","#2a9d8f","#e9c46a","#f4a261","#e76f51"])

  // Scales
  var xScale = d3.scaleOrdinal()
    .domain(d3.map(data, (item) => item.Location))

  //
  var pie = d3.pie()
    .value((d) =>d["2030"])
    ;

  var arc = d3.arc()
    .innerRadius(radius - 100)
    .outerRadius(radius - 20)
    ;

  svg
    .append('g')
    .classed('arcs',true)
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

  d3.select('.arcs')
    .selectAll('.arc')
    .data(pie(data))
    .join('path')
    .classed('arc',true)
    .attr('fill', function(d,i){return colors(i)})
    .attr('d', arc)
  //
  svg
    .append('g')
    .classed('pie', true)
}
// DATA LOADING
d3.csv('ContinentalPopulation2030.csv').then((data) => {
// DATA CLEANING & PREPARATION
  console.log(data)
  // Missing Data
    // No missing data

  // Duplicate Data
    // No duplicate data


  // Transforming Data
    // Ensure correct data types
  data.forEach((item, i) => {                                                   // For each object in array
    item["2030"] = +item["2030"] * 1000;                                        // Transform value from key 2030 from string to integer
  });
  console.log(data)
// Function to start Plotting and Visualisation
  render(data)
})

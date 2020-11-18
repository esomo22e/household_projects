var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;



var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("test.json", function(error, data) {
  console.log(data);

  var node = svg.append("g")
  .selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
    .attr("r", 10)
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .style("fill", function(d){
      console.log(d.geo.PUMA);
      if(d.geo.PUMA == 3301){
        return "#69b3a2";

      }
      else if(d.geo.PUMA == 3302){
        return "#FFA07A";
      }
      else if(d.geo.PUMA == 3303){
        return "#beaed4";
      }
      else if(d.geo.PUMA == 3304){
        return "#e7298a";
      }
      else if(d.geo.PUMA == 3305){
        return "#386cb0";
      }

    })
    // .style("fill-opacity", 0.3)
    .attr("stroke", "#69a2b2")
    .style("stroke-width", 4)

// Features of the forces applied to the nodes:
var simulation = d3.forceSimulation()
    .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
    .force("charge", d3.forceManyBody().strength(0)) // Nodes are attracted one each other of value is > 0
    .force("collide", d3.forceCollide().strength(.01).radius(20).iterations(1)) // Force that avoids circle overlapping

// Apply these forces to the nodes and update their positions.
// Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
simulation
    .nodes(data)
    .on("tick", function(d){
      node
          .attr("cx", function(d){ return d.x; })
          .attr("cy", function(d){ return d.y; })
    });
});

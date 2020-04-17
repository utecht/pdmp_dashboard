// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 960 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

function make_chart(data){
  data.sort(function(x, y){
    return d3.ascending(x.date, y.date);
  });
  // Add X axis --> it is a date format
  var x = d3.scaleTime()
    .domain(d3.extent(data, function(d) { return d.date; }))
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d.cases; })])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add the line
  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(function(d) { return x(d.date) })
      .y(function(d) { return y(d.cases) })
      )

  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(function(d) { return x(d.date) })
      .y(function(d) { return y(d.deaths) })
      )
}

function getData(county){
  var dates = {};
  for(const county_name in covid_nums){
    if(typeof county === 'undefined' || county == county_name){
      for(const hist of covid_nums[county_name]['history']){
      	if(!dates.hasOwnProperty(hist['date'])){
          dates[hist['date']] = {cases: 0, deaths: 0};
        }
        dates[hist['date']]['cases'] += parseInt(hist['cases']);
        dates[hist['date']]['deaths'] += parseInt(hist['deaths']);
      }
    }
  }

  var data = [];
  for(const date in dates){
    data.push({date: Date.parse(date), cases: dates[date]['cases'], deaths: dates[date]['deaths']});
  }
  return data;
}

function deleteCounty(county){
  d3.select("#COUNTY_CASES").remove();
  d3.select("#COUNTY_DEATHS").remove();
}

function showCounty(county){
  let all_data = getData(undefined);
  var x = d3.scaleTime()
    .domain(d3.extent(all_data, function(d) { return d.date; }))
    .range([ 0, width ]);
  var y = d3.scaleLinear()
    .domain([0, d3.max(all_data, function(d) { return +d.cases; })])
    .range([ height, 0 ]);

  let data = getData(county);
  svg.append("path")
  .datum(data)
  .attr("id", "COUNTY_CASES")
  .attr("fill", "none")
  .attr("stroke", "gray")
  .attr("stroke-width", 1.5)
  .attr("d", d3.line()
    .x(function(d) { return x(d.date) })
    .y(function(d) { return y(d.cases) })
    )
  svg.append("path")
  .datum(data)
  .attr("id", "COUNTY_DEATHS")
  .attr("fill", "none")
  .attr("stroke", "purple")
  .attr("stroke-width", 1.5)
  .attr("d", d3.line()
    .x(function(d) { return x(d.date) })
    .y(function(d) { return y(d.deaths) })
    )
}

make_chart(getData(undefined));

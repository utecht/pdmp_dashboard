import { Component } from 'preact';
import { DEATHS_PER_MONTH } from './deaths_per_month';
import * as d3 from 'd3';
import './graph_style';

export class Graph extends Component {
	constructor(props){
		super();
		var margin = {top: 10, right: 30, bottom: 30, left: 60},
		    width = props.width - margin.left - margin.right,
		    height = props.height - margin.top - margin.bottom;
		let data = Graph.getData(props.county).sort(function(x, y){
	    return d3.ascending(x.date, y.date);
	  });
		this.changeMonth = props.changeMonth;
		this.state = { county: props.county,
									 data: data,
									 height: height,
									 width: width };
	}

	static getData(county){
	  var data = [];
	  for(const month of DEATHS_PER_MONTH){
			if(typeof county != 'undefined' && month['county'] == county.toUpperCase()){
		    data.push({date: Date.parse(month['date']),
								   date_string: month['date'],
									 deaths: month['deaths']});
			}
	  }
	  return data;
	}

	mouseOverBar = e => {
		let date = e.target.attributes.date.value;
		this.changeMonth(date);
	}

	render(props){
		if(props.county != this.state.county){
			this.setState({ data: Graph.getData(props.county).sort(function(x, y){
													    return d3.ascending(x.date, y.date);
													  }),
											county: props.county
										});
		}
	  const xScale = d3.scaleTime()
	    .domain(d3.extent(this.state.data, function(d) { return d.date; }))
	    .range([ 0, this.state.width ]);
		const barWidth = (this.state.width / this.state.data.length) - 2;
	  var yScale = d3.scaleLinear()
	    .domain([0, d3.max(this.state.data, function(d) { return +d.deaths; })])
	    .range([ this.state.height, 0 ]);

		const dateFormat = d3.timeFormat("%Y-%m-%d");
		const xTicks = xScale.ticks(12).map( value => ({
			value,
			xOffset: xScale(value)
		}));
		const yTicks = yScale.ticks().map( value => ({
			value,
			yOffset: yScale(value)
		}));

		return(
			<div class="graph_container">
				<svg width={props.width} height={props.height}>
					<g transform="translate(60,10)">
						<text x="20" y="20" style="font-size: 15px;" alignment-baseline="middle">{props.county}</text>
						<rect x="20" y="25" width="15" height="15" style="fill: steelblue;"/>
						<text x="40" y="40" style="font-size: 15px;" alignment-baseline="middle">Deaths</text>
						<g transform="translate(0,360)" fill="none" font-size="10" font-family="sans-serif" text-anchor="middle">
							<path class="domain" stroke="#000" d="M0.5,6V0.5H870.5V6"></path>
							{xTicks.map( ({value, xOffset}) => (
								<g class="tick"
									 opacity="1"
									 transform={`translate(${xOffset},0)`}>
									<line stroke="#000"	y2="6"></line>
									<text fill="#000" y="9"	dy="0.71em">
										{dateFormat(value)}
									</text>
								</g>
							))}
						</g>
						<g fill="none" font-size="10" font-family="sans-serif" text-anchor="end">
							<path class="domain" stroke="#000" d="M-6,360.5H0.5V0.5H-6"></path>
							{yTicks.map( ({value, yOffset}) => (
								<g class="tick"
									 opacity="1"
									 transform={`translate(0, ${yOffset})`}>
									<line stroke="#000" x2="-6"></line>
									<text fill="#000" x="-9" dy="0.32em">
										{value}
									</text>
								</g>
							))}
						</g>
						{this.state.data.map( (datum) => (
							<rect fill="steelblue"
										date={datum.date_string}
									  onclick={this.mouseOverBar}
								    x={xScale(datum.date)}
										width={barWidth}
										y={yScale(datum.deaths)}
										height={this.state.height - yScale(datum.deaths)}/>
						))}
					</g>
				</svg>
			</div>
		)
	}
}

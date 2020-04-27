import { Component } from 'preact';
import { COVID_NUMS } from './covid_numbers';
import * as d3 from 'd3';

export class Graph extends Component {
	constructor(props){
		super();
		var margin = {top: 10, right: 30, bottom: 30, left: 60},
		    width = props.width - margin.left - margin.right,
		    height = props.height - margin.top - margin.bottom;
		props.data.sort(function(x, y){
	    return d3.ascending(x.date, y.date);
	  });
		this.state = { data: props.data, height: height, width: width };
	}

	render(props){
	  const xScale = d3.scaleTime()
	    .domain(d3.extent(this.state.data, function(d) { return d.date; }))
	    .range([ 0, this.state.width ]);
	  const yScale = d3.scaleLinear()
	    .domain([0, d3.max(this.state.data, function(d) { return +d.cases; })])
	    .range([ this.state.height, 0 ]);

		const dateFormat = d3.timeFormat("%b %e");
		const xTicks = xScale.ticks(12).map( value => ({
			value,
			xOffset: xScale(value)
		}));
		const yTicks = yScale.ticks().map( value => ({
			value,
			yOffset: yScale(value)
		}));


		const caseLine = d3.line()
      .x(function(d) { return xScale(d.date) })
      .y(function(d) { return yScale(d.cases) });
		const deathLine = d3.line()
      .x(function(d) { return xScale(d.date) })
      .y(function(d) { return yScale(d.deaths) });

		return(
			<svg width={props.width} height={props.height}>
				<g transform="translate(60,10)">
					<circle cx="20" cy="30" r="6" style="fill: steelblue;"></circle>
					<circle cx="20" cy="60" r="6" style="fill: red;"></circle>
					<text x="40" y="30" style="font-size: 15px;" alignment-baseline="middle">Cases</text>
					<text x="40" y="60" style="font-size: 15px;" alignment-baseline="middle">Deaths</text>
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
					<path fill="none"
								stroke="steelblue"
								stroke-width="1.5"
								d={caseLine(this.state.data)}></path>
					<path fill="none"
								stroke="red"
								stroke-width="1.5"
								d={deathLine(this.state.data)}></path>
				</g>
			</svg>
		)
	}
}

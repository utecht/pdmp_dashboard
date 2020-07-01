import { Component } from 'preact';
//import { DEATHS_PER_MONTH } from './deaths_per_month';
import * as d3 from 'd3';
import './graph_style';
import 'whatwg-fetch'

export class CausePie extends Component {
	constructor(props){
		super();
		var margin = {top: 10, right: 30, bottom: 30, left: 60},
		    width = props.width - margin.left - margin.right,
		    height = props.height - margin.top - margin.bottom;
		this.changeMonth = props.changeMonth;
		this.state = { county: props.county,
									 fetching: false,
									 height: height,
									 width: width };
	}

	render(props){
		const barHeight = 20;
		if(props.county == undefined){
			return(<span>Hover over a county.</span>);
		}
		if(props.county != this.state.county && this.state.fetching == false){
			this.setState({ fetching: true });
			window.fetch("http://localhost:8080/api/cause?county=" + props.county)
				    .then(response => response.json())
						.then(data =>
							this.setState({
								data: data.sort(function(x, y){
									   return d3.descending(x.count, y.count);
								  }),
								county: props.county,
								height: data.length * barHeight,
								fetching: false
							})
						);
			return(<span>fetching......</span>);
		}
		if(this.state.fetching){
			return(<span>fetching......</span>);
		}
	  const xScale = d3.scaleLinear()
	    .domain([0, d3.max(this.state.data, function(d) { return +d.count; })])
	    .range([ 0, this.state.width ]);
	  var yScale = d3.scaleLinear()
	    .domain([0, this.state.data.length])
	    .range([ 15, this.state.height ]);

		const xTicks = xScale.ticks().map( value => ({
			value,
			xOffset: xScale(value)
		}));

		return(
			<div class="graph_container">
				<svg width={props.width} height={this.state.height}>
					<g transform="translate(60,10)">
						<g transform="translate(0,0)" fill="none" font-size="10" font-family="sans-serif" text-anchor="middle">
							<path transform="translate(0,14)" class="domain" stroke="#000" d="M0.5,6V0.5H870.5V6"></path>
							{xTicks.map( ({value, xOffset}) => (
								<g class="tick"
									 opacity="1"
									 transform={`translate(${xOffset},0)`}>
									<text fill="#000" y="0"	dy="0.71em">
										{value}
									</text>
									<line transform={`translate(${xOffset},8)`} stroke="#000"	y2="14"></line>
								</g>
							))}
						</g>
						{this.state.data.map( (datum, index) => (
							<g>
							<rect fill="palevioletred"
									  onclick={this.mouseOverBar}
								    x={0}
										width={xScale(datum.count)}
										y={yScale(index)}
										height={barHeight}/>
							<text x={15}
							      y={yScale(index)+(barHeight/2)+1}>{datum.description}</text>
							</g>
						))}
					</g>
				</svg>
			</div>
		)
	}
}

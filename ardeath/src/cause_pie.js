import { Component } from 'preact';
import * as d3 from 'd3';

export class CausePie extends Component {
	constructor(props){
		super();
		var margin = {top: 10, right: 10, bottom: 10, left: 10},
		    width = props.width - margin.left - margin.right,
		    height = props.height - margin.top - margin.bottom;
		let data = CausePie.getData(props.county, props.month);
		this.state = { county: props.county,
									 month: props.month,
									 data: data,
									 height: height,
									 width: width };
	}

	static getData(county, month){
	  var data = [];
	  return data;
	}

	render(props){
		if(props.county != this.state.county && props.month != this.state.month){
			this.setState({ data: CausePie.getData(props.county, props.month),
											county: props.county,
											month: props.month
			});
		}

		return(
			<div class="graph_container">
				<svg width={props.width} height={props.height}>
					<g transform="translate(60,10)">
						<text x="20" y="20" style="font-size: 15px;" alignment-baseline="middle">{props.county}</text>
						<text x="20" y="40" style="font-size: 15px;" alignment-baseline="middle">{props.month}</text>
					</g>
				</svg>
			</div>
		)
	}
}

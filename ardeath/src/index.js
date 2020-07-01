import './style';
import { Component } from 'preact';
import { ARMap } from './armap';
import { Graph } from './graph';
import { CausePie } from './cause_pie';

export default class App extends Component {
	state = { county: undefined, month: undefined }

	changeCounty = (county) => {
		this.setState({county: county});
	}

	changeMonth = (month) => {
		this.setState({month: month});
	}

	render() {
		return (
			<div>
				<ARMap changeCounty={this.changeCounty}/>
				<div class="graphbox">
					<Graph height={400}
								 width={900}
								 changeMonth={this.changeMonth}
								 county={this.state.county}/>
					<CausePie height={200}
										width={400}
										county={this.state.county}
										month={this.state.month}/>
				</div>
			</div>
		);
	}
}

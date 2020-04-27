import './style';
import { Component } from 'preact';
import { Counter } from './counter';
import { ARMap } from './armap';
import { Graph } from './graph';

export default class App extends Component {
	state = { county: undefined }

	changeCounty = (county) => {
		this.setState({county: county});
	}

	render() {
		return (
			<div>
				<div class="top_counters">
					<Counter type_name="cases"/>
					<Counter type_name="deaths"/>
				</div>
				<ARMap changeCounty={this.changeCounty}/>
				<Graph height={400} width={960} county={this.state.county}/>
			</div>
		);
	}
}

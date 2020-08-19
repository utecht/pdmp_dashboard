import './style';
import { Component } from 'preact';
import { ARMap } from './armap';
import { PrescriptionsGraph } from './prescriptions_graph';
import { DrugClassGraph } from './drug_class_graph';

export default class App extends Component {
	state = { zip: undefined, month: undefined }

	changeZip = (zip) => {
		this.setState({zip: zip});
	}

	changeMonth = (month) => {
		this.setState({month: month});
	}

	render() {
		return (
			<div>
				<ARMap changeZip={this.changeZip}/>
				<div class="graphbox">
					<PrescriptionsGraph height={400}
								 width={900}
								 changeMonth={this.changeMonth}
								 zip={this.state.zip}/>
					<DrugClassGraph height={200}
										width={400}
										zip={this.state.zip}
										month={this.state.month}/>
				</div>
			</div>
		);
	}
}

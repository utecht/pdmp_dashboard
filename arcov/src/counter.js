import './style';
import { Component } from 'preact';
import { COVID_NUMS } from './covid_numbers';

export class Counter extends Component {
	totalNumber(type){
		let total = 0;
		for(const county in COVID_NUMS){
			total += parseInt(COVID_NUMS[county][type]);
		}
		return total;
	}

	render(props) {
		let num = this.totalNumber(props.type_name);
		return (
			<h1>{props.type_name} - {num}</h1>
		);
	}
}

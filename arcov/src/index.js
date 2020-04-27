import './style';
import { Component } from 'preact';
import { Counter } from './counter';
import { ARMap } from './armap';
import { Graph } from './graph';
import { COVID_NUMS } from './covid_numbers';

export default class App extends Component {
	static getData(county){
	  var dates = {};
	  for(const county_name in COVID_NUMS){
	    if(typeof county === 'undefined' || county == county_name){
	      for(const hist of COVID_NUMS[county_name]['history']){
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

	render() {
		return (
			<div>
				<div class="top_counters">
					<Counter type_name="cases"/>
					<Counter type_name="deaths"/>
				</div>
				<ARMap />
				<Graph height={400} width={960} data={App.getData(undefined)}/>
			</div>
		);
	}
}

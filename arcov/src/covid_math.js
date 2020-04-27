import { COVID_NUMS } from './covid_numbers';

export function covidCases(name){
	if(!COVID_NUMS.hasOwnProperty(name)){
		return 0;
	}
	return COVID_NUMS[name]['cases'];
}

export function covidDeaths(name){
	if(!COVID_NUMS.hasOwnProperty(name)){
		return 0;
	}
	return COVID_NUMS[name]['deaths'];
}

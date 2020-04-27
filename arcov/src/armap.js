import './style';
import '../node_modules/leaflet/dist/leaflet.css';
import { Component } from 'preact';
import { Map, TileLayer, GeoJSON } from 'react-leaflet'
import { COVID_NUMS } from './covid_numbers';
import { COUNTY_DATA } from './ar-counties';
import { COUNTY_POPULATION } from './population';
import { covidCases, covidDeaths } from './covid_math';

export class InfoBox extends Component {

	render(props){
		return(
			<div class="leaflet-top leaflet-right">
				<div class="info leaflet-control">
					<h4>Arkansas County Population Density</h4>
					{props.name ? props.name: 'Hover over a state'}
				</div>
			</div>
		);
	}
}

export class ARMap extends Component {
	state = {
		selected_name: null,
		selected_aland: null
	}
	// get color depending on population density value
	static getColor(d) {
		return d > 150 ? '#800026' :
				d > 100  ? '#BD0026' :
				d > 50  ? '#E31A1C' :
				d > 20  ? '#FC4E2A' :
				d > 10  ? '#FD8D3C' :
				d > 7   ? '#FEB24C' :
				d > 4   ? '#FED976' :
							'#FFEDA0';
	}

	static calculate_density(name, aland) {
		return COUNTY_POPULATION[name]["Population"] / (aland / 1000000);
	}

	style(feature){
		return {
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.7,
			fillColor: ARMap.getColor(ARMap.calculate_density(feature.properties.NAME, feature.properties.ALAND))
		};
	}

	highlightFeature = e => {
		this.setState({
			selected_name: e.layer.feature.properties.NAME,
			selected_aland: e.layer.feature.properties.ALAND
		});
	}

	resetFeature = e => {
		this.setState({
			selected_name: null,
			selected_aland: null
		});
	}

	render(){
		let position = [34.8, -92];
		return(
			<Map
				center={position}
				dragging={false}
				touchZoom={false}
				doubleClickZoom={false}
				scrollWheelZoom={false}
				zoom={7}>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
				/>
				<GeoJSON
					data={COUNTY_DATA}
					style={this.style}
					onMouseOver={this.highlightFeature}
					onMouseOut={this.resetFeature}
				/>
				<InfoBox
					name={this.state.selected_name}
					aland={this.state.selected_aland}/>
			</Map>
		)
	}
}

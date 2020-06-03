import './style';
import '../node_modules/leaflet/dist/leaflet.css';
import { Component } from 'preact';
import { Map, TileLayer, GeoJSON } from 'react-leaflet'
import { COUNTY_DATA } from './ar-counties';
import { COUNTY_POPULATION } from './population';

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
	constructor(props){
		super();
		this.changeCounty = props.changeCounty;
		this.state = {
			selected_name: null,
			selected_aland: null,
			clicked_name: null
		}
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

	showFeature = e => {
		this.setState({
			clicked_name: e.layer.feature.properties.NAME,
			selected_name: e.layer.feature.properties.NAME,
			selected_aland: e.layer.feature.properties.ALAND
		});
		this.changeCounty(e.layer.feature.properties.NAME);
	}

	highlightFeature = e => {
		this.setState({
			selected_name: e.layer.feature.properties.NAME,
			selected_aland: e.layer.feature.properties.ALAND
		});
		this.changeCounty(e.layer.feature.properties.NAME);
	}

	resetFeature = e => {
		this.setState({
			selected_name: null,
			selected_aland: null
		});
		if(this.state.clicked_name == null){
			this.changeCounty(undefined);
		} else {
			this.changeCounty(this.state.clicked_name);
		}
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
				zoomControl={false}
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
					onClick={this.showFeature}
				/>
				<InfoBox
					name={this.state.selected_name}
					aland={this.state.selected_aland}/>
			</Map>
		)
	}
}

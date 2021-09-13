import './style';
import '../node_modules/leaflet/dist/leaflet.css';
import { Component } from 'preact';
import { Map, TileLayer, GeoJSON } from 'react-leaflet'
import { THREEZIP } from './3zip';
import { COUNTY_DATA } from './ar-counties';

export class InfoBox extends Component {

	render(props){
		return(
			<div class="leaflet-top leaflet-right">
				<div class="info leaflet-control">
					<h4>Arkansas 3ZIPs</h4>
					{props.name ? props.name: 'Hover over a state'}
				</div>
			</div>
		);
	}
}

export class ARMap extends Component {
	constructor(props){
		super();
		this.changeZip = props.changeZip;
		this.state = {
			selected_name: null,
			clicked_name: null
		}
	}

	style(feature){
		return {
			weight: 2,
			opacity: 0.3,
			color: 'black',
			dashArray: '1',
			fillOpacity: 0.7,
			fillColor: feature.properties.fill
		};
	}

	style_county(feature){
		return {
			weight: 1,
			opacity: 0.4,
			color: 'black',
			dashArray: '1',
			fillOpacity: 0.1,
			fillColor: 'white'
		};
	}

	showFeature = e => {
		this.setState({
			clicked_name: e.layer.feature.properties.ZIP3,
			selected_name: e.layer.feature.properties.ZIP3,
		});
		this.changeZip(e.layer.feature.properties.ZIP3);
	}

	highlightFeature = e => {
		this.setState({
			selected_name: e.layer.feature.properties.ZIP3,
		});
		//this.changeZip(e.layer.feature.properties.ZIP3);
	}

	resetFeature = e => {
		this.setState({
			selected_name: null,
		});
		if(this.state.clicked_name == null){
			this.changeZip(undefined);
		} else {
			this.changeZip(this.state.clicked_name);
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
					style={this.style_county}
				/>
				<GeoJSON
					data={THREEZIP}
					style={this.style}
					onMouseOver={this.highlightFeature}
					onMouseOut={this.resetFeature}
					onClick={this.showFeature}
				/>
				<InfoBox
					name={this.state.selected_name}
				/>
			</Map>
		)
	}
}

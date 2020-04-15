var map = L.map('mapid').setView([34.4, -92], 7);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoianJ1dGVjaHQiLCJhIjoiY2s5MW1pZXRlMDFsYTNlcWtpd3FnaW94dSJ9.gPjvytkePOl3Q9xWDj-Iiw', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
		'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	id: 'mapbox/light-v9',
	tileSize: 512,
	zoomOffset: -1
}).addTo(map);


// control that shows state info on hover
var info = L.control();

info.onAdd = function (map) {
	this._div = L.DomUtil.create('div', 'info');
	this.update();
	return this._div;
};

info.update = function (props) {
	this._div.innerHTML = '<h4>Arkansas County Population Density</h4>' +  (props ?
		'<b>' + props.NAME + '</b><br />' + calculate_density(props.NAME, props.ALAND).toFixed(2) + ' people / km<sup>2</sup>' + '</b><br />' + covidCases(props.NAME) + ' cases / ' + covidDeaths(props.NAME) + ' deaths'
		: 'Hover over a state');
};

info.addTo(map);

function covidCases(name){
	return covid_nums[name]['cases'];
}

function covidDeaths(name){
	return covid_nums[name]['deaths'];
}

// get color depending on population density value
function getColor(d) {
	return d > 150 ? '#800026' :
			d > 100  ? '#BD0026' :
			d > 50  ? '#E31A1C' :
			d > 20  ? '#FC4E2A' :
			d > 10  ? '#FD8D3C' :
			d > 7   ? '#FEB24C' :
			d > 4   ? '#FED976' :
						'#FFEDA0';
}

function calculate_density(name, aland) {
	return county_population[name]["Population"] / (aland / 1000000);
}

function style(feature) {
	return {
		weight: 2,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.7,
		fillColor: getColor(calculate_density(feature.properties.NAME, feature.properties.ALAND))
	};
}

function highlightFeature(e) {
	var layer = e.target;

	layer.setStyle({
		weight: 5,
		color: '#666',
		dashArray: '',
		fillOpacity: 0.7
	});

	if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		layer.bringToFront();
	}

	info.update(layer.feature.properties);
}

var geojson;

function resetHighlight(e) {
	geojson.resetStyle(e.target);
	info.update();
}

function zoomToFeature(e) {
	map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
	layer.on({
		mouseover: highlightFeature,
		mouseout: resetHighlight,
		click: zoomToFeature
	});
}

geojson = L.geoJson(county_data, {
	style: style,
	onEachFeature: onEachFeature
}).addTo(map);

map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');


var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

	var div = L.DomUtil.create('div', 'info legend'),
		grades = [0, 4, 7, 10, 20, 50, 100, 150],
		labels = [],
		from, to;

	for (var i = 0; i < grades.length; i++) {
		from = grades[i];
		to = grades[i + 1];

		labels.push(
			'<i style="background:' + getColor(from + 1) + '"></i> ' +
			from + (to ? '&ndash;' + to : '+'));
	}

	div.innerHTML = labels.join('<br>');
	return div;
};

legend.addTo(map);

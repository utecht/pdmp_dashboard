import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { json } from "d3-fetch";

const geoUrl = "/AR-05-arkansas-counties.json";

const ODMap = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let params = new URLSearchParams(props.filters).toString()
    json(`/api/map?${params}`).then(counties => {
      var data = [];
      for(let county of counties){
        data.push({
          'county': county['patient_county_name'],
          'od': county['od']
        })
      }
      setData(data);
    });
  }, [props.filters]);

  const colorScale = scaleLinear()
    .domain([0, 1, 1.0001])
    // .domain(data.map(d => d.od))
    .range(['white', 'red', 'black'])

  const projectionConfig = {
    rotate: [92.31, 0],
    scale: 7000,
    center: [0.0, 34.77],
  }

  return (
    <>
    <ComposableMap data-tip="" projection="geoAlbers" projectionConfig={projectionConfig}>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => {
            const cur = data.find(s => s.county === geo.properties.NAME);
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={cur ? colorScale(cur.od) : '#EEE'}
                stroke={props.focusCounties.indexOf(geo.properties.NAME) >= 0 ? '#000': '#222'}
                strokeWidth={props.focusCounties.indexOf(geo.properties.NAME) >= 0 ? 2.5: .5}
                onClick={() => props.setFocus(geo.properties.NAME)}
                onMouseEnter={() => {
                    props.setTooltipContent(`${geo.properties.NAME} — ${cur.od.toFixed(2)}`)
                  }}
                  onMouseLeave={() => {
                    props.setTooltipContent("");
                  }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
    <div style={{width: '130px'}} >
      <div style={{background: "linear-gradient(.25turn, white, red)", height: '20px', width: '130px', border: '1px black solid'}}></div>
      <small style={{}}>Average Predicted Overdose Risk</small>
    </div>
    </>
  );
};

export default ODMap;

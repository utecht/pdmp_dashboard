import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { csv } from "d3-fetch";

const geoUrl = "/AR-05-arkansas-counties.json";

const ODMap = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    csv("/od_count_county.csv", (d) => {
      return {
        county: d.patient_county_name,
        od: d.od
      };
    }).then(rows => {
      setData(rows);
    });
  }, []);

  const colorScale = scaleLinear()
    .domain([0, 3, 3.0001])
    // .domain(data.map(d => d.od))
    .range(['white', 'red', 'black'])

  const projectionConfig = {
    rotate: [92.31, 0],
    scale: 7000,
    center: [0.0, 34.77],
  }

  return (
    <ComposableMap projection="geoAlbers" projectionConfig={projectionConfig}>
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
                onClick={() => props.setFocus(cur.county)}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
};

export default ODMap;

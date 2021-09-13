import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { csv } from "d3-fetch";

const geoUrl = "/AR-05-arkansas-counties.json";

const MyMap = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    csv("/interventions.csv", (d) => {
      const n = d.Description.match(/\d+/);
      const date = new Date(d.Date);
      return {
        day: date.toISOString().split('T')[0],
        value: +n,
        county: d.County,
        program: d.Program
      };
    }).then(rows => {
      var allCounties = {};
      for(const row of rows){
        if(row.county in allCounties){
          allCounties[row.county] += row.value;
        } else {
          allCounties[row.county] = row.value;
        }
      }
      let arr = [];
      for(const [key, value] of Object.entries(allCounties)){
        arr.push({county: key, value: value});
      }
      setData(arr);
    });
  }, []);

  const colorScale = scaleQuantile()
    .domain(data.map(d => d.value))
    .range(['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']);

  const projectionConfig = {
    rotate: [92.31, 0],
    scale: 7000,
    center: [0.0, 34.77],
 };

  return (
    <div>
    <ComposableMap projection="geoAlbers" projectionConfig={projectionConfig}>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => {
            const cur = data.find(s => s.county === geo.properties.NAME);
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={cur ? colorScale(cur.value) : '#EEE'}
                stroke={props.focusCounty === geo.properties.NAME ? '#000': '#FFF'}
                strokeWidth={props.focusCounty === geo.properties.NAME ? 2: 0}
                onMouseEnter={() => props.setHover(geo.properties.NAME)}
                onMouseLeave={() => props.setHover(undefined)}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
    </div>
  );
};

export default MyMap;

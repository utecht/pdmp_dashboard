import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { csv } from "d3-fetch";

const geoUrl = "/AR-05-arkansas-counties.json";

const MapChart = () => {
  const [data, setData] = useState([]);
  const [last, setHover] = useState("");
  const [info, setInfo] = useState(undefined);

  useEffect(() => {
    csv("/CO-EST2019-alldata.csv").then(counties => {
      setData(counties);
    });
  }, []);

  const colorScale = scaleQuantile()
    .domain(data.map(d => d.CENSUS2010POP))
    .range([
      "#ffedea",
      "#ffcec5",
      "#ffad9f",
      "#ff8a75",
      "#ff5533",
      "#e2492d",
      "#be3d26",
      "#9a311f",
      "#782618"
    ]);

  const projectionConfig = {
    rotate: [92.31, 0],
    scale: 7000,
    center: [0.0, 34.77],
 };

  return (
    <div>
    {last ? <h1>{last} County</h1> : <h1>Hover a county</h1>}
    {info ? <h4>{info} population</h4> : <h4>Click a county</h4>}
    <ComposableMap projection="geoAlbers" projectionConfig={projectionConfig}>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => {
            const cur = data.find(s => s.CTYNAME === geo.properties.NAME);
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={cur ? colorScale(cur.CENSUS2010POP) : '#EEE'}
                onMouseEnter={() => setHover(geo.properties.NAME)}
                onClick={() => setInfo(cur.CENSUS2010POP)}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
    </div>
  );
};

export default MapChart;

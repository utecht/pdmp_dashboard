import './App.css';
import ODMap from './ODMap';
import React, { useState, useEffect } from "react";
import FeatureChart from './FeatureChart';
import { json } from 'd3-fetch';


function Dashboard() {
  const [focusCounties, setFocusCounties] = useState([])
  const [data, setData] = useState(false)

  useEffect(() => {
    json("/api/chart").then((data) => {
      setData(JSON.parse(data));
    });
  }, []);

  const addFocusCounty = (county) => {
    var newCounties = [...focusCounties]
    let index = newCounties.indexOf(county)
    if(index >= 0){
      newCounties.splice(index, 1)
      setFocusCounties(newCounties)
    } else {
      newCounties.push(county)
      setFocusCounties(newCounties)
    }
  }

  return (
    <div className="container">
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <div style={{width:'400px', height:'400px'}}>
          <ODMap focusCounties={focusCounties} setFocus={addFocusCounty} />
        </div>
      </div>
      {data ? <FeatureChart counties={focusCounties} data={data.data} /> : <></>}
    </div>
  );
}

export default Dashboard;

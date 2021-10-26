import './App.css';
import MyMap from './MyMap';
import MyBarChart from './MyBarChart';
import React, { useState, useEffect } from "react";
import { csv } from "d3-fetch";
import FEATURES from './features.json';


function Dashboard() {
  const [data, setData] = useState([]);
  const [hoverDate, setHoverDate] = useState(undefined);
  const [hoverCounty, setHoverCounty] = useState(undefined);
  const [focusCounty, setFocusCounty] = useState(undefined);
  const [focusDate, setFocusDate] = useState(undefined);

  return (
    <div className="container">
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <div style={{width:'400px', height:'400px'}}>
          <MyMap focusCounty={focusCounty} setHover={setHoverCounty}/>
          {hoverCounty !== undefined ? <h4>{hoverCounty} County</h4> : <></>}
        </div>
      </div>
      <div style={{width:'1200px', height:'2000px'}}>
        <MyBarChart data={FEATURES.data}/>
      </div>
    </div>
  );
}

export default Dashboard;

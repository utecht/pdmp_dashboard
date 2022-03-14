import './App.css';
import ODMap from './ODMap';
import React, { useState } from "react";
import FeatureChart from './FeatureChart';


function Dashboard() {
  const [focusCounties, setFocusCounties] = useState([])

  const addFocusCounty = (county) => {
    console.log(county)
    const index = focusCounties.indexOf(county)
    if(index >= 0){
      setFocusCounties(focusCounties.slice(index, 1))
    } else {
      focusCounties.push(county)
      setFocusCounties(focusCounties)
    }
  }

  return (
    <div className="container">
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <div style={{width:'400px', height:'400px'}}>
          <ODMap focusCounties={focusCounties} setFocus={addFocusCounty} />
        </div>
      </div>
      <FeatureChart counties={focusCounties} />
    </div>
  );
}

export default Dashboard;

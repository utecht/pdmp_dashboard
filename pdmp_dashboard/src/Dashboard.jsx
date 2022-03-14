import './App.css';
import ODMap from './ODMap';
import React, { useState } from "react";
import FeatureChart from './FeatureChart';


function Dashboard() {
  const [focusCounties, setFocusCounties] = useState([])

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
      <FeatureChart counties={focusCounties} />
    </div>
  );
}

export default Dashboard;

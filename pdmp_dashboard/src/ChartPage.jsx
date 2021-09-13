import MyLineChart from './MyLineChart';
import React, { useState, useEffect } from "react";
import QUARTERS from './quarters.json';
import DRUGS from './drugs.json';

function ChartPage() {

  return (
    <div>
      <div style={{display: 'flex'}}>
        <div style={{width:'1000px', height:'400px'}}>
          <MyLineChart unformatted={QUARTERS} xAxis="Prescriptions" yAxis="Quarters" />
        </div>
      </div>
      <div style={{display: 'flex'}}>
        <div style={{width:'1000px', height:'500px'}}>
          <MyLineChart unformatted={DRUGS}
          xAxis="Prescriptions"
          yAxis="Quarters"/>
        </div>
      </div>
    </div>
  );
}

export default ChartPage;

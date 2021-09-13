import './App.css';
import MyMap from './MyMap';
import MyCalendar from './MyCalendar';
import React, { useState, useEffect } from "react";
import { csv } from "d3-fetch";


function Interventions() {
  const [data, setData] = useState([]);
  const [hoverDate, setHoverDate] = useState(undefined);
  const [hoverCounty, setHoverCounty] = useState(undefined);
  const [focusCounty, setFocusCounty] = useState(undefined);
  const [focusDate, setFocusDate] = useState(undefined);

  useEffect(() => {
    csv("/interventions.csv", (d) => {
      const n = d.Description.match(/\d+/);
      const date = new Date(d.Date);
      return {
        day: date.toISOString().split('T')[0],
        value: +n,
        county: d.County,
        program: d.Program,
        description: d.Description.split(';')[0]
      };
    }).then(rows => {
      setData(rows);
    });
  }, []);

  const dataTable = data.map((row, i) =>
//    <tr key={i} className={(row.day === hoverDate) || (row.county === hoverCounty) ? 'table-primary' : ''}>
    <tr key={i} hidden={
        !(
             hoverCounty === undefined 
          && hoverDate === undefined 
          )
      &&
         !(
             (row.day === hoverDate)
          || (row.county === hoverCounty)
          ) 
    }>
      <td
        onMouseEnter={()=> setFocusDate(row.day)}
        onMouseLeave={()=> setFocusDate(undefined)}
        >{row.day}</td>
      <td 
        onMouseEnter={()=> setFocusCounty(row.county)}
        onMouseLeave={()=> setFocusCounty(undefined)}
        >{row.county}</td>
      <td>{row.program} {row.description}</td>
      <td>{row.value}</td>
    </tr>
  )

  return (
    <div>
      <div style={{display: 'flex'}}>
        <div style={{width:'400px', height:'400px'}}>
          <MyMap focusCounty={focusCounty} setHover={setHoverCounty}/>
        </div>
        <MyCalendar setHover={setHoverDate} />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>County</th>
            <th>Program</th>
            <th>Participants</th>
          </tr>
        </thead>
        <tbody>
          {dataTable}
        </tbody>
      </table>
    </div>
  );
}

export default Interventions;

import './App.css';
import ODMap from './ODMap';
import React, { useState, useEffect } from "react";
import FeatureChart from './FeatureChart';
import { json } from 'd3-fetch';


function Dashboard() {
  const [focusCounties, setFocusCounties] = useState([])
  const [data, setData] = useState(false)
  const [minAge, setMinAge] = useState(undefined)
  const [maxAge, setMaxAge] = useState(undefined)
  const [features, setFeatures] = useState([])
  const [filters, setFilters] = useState({})

  useEffect(() => {
    let params = new URLSearchParams(filters).toString()
    json(`/api/chart?${params}`).then((data) => {
      setData(JSON.parse(data));
    });
  }, [filters]);

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

  const handleFilter = (e) => {
    e.preventDefault()
    let newFilter = {}
    if(minAge !== undefined) newFilter['min_age'] = minAge
    if(maxAge !== undefined) newFilter['max_age'] = maxAge
    var newFeatures = [];
    for(let feature of e.target.feature){
      if(feature.checked){
        newFeatures.push(feature.value)
      }
    }
    if(newFeatures !== []) newFilter['features'] = newFeatures.join(';')
    setFilters(newFilter)
  }

  return (
    <div className="container">
      <form onSubmit={handleFilter}>
        <label>
          Min Age:
          <input type="number" value={minAge} onChange={(e) => setMinAge(e.target.value)}/>
        </label>
        <label>
          Max Age:
          <input type="number" value={maxAge} onChange={(e) => setMaxAge(e.target.value)}/>
        </label>
        <label>
          x_opioid_benzo
          <input type="checkbox" value="x_opioid_benzo" name="feature" />
        </label>
        <label>
          avgmme_gt90
          <input type="checkbox" value="avgmme_gt90" name="feature" />
        </label>
        <input type="submit" value="Filter" />
      </form>
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <div style={{width:'400px', height:'400px'}}>
          <ODMap focusCounties={focusCounties} setFocus={addFocusCounty} filters={filters} />
        </div>
      </div>
      {data ? <FeatureChart counties={focusCounties} data={data.data} /> : <></>}
    </div>
  );
}

export default Dashboard;

import './App.css';
import ODMap from './ODMap';
import React, { useState, useEffect } from "react";
import FeatureChart from './FeatureChart';
import { json } from 'd3-fetch';


function Dashboard() {
  const [focusCounties, setFocusCounties] = useState([])
  const [data, setData] = useState(false)
  const [count, setCount] = useState(undefined)
  const [minAge, setMinAge] = useState(undefined)
  const [maxAge, setMaxAge] = useState(undefined)
  const [filters, setFilters] = useState({})

  useEffect(() => {
    let params = new URLSearchParams(filters).toString()
    json(`/api/chart?${params}`).then((data) => {
      setData(JSON.parse(data.data))
      setCount(data.count.toLocaleString())
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
    if(minAge !== undefined && minAge !== '') newFilter['min_age'] = minAge
    if(maxAge !== undefined && maxAge !== '') newFilter['max_age'] = maxAge
    var newFeatures = [];
    for(let feature of e.target.feature){
      if(feature.checked){
        newFeatures.push(feature.value)
      }
    }
    if(newFeatures !== []) newFilter['features'] = newFeatures.join(';')
    setFilters(newFilter)
  }

  const mxFields = ['mx_hydrocodone', 'mx_oxycodone', 'mx_tramadol', 'mx_codeine', 'mx_propoxyphene', 'mx_meperidine', 'mx_hydromorphone', 'mx_morphine', 'mx_fentanyl', 'mx_tapentadol', 'mx_partial', 'mx_semi', 'mx_methadone', 'mx_buprenorphine']
  const ageFields = ['age010', 'age1120', 'age2130', 'age3140', 'age4150', 'age5160', 'age6170', 'age7180', 'age8190', 'age91above']

  return (
    <div className="container">
      <div className="row">
        <h3 className="col-sm-4">Record count: {count}</h3>
        <form onSubmit={handleFilter} className="col-sm-8">
          <div className="form-group row">
            <label htmlFor="minAgeInput" className="col-sm-2 col-form-label">Min Age:</label>
            <div className="col-sm-4">
              <input className="form-control" id="minAgeInput" type="number" value={minAge} onChange={(e) => setMinAge(e.target.value)}/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="maxAgeInput" className="col-sm-2 col-form-label">Max Age:</label>
            <div className="col-sm-4">
              <input className="form-control" id="maxAgeInput" type="number" value={maxAge} onChange={(e) => setMaxAge(e.target.value)}/>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-2">Features</div>
            <div className="col-sm-10">
              <div className="form-check">
                <label className="form-check-label col-form-label col-sm-2">
                  x_opioid_benzo
                  <input className="form-check-input" type="checkbox" value="x_opioid_benzo" name="feature" />
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label col-form-label col-sm-2">
                  avgmme_gt90
                  <input className="form-check-input" type="checkbox" value="avgmme_gt90" name="feature" />
                </label>
              </div>
            </div>
          </div>
          <input className="btn btn-primary" type="submit" value="Filter" />
        </form>
        </div>
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <div style={{width:'400px', height:'400px'}}>
          <ODMap focusCounties={focusCounties} setFocus={addFocusCounty} filters={filters} />
        </div>
      </div>
      <div style={{display: 'flex'}}>
        {data ? <FeatureChart counties={focusCounties} data={data.data} fields={mxFields} title="Drug Types"/> : <></>}
        {data ? <FeatureChart counties={focusCounties} data={data.data} fields={ageFields} title="Ages"/> : <></>}
      </div>
    </div>
  );
}

export default Dashboard;

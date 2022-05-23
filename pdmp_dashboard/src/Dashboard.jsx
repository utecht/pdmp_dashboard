import './App.css';
import ODMap from './ODMap';
import React, { useState, useEffect } from "react";
import CountyChart from './CountyChart';
import { json } from 'd3-fetch';


function Dashboard() {
  const [focusCounties, setFocusCounties] = useState([])
  const [data, setData] = useState(false)
  const [count, setCount] = useState(undefined)
  const [minAge, setMinAge] = useState(undefined)
  const [maxAge, setMaxAge] = useState(undefined)
  const [riskScore, setRiskScore] = useState(undefined)
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
    if(riskScore !== undefined && riskScore !== '') newFilter['risk_score'] = riskScore
    var newFeatures = [];
    for(let feature of e.target.feature){
      if(feature.checked){
        newFeatures.push(feature.value)
      }
    }
    if(newFeatures !== []) newFilter['features'] = newFeatures.join(';')
    setFilters(newFilter)
  }

  const resetFilter = () => {
    document.querySelectorAll('input[type=checkbox]').forEach(el => el.checked = false)
    let newFilter = {}
    setMinAge(undefined)
    setMaxAge(undefined)
    setRiskScore(undefined)
    setFilters(newFilter)
  }

  const mxFields = ['mx_hydrocodone', 'mx_oxycodone', 'mx_tramadol', 'mx_codeine', 'mx_propoxyphene', 'mx_meperidine', 'mx_hydromorphone', 'mx_morphine', 'mx_fentanyl', 'mx_tapentadol', 'mx_partial', 'mx_semi', 'mx_methadone', 'mx_buprenorphine']
  const ageFields = ['age010', 'age1120', 'age2130', 'age3140', 'age4150', 'age5160', 'age6170', 'age7180', 'age8190', 'age91above']
  const mmeFields = ['avg_mme','max_daily_mme']
  const sumDrugs = ['sum_hydrocodone','sum_oxycodone','sum_tramadol','sum_codeine','sum_propoxyphene','sum_meperidine','sum_hydromorphone','sum_morphine','sum_fentanyl','sum_tapentadol','sum_partial','sum_semi','sum_methadone','sum_buprenorphine','sum_benzo','sum_smr','sum_hypno','sum_pregaba']
  const ge2Drugs = ['hydrocodone_ge2','oxycodone_ge2','tramadol_ge2','codeine_ge2','propoxyphene_ge2','meperidine_ge2','hydromorphone_ge2','morphine_ge2','fentanyl_ge2','tapentadol_ge2','partial_ge2','semi_ge2']
  const drugsDS = ['hydrocodone_ds','oxycodone_ds','tramadol_ds','codeine_ds','propoxyphene_ds','meperidine_ds','hydromorphone_ds','morphine_ds','fentanyl_ds','tapentadol_ds','partial_ds','semi_ds']

  const features = ['x_opioid_benzo', 'avgmme_gt90', 'mx_cash']

  return (
    <div className="container">
      <div className="row">
        <form onSubmit={handleFilter} className="row">
          <div className="col-sm-4">
            <h5>Age Restriction</h5>
            <div className="row mb-2">
              <label htmlFor="minAgeInput" className="col-sm-3 col-form-label">Min Age:</label>
              <div className="col-sm-5">
                <input className="form-control" id="minAgeInput" type="number" value={minAge} onChange={(e) => setMinAge(e.target.value)}/>
              </div>
            </div>
            <div className="row mb-2">
              <label htmlFor="maxAgeInput" className="col-sm-3 col-form-label">Max Age:</label>
              <div className="col-sm-5">
                <input className="form-control" id="maxAgeInput" type="number" value={maxAge} onChange={(e) => setMaxAge(e.target.value)}/>
              </div>
            </div>
          </div>
          <div className="form-group col-sm-4">
            <h5>Features</h5>
            {features.map((feature) => (
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value={feature} name="feature" />
                <label className="form-check-label">{feature}</label>
              </div>
            ))}
          </div>
          <div className="col-sm-4 row">
            <h5>Risk Cutoff</h5>
            <label htmlFor="maxAgeInput" className="col-sm-4 col-form-label">Risk Score:</label>
            <div className="col-sm-6">
              <input className="form-control" id="maxAgeInput" type="number" step="0.001" value={riskScore} onChange={(e) => setRiskScore(e.target.value)}/>
            </div>
          </div>
          <input className="btn btn-primary col-sm-2" type="submit" value="Filter" />
          <button className="btn btn-secondary col-sm-2" onClick={()=>resetFilter()}>Reset</button>
        </form>
        <div className="row mt-5">
          <h3 className="col-sm-3">Record count: {count}</h3>
        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <div style={{width:'400px', height:'400px'}}>
          <ODMap focusCounties={focusCounties} setFocus={addFocusCounty} filters={filters} />
        </div>
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {data ? <CountyChart counties={focusCounties} data={data.data} fields={mxFields} percent={true} title="Prescription Types"/> : <></>}
        {data ? <CountyChart counties={focusCounties} data={data.data} fields={ageFields} percent={true} title="Ages"/> : <></>}
        {data ? <CountyChart counties={focusCounties} data={data.data} fields={mmeFields} percent={false} title="MME"/> : <></>}
        {data ? <CountyChart counties={focusCounties} data={data.data} fields={sumDrugs} percent={false} title="Prescription Count"/> : <></>}
        {data ? <CountyChart counties={focusCounties} data={data.data} fields={ge2Drugs} percent={true} title=">2 prescriptions"/> : <></>}
        {data ? <CountyChart counties={focusCounties} data={data.data} fields={drugsDS} percent={true} title="Days Supply"/> : <></>}
      </div>
    </div>
  );
}

export default Dashboard;

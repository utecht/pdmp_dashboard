import './App.css';
import React, { useState, useEffect } from "react";
import FeatureChart from './FeatureChart';
import { json } from 'd3-fetch';


function ChartPage() {
  const [selectedFeatures, setSelectFeatures] = useState([])
  const [data, setData] = useState(false)

  useEffect(() => {
    json(`/api/feature`).then((resp) => {
      setData({'All': JSON.parse(resp)})
    })
  }, [])

  const toggleFeature = (feature) => {
    var newFeatures = [...selectedFeatures]
    let index = newFeatures.indexOf(feature)
    if(index >= 0){
      newFeatures.splice(index, 1)
      setSelectFeatures(newFeatures)
      let newData = {...data}
      delete newData.feature
      setData(newData)
    } else {
      newFeatures.push(feature)
      setSelectFeatures(newFeatures)
      let params = new URLSearchParams({'feature':feature}).toString()
      json(`/api/feature?${params}`).then((resp) => {
        let newData = {...data}
        newData[feature] = JSON.parse(resp)
        setData(newData)
      })
    }
  }

  const features = ['mx_hydrocodone', 'mx_oxycodone', 'mx_tramadol', 'mx_codeine', 'mx_propoxyphene', 'mx_meperidine', 'mx_hydromorphone', 'mx_morphine', 'mx_fentanyl', 'mx_tapentadol', 'mx_partial', 'mx_semi', 'mx_methadone', 'mx_buprenorphine', 'avgmme_gt90', 'x_opioid_benzo', 'x_opioid_smr', 'x_benzo_smr', 'x_opioid_benzo_smr', 'mx_cash']

  const mxFields = ['mx_hydrocodone', 'mx_oxycodone', 'mx_tramadol', 'mx_codeine', 'mx_propoxyphene', 'mx_meperidine', 'mx_hydromorphone', 'mx_morphine', 'mx_fentanyl', 'mx_tapentadol', 'mx_partial', 'mx_semi', 'mx_methadone', 'mx_buprenorphine']
  const ageFields = ['age010', 'age1120', 'age2130', 'age3140', 'age4150', 'age5160', 'age6170', 'age7180', 'age8190', 'age91above']
  const mmeFields = ['avg_mme','max_daily_mme']
  const sumDrugs = ['sum_hydrocodone','sum_oxycodone','sum_tramadol','sum_codeine','sum_propoxyphene','sum_meperidine','sum_hydromorphone','sum_morphine','sum_fentanyl','sum_tapentadol','sum_partial','sum_semi','sum_methadone','sum_buprenorphine','sum_benzo','sum_smr','sum_hypno','sum_pregaba']
  const ge2Drugs = ['hydrocodone_ge2','oxycodone_ge2','tramadol_ge2','codeine_ge2','propoxyphene_ge2','meperidine_ge2','hydromorphone_ge2','morphine_ge2','fentanyl_ge2','tapentadol_ge2','partial_ge2','semi_ge2']
  const drugsDS = ['hydrocodone_ds','oxycodone_ds','tramadol_ds','codeine_ds','propoxyphene_ds','meperidine_ds','hydromorphone_ds','morphine_ds','fentanyl_ds','tapentadol_ds','partial_ds','semi_ds']

  return (
    <div className="container">
      <h3 className="col-sm-4">Features</h3>
      <div className="row mb-5">
        {features.map(
          (field) =>
          <input
            className={(selectedFeatures.includes(field) ? 'btn-primary' : 'btn-secondary') + " btn col-sm-2 m-1"}
            onClick={(e) => toggleFeature(field)}
            key={field}
            type="button"
            value={field} />)}
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {data ? <FeatureChart features={selectedFeatures} data={data} fields={mxFields} percent={true} title="Prescription Present"/> : <></>}
        {data ? <FeatureChart features={selectedFeatures} data={data} fields={ageFields} percent={true} title="Ages"/> : <></>}
        {data ? <FeatureChart features={selectedFeatures} data={data} fields={mmeFields} percent={false} title="MME"/> : <></>}
        {data ? <FeatureChart features={selectedFeatures} data={data} fields={sumDrugs} percent={false} title="Number of Prescriptions"/> : <></>}
        {data ? <FeatureChart features={selectedFeatures} data={data} fields={ge2Drugs} percent={true} title=">2 prescriptions"/> : <></>}
        {data ? <FeatureChart features={selectedFeatures} data={data} fields={drugsDS} percent={true} title="Days Supply"/> : <></>}
      </div>
    </div>
  );
}

export default ChartPage;

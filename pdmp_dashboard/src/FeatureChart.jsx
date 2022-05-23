import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function FeatureChart(props) {
  const colors = [
    "#0084d8",
    "#aa84d8",
    "#33f408",
    "#ff84d8"
  ]

  var data = {}
  for(let key in props.data){
    for(let row in props.data[key]) {
      if(!(row in data)){
        data[row] = {}
      }
      data[row][key] = props.data[key][row]
      data[row]['index'] = row
    }
  }
  var dataArray = []
  for(let row in data){
    if(props.fields.includes(row)){
      dataArray.push(data[row])
    }
  }

  var domain = [0, 'auto'];
  if(props.percent){
    domain = [0, 1];
  }

  return (
    <div className='col-sm-4'>
      <h4>{props.title}</h4>
      <ResponsiveContainer height={(50 * props.fields.length) + (10 * (props.features.length + 1))} >
        <BarChart
          data={dataArray}
          layout="vertical"
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid />
          <XAxis type="number" allowDataOverflow={true} />
          <YAxis dataKey="index" type="category" scale="band" width={150} interval={0} />
          <Tooltip />
          <Legend verticalAlign="top" />
          <Bar key="All" dataKey="All" fill="#ff0000" isAnimationActive={false} />
          { props.features.map((feature, i) => <Bar key={feature} dataKey={feature} fill={colors[i % colors.length]} isAnimationActive={false} /> ) }
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

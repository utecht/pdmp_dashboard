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

export default function CountyChart(props) {
  const colors = [
    "#0084d8",
    "#aa84d8",
    "#26a86c",
    "#dc3545"
  ]

  const data = props.data.filter((row) => props.fields.includes(row.index))
  var domain = [0, 'auto'];
  if(props.percent){
    domain = [0, 1];
  }

  return (
    <div className="col-sm-4">
      <h4>{props.title}</h4>
      <ResponsiveContainer height={(50 * props.fields.length) + (10 * (props.counties.length + 1))} >
        <BarChart
          data={data}
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
          <Bar key="Statewide" dataKey="Statewide" fill="#ff0000" isAnimationActive={false} />
          { props.counties.map((county, i) => <Bar key={county} dataKey={county} fill={colors[i % colors.length]} isAnimationActive={false} /> ) }
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

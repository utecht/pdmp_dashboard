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
  return (
    <ResponsiveContainer width="100%" height={1750 * props.counties.length} >
      <BarChart
        data={props.data}
        layout="vertical"
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid />
        <XAxis type="number" allowDataOverflow={true} domain={[0, 1]} />
        <YAxis dataKey="index" type="category" scale="band" width={200} interval={0} />
        <Tooltip />
        <Legend verticalAlign="top" />
        { props.counties.map((county, i) => <Bar key={county} dataKey={county} fill={colors[i % colors.length]} isAnimationActive={false} /> ) }
      </BarChart>
    </ResponsiveContainer>
  );
}

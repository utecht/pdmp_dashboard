import { ResponsiveBar } from '@nivo/bar'
import React, { useState, useEffect } from "react";

const MyBarChart = ({
    data,
    colors = 'nivo'}) => {

  return (
    <ResponsiveBar
        data={data}
        keys={[ 'values' ]}
        indexBy="index"
        layout="horizontal"
        margin={{ top: 50, right: 0, bottom: 50, left: 120 }}
        padding={0.3}
        valueScale={{ type: 'symlog', max: 50 }}
        indexScale={{ type: 'band', round: true }}
        valueFormat=" >-.2f"
        colors={{ scheme: 'paired' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'average value',
            legendPosition: 'middle',
            legendOffset: -32
        }}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'average value',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        role="application"
        ariaLabel="Bar Chart"
        barAriaLabel={function(e){return e.id+": "+e.formattedValue+" : "+e.indexValue}}
    />
    )
};

export default MyBarChart;
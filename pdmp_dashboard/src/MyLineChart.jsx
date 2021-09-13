import { ResponsiveLine } from '@nivo/line'
import React, { useState, useEffect } from "react";

const MyLineChart = ({
    unformatted,
    yAxis = 'Quarters',
    xAxis = 'Count',
    colors = 'nivo',
    max = 'auto',
    min = 'auto'}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
      let newData = [];
      for(const key of Object.keys(unformatted)){
        let element = {};
        element['id'] = key;
        let arr = [];
        for(const quarter of Object.keys(unformatted[key])){
            arr.push({'x':quarter,'y':unformatted[key][quarter]});
        }
        element['data'] = arr;
        newData.push(element);
      }
      newData.sort((a, b) => {
        if(a.data[0].y > b.data[0].y) {
            return 1;
        }
        if(a.data[0].y < b.data[0].y) {
            return -1;
        }
        return 0;
      });
      setData(newData);
  }, [unformatted]);


  return (
    <ResponsiveLine
        data={data}
        colors={{ scheme: colors }}
        enableSlices="x"
        animate={false}
        margin={{ top: 50, right: 150, bottom: 50, left: 100 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: min, max: max, stacked: false, reverse: false }}
        yFormat=" >-,.0f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: yAxis,
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: xAxis,
            legendOffset: -80,
            legendPosition: 'middle',
            format: ' >-,.0f'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
    )
};

export default MyLineChart;
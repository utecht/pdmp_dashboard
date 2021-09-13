import React, { useState, useEffect } from "react";
import { csv } from "d3-fetch";
import { ResponsiveCalendar } from '@nivo/calendar';

const MyCalendar = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    csv("/interventions.csv", (d) => {
      const n = d.Description.match(/\d+/);
      const date = new Date(d.Date);
      return {
        day: date.toISOString().split('T')[0],
        value: +n,
        county: d.County,
        program: d.Program
      };
    }).then(rows => {
      var allDays = {};
      for(const row of rows){
        if(row.day in allDays){
          allDays[row.day] += row.value;
        } else {
          allDays[row.day] = row.value;
        }
      }
      let arr = [];
      for(const [key, value] of Object.entries(allDays)){
        arr.push({day: key, value: value});
      }
      setData(arr);
    });
  }, []);


  return (
    <div style={{width:'600px', height:'300px'}}>
     <ResponsiveCalendar
        data={data}
        from="2018-01-02"
        to="2018-12-31"
        emptyColor="#eeeeee"
        colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        onMouseEnter={(d) => props.setHover(d.day)}
        onMouseLeave={(d) => props.setHover(undefined)}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'row',
                translateY: 36,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: 'right-to-left'
            }
        ]}
    />
    </div>
  );
};

export default MyCalendar;

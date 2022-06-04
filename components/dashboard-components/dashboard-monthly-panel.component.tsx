import React from 'react'

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface MonthlyEarningProps{
    series:number[]
    all:number | string;
    percentage:number;
}

const MonthlyEarningPanel:React.FC<MonthlyEarningProps> = ({series,all,percentage}) => {

   const options:any = {
       chart: {
          id: "basic-bar"
        },
        colors: ["#0000ff"],
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 0,
              size: "60%",
              background: "#293450"
            },
        track: {
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            blur: 4,
            opacity: 0.15
          }
        },
        dataLabels: {
          name: {
            offsetY: -10,
            color: "#fff",
            fontSize: "13px"
          },
          value: {
            color: "#fff",
            fontSize: "30px",
            show: true
          }
        } 
        }
    },
    fill: {
      gradient: {
        shade: "dark",
        type: "vertical",
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: "round"
    },
        labels: ["Monthy Up"]
    }

  return (
    <div className="monthly-panel">
      <div className="monthly-panel__bar">

         <Chart
              options={options}
              series={series}
              type="radialBar"
              width="250"
              />
        </div>
        <div className="monthly-panel__stats">
          <h3>Monthly Earnings {all} $</h3>
          <p>{percentage}% Up From Previous Preriod</p>
          <button>View More</button>
        </div>
  </div>
  )
}

export default MonthlyEarningPanel
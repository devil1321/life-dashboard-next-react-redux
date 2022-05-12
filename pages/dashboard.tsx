import React from 'react'
import { NextPage } from 'next'
import Layout from '../components/layout.component'
import Dashboard from '../components/dashboard-components/dashboard.components'
import Email from '../components/email-components/email.components'
import openbox from '../animations/icons-json/107-box-package-open.json'
import error from '../animations/icons-json/1140-error.json'
import income from '../animations/icons-json/453-savings-pig.json'

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface SeriesOptions{
  name:string;
  data:number[]
}

const DashboardPage:NextPage = () => {

  const series:SeriesOptions[] = [{
    name: 'Orders',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
  }, {
    name: 'Rejections',
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
  }, {
    name: 'Income',
    data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
  }]

  const options:any = {
    chart: {
      type: 'bar',
      height: 550,
      id: "basic-column",
      background:'#2a3042',
      foreColor: '#ffffff'
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '65%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 3,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    yaxis: {
      title: {
        text: '$ (thousands)'
      }
    },
    fill: {
      opacity: 1
    },
    labels:{
      colors:['#000000']
    },
    tooltip: {
      style:{
        color:'#000000'
      },
     
      y: {
        formatter: function (val:any) {
          return "$ " + val + " thousands"
        }
      }
    }
  }



  return (
    <Layout title="dashboard">
        <div className="dashboard">
          <div className="dashboard__main-group">
            <div className="dashboard__left-panel">
              <Dashboard.ProfilePanel projects={100}  emails={124} earnings={3200} tasks={6}/>
              <Dashboard.MonthlyEarningPanel series={[12]} all={3456} percentage={12}   />
            </div>
            <div className="dashboard__right-panel">
              <Dashboard.Widget title="Orders" count={56} icon={openbox} />
              <Dashboard.Widget title="Rejections" count={12} icon={error} />
              <Dashboard.Widget title="Income" count={32656} icon={income} />
              <Chart
                options={options}
                series={series}
                type="bar"
                width="650"
              />
              <div className="dashboard__emails">
                <Email.Item img="/assets/user.png" person="Janette McGreed" subject="Blog Site" date="2022-02-28" />
                <Email.Item img="/assets/user.png" person="Janette McMike" subject="Blog Site" date="2022-02-26" />
                <Email.Item img="/assets/user.png" person="Janette McSmith" subject="Blog Site" date="2022-02-23" />
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default DashboardPage
import React,{ useState, useEffect } from 'react'
import { NextPage } from 'next'
import Layout from '../components/layout.component'
import Statistics from '../components/statistics-components/statistics.components'
import { State } from '../controllers/reducers'
import { useSelector } from 'react-redux'
import { Task } from '../interfaces'
import openbox from '../animations/icons-json/107-box-package-open.json'
import error from '../animations/icons-json/1140-error.json'
import income from '../animations/icons-json/453-savings-pig.json'
import dynamic from "next/dynamic";
import Dashboard from '../components/dashboard-components/dashboard.components'
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface SeriesOptions{
  name:string;
  type:string;
  data:number[]
}

const StatisticsPage:NextPage = () => {

   

  const { moneyByMonth,yearlyMoneyByMonth,yearlyMoney,totalMoney } = useSelector((state:State) => state.invoices)
  const { tasks,thisOrdersByMonthCount,thisRejectionsByMonthCount,thisFullfilledByMonthCount, allOrdersDailyArr, allRejectionsDailyArr,allFullfilledDailyArr } = useSelector((state:State) => state.todo)
 
  const [type,setType] = useState<boolean>(true)

  const [allOrders,setAllOrders] = useState<number>(0)
  const [allRejected,setAllRejected] = useState<number>(0)
  const [allFullfilled,setAllFullfilled] = useState<number>(0)
  const [windowSize,setWindowSize] = useState<number>(0)

  const [monthlytempSeries,setMonthlytTempSeries] = useState<SeriesOptions[]>([{
      name: 'Orders',
       type: 'line',
       data:[]
    }, {
      name: 'Rejections',
       type: 'line',
      data: []
    }, {
      name: 'Income',
       type: 'column',
      data: []
    }])

  const [yearlySeries,setYearlySeries] = useState<SeriesOptions[]>([{
      name: 'Orders',
       type: 'line',
       data:[]
    }, {
      name: 'Rejections',
       type: 'line',
      data: []
    }, {
      name: 'Income',
       type: 'column',
      data: []
    }])

  const options:any = {
    chart: {
      type: 'line',
      height: 550,
      id: "basic-column",
      background:'#2a3042',
      foreColor: '#ffffff',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '65%',
        endingShape: 'rounded',
        borderRadius:5,
      }
    },

    dataLabels: {
      enabled: true,
      offsetY: -12
    },
    colors: ['#66DA26','#ffa500','#2E93fA','#FF0000'],
    stroke: {
      show: true,
      width:[5,5,5,0],
      colors: ['#66DA26','#ffa500','#2E93fA','#FF0000'],
      curve:'smooth'
    },
    xaxis: {
      type:'category',
      categories: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov','Dec'],
    },
    yaxis: {
      tickAmount:10,
      title: {
        text: 'Count / Income - Thousands'
      }
    },
    fill: {
      opacity: 1,
      type:'gradient'
    },
    labels:{
      colors:['#000000']
    },
    markers: {
      size:5
    },
    tooltip: {
      style:{
        color:'#ffffff'
      },
      y: {
        formatter: function (val:any) {
          if(val % 1 != 0){
            return val + " K"
          }else{
            return val + ' Count'
          }
        }
      }
    }
  }
 
  const yearlyOptions:any = {
    chart: {
      type: 'line',
      height: 550,
      id: "basic-column",
      background:'#2a3042',
      foreColor: '#ffffff',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '65%',
        endingShape: 'rounded',
        borderRadius:5,
      }
    },

    dataLabels: {
      enabled: true,
      offsetY: -12
    },
    colors: ['#66DA26','#ffa500','#2E93fA','#FF0000'],
    stroke: {
      show: true,
      width:[5,5,5,0],
      colors: ['#66DA26','#ffa500','#2E93fA','#FF0000'],
      curve:'smooth'
    },
    xaxis: {
      type: 'datetime',
      labels: {
          format: "MM yyyy",
      },
    },
    yaxis: {
      tickAmount:10,
      title: {
        text: 'Count / Income - Thousands'
      }
    },
    fill: {
      opacity: 1,
      type:'gradient'
    },
    labels:{
      colors:['#000000']
    },
    markers: {
      size: 5
    },
    tooltip: {
      style:{
        color:'#ffffff'
      },
      y: {
        formatter: function (val:any) {
          if(val % 1 != 0){
            return val + " K"
          }else{
            return val + ' Count'
          }
        }
      }
    }
  }

  
  var optionsPolar = {
    chart: {
    width: 380,
    type: 'polarArea',
    background:'#2a3042',
    foreColor: '#ffffff',
     id: "basic-area",
  },
  labels: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov','Dec'],
  fill: {
    opacity: 0.7
  },
  colors: [ '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  '#66994D', '#B366CC'],
  stroke: {
    width: 1,
    colors: [  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC']
  },
  yaxis: {
    show: false
  },
  legend: {
    position: 'bottom'
  },
  plotOptions: {
    polarArea: {
      rings: {
        strokeWidth: 1
      },
      spokes: {
        strokeWidth: 1
      },
    }
  },
  };

  const handleSize = () =>{
    if(typeof window !== undefined){
      setWindowSize(window.innerWidth)
      window.addEventListener('resize',()=>{
        setWindowSize(window.innerWidth)
      })
    }
  }

useEffect(()=>{
  handleSize()
  setMonthlytTempSeries([
    {name: 'Fullfilled',
      type: 'line',
      data:[...thisFullfilledByMonthCount]
    }, {
      name: 'Rejections',
      type: 'line',
      data: [...thisRejectionsByMonthCount]
    }, {
      name: 'Orders',
      type: 'line',
      data: [...thisOrdersByMonthCount]
    }, {
    name: 'Income',
      type: 'column',
      data: [...moneyByMonth]
    }])
    setYearlySeries([
      { name: 'Fullfilled',
        type: 'line',
        data:[...allFullfilledDailyArr]
      }, {
        name: 'Rejections',
        type: 'line',
        data: [...allRejectionsDailyArr]
      },{
        name: 'Orders',
        type: 'line',
        data: [...allOrdersDailyArr]
      },
      {
        name: 'Income',
        type: 'column',
        data: [...yearlyMoneyByMonth]
      }])

      if(!type){
        if(thisOrdersByMonthCount.length > 0) setAllOrders(tasks.filter((t:Task) => t.isOrder && t.isRejected === 'pending').length)
        if(thisFullfilledByMonthCount.length > 0) setAllFullfilled(tasks.filter((t:Task) => t.isOrder && t.isRejected === false).length)
        if(thisRejectionsByMonthCount.length > 0) setAllRejected(tasks.filter((t:Task) => t.isOrder && t.isRejected === true).length)
      }else{
        if(thisOrdersByMonthCount.length > 0) setAllOrders(thisOrdersByMonthCount.reduce((a:number,b:number) => a+=b))
        if(thisFullfilledByMonthCount.length > 0) setAllFullfilled(thisFullfilledByMonthCount.reduce((a:number,b:number) => a+=b))
        if(thisRejectionsByMonthCount.length > 0) setAllRejected(thisRejectionsByMonthCount.reduce((a:number,b:number) => a+=b))
      }
},[type,tasks,thisOrdersByMonthCount,thisRejectionsByMonthCount,moneyByMonth,allOrdersDailyArr, allRejectionsDailyArr,allFullfilledDailyArr ])

  return (
    <Layout title="Statistics">
        <div className="statistics">
              <Statistics.Nav setType={setType} />
              <div className="statistics__widgets">
                <Dashboard.Widget title="Orders" count={allOrders as number} icon={openbox} />
                <Dashboard.Widget title="Rejected" count={allRejected as number} icon={error} />
                <Dashboard.Widget title="Fullfilled" count={allFullfilled as number} icon={openbox} />
                <Dashboard.Widget title="All Income" count={type ? totalMoney +'  K' : yearlyMoney + ' K' } icon={income} />
              </div>
              <div className="statistics__chart-wrapper">
                  <div className={`statistics__chart ${!type ? '--hidden' : '--visible'} statistics__yearly`}>
                    <Chart
                      options={yearlyOptions}
                      series={yearlySeries}
                      type="line"
                      width={windowSize !== 0 && windowSize > 767 ? "100%" : 1000}
                      height={windowSize > 767 && windowSize === 0 ? 550 : 330}
                      />
                  </div>
                  {windowSize !== 0 && windowSize > 767
                   ? <div className={`statistics__chart ${type ? '--hidden' : '--visible'}`}>
                    <Chart
                      options={options}
                      series={monthlytempSeries}
                      type="line"
                      width="100%"
                      />
                  </div>
                  : <div className={`statistics__chart ${type ? '--hidden' : '--visible'}`}>
                    <div className="dashboard__mobile-charts">
                       <h3>Orders</h3>
                         <Chart
                           options={optionsPolar}
                           type="polarArea"
                           series={[...thisOrdersByMonthCount]}
                           />
                         <h3>Fullfilled</h3>
                         <Chart
                           options={optionsPolar}
                           type="polarArea"
                           series={[...thisFullfilledByMonthCount]}
                           />
                         <h3>Rejections</h3>
                         <Chart
                           options={optionsPolar}
                           type="polarArea"
                           series={[...thisRejectionsByMonthCount]}
                           />
                      </div>
                  </div>}
                </div>
          </div>
    </Layout>
  )
}

export default StatisticsPage
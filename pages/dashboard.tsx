import React,{ useState, useEffect } from 'react'
import { NextPage } from 'next'
import Layout from '../components/layout.component'
import Dashboard from '../components/dashboard-components/dashboard.components'
import Email from '../components/email-components/email.components'
import openbox from '../animations/icons-json/107-box-package-open.json'
import error from '../animations/icons-json/1140-error.json'
import income from '../animations/icons-json/453-savings-pig.json'
import { State } from '../controllers/reducers'
import { useSelector } from 'react-redux'
import { Task } from '../interfaces'

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface SeriesOptions{
  name:string;
  type:string;
  data:number[]
}

const DashboardPage:NextPage = () => {

   

  const { unseenEmails, emails } = useSelector((state:State) => state.user)
  const { invoices,moneyByMonth,yearlyMoney,upFromLastMonth,totalMoney } = useSelector((state:State) => state.invoices)
  const { tasks,thisOrdersByMonthCount,thisRejectionsByMonthCount,thisFullfilledByMonthCount } = useSelector((state:State) => state.todo)
  const [todo,setTodo] = useState<Task[]>([])
  const [allOrders,setAllOrders] = useState<number>(0)
  const [allRejections,setAllRejections] = useState<number>(0)
  const [windowSize,setWindowSize] = useState<number>(0)

  const [isLoad,setIsLoad] = useState<boolean>(false)

  const [tempSeries,setTempSeries] = useState<SeriesOptions[]>([{
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

    colors: ['#66DA26','#ffa500','#2E93fA','#FF0000'],
    dataLabels: {
      enabled: true,
      offsetY: -12
    },
    stroke: {
      show: true,
      width:[5,5,5,0],
      colors: ['#66DA26','#ffa500','#2E93fA','#FF0000'],
      curve: 'smooth',

    },
    xaxis: {
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
      size: 5,
    },
    tooltip: {
      style:{
        color:'#000000'
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


const handleMobile = () => {
  if(typeof window !== undefined){
    setWindowSize(window.innerWidth)
  }
  if(typeof window !== undefined){
    window.addEventListener('resize',()=>{
      setWindowSize(window.innerWidth)
    })
  }
}

useEffect(()=>{
  setTodo(tasks.filter((t:Task) => t.completed === false || t.isRejected === 'pending'))
  setAllOrders(tasks.filter((t:Task)=> t.isOrder === true && t.isRejected === 'pending').length)
  setAllRejections(tasks.filter((t:Task)=> t.isOrder === true && t.isRejected === true).length)
  setTempSeries([
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
    handleMobile()
    if(!isLoad){
      setIsLoad(true)
    }

},[tasks,thisOrdersByMonthCount,thisRejectionsByMonthCount,moneyByMonth])

  return (
    <Layout title="Dashboard">
        <div className="dashboard">
          <div className="dashboard__main-group">
            <div className="dashboard__left-panel">
              <Dashboard.ProfilePanel invoices={invoices.length}  emails={unseenEmails.length} earnings={yearlyMoney * 1000 > 1000 ? yearlyMoney * 1000 + ' K' : yearlyMoney * 1000}  tasks={todo.length}/>
              <Dashboard.MonthlyEarningPanel series={[upFromLastMonth]} all={moneyByMonth[new Date().getMonth()] * 1000 > 1000 ? moneyByMonth[new Date().getMonth()]  * 1000 + " K" : moneyByMonth[new Date().getMonth()]  * 1000 } percentage={upFromLastMonth}   />
            </div>
            <div className="dashboard__right-panel">
              <Dashboard.Widget title="Orders" count={allOrders as number} icon={openbox} />
              <Dashboard.Widget title="Rejections" count={allRejections as number} icon={error} />
              <Dashboard.Widget title="Income" count={totalMoney > 1000 ? totalMoney + ' K' : totalMoney} icon={income} />

              {windowSize !== 0 && windowSize > 767
              ? <Chart
                options={options}
                series={tempSeries}
                type="bar"
                width={windowSize !== 0 && windowSize > 1024  ? "650" : windowSize > 768 ? "770" : windowSize < 767 ? '300' : '650' }
                />
              : <div className="dashboard__mobile-charts">
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
                </div>}
              <div className="dashboard__emails">
                {emails.length > 0 && unseenEmails?.slice(0,3).map((email:any) => <Email.Item isView={true} key={email.id} img="/assets/user.png" email={email} />)}
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default DashboardPage
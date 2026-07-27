/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

const LineChart = () => {
const ChartData=[
    { name: "JAN", amount: 10 },
    { name: "FEB", amount: 2 },
    { name: "MAR", amount: 5 },
    { name: "APR", amount: 15 },
    { name: "MAY", amount: 10 },
    { name: "JUN", amount: 12 },
    { name: "JUL", amount: 15 },
    { name: "AUG", amount: 25 },
    { name: "SEPT", amount: 22 },
    { name: "OCT", amount: 30 },
    { name: "NOV", amount: 25 },
    { name: "DEC", amount: 40 },
  ]
const chartRef=useRef(null);
const chartInstance=useRef(null);
useEffect(() => {
if (chartInstance.current) {
    chartInstance.current.destroy()
}
const myChartRef=chartRef.current.getContext('2d')
chartInstance.current= new Chart(myChartRef,{
type:'line',
options:{
  responsive: true,
  animation: true,
  showLines: false,
  aspectRatio:1.2,
   plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Staff Analystic Chart'
      }
      },
  
  datasets:{
    line:{
      tension: 0.4,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      borderColor: 'rgb(33,150,243)',
      borderWidth: 2,
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBorderColor: 'rgb(33,150,243)',
      pointBackgroundColor: 'rgb(33,150,243)',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgb(33,150,243)',
      pointHoverBorderColor: 'rgb(33,150,243)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
    }
  },
},
 data:  {
  labels: ChartData ? ChartData.map(data=>data.name):[],
  datasets: [{
    label: 'Staff',
    
    data: ChartData ? ChartData.map(data=>data.amount):[],
    fill: false,
    borderColor: 'rgb(33,150,243)',
    tension: 0.1,
  }],
},
});
return()=>{
if (chartInstance.current) {
    chartInstance.current.destroy()
}
}
}, [])

  return (
    <div className='px-2 py-4 bg-white rounded-lg shadow-md flex items-center justify-center'>
    <canvas ref={chartRef}  />
    </div>
  )
}

export default LineChart
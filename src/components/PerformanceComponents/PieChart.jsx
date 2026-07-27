/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

// eslint-disable-next-line react/prop-types
const PieChart = () => {
const DoughnutData=[35, 25, 40]
const chartRef=useRef(null);
const chartInstance=useRef(null);
useEffect(() => {
if (chartInstance.current) {
    chartInstance.current.destroy()
}
const myChartRef=chartRef.current.getContext('2d')
chartInstance.current= new Chart(myChartRef,{
type:'pie',
options: {
aspectRatio: 1.2,
   responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Performance Pie Chart'
      }
      }
},
 data:  {
  labels: [
    'United States',
    'United Kingdom',
    'Germany'
  ],
  datasets: [{
  //   labels: [
  //   // 'United States',
  //   'United Kingdom',
  //   'Germany'
  // ],
    data: DoughnutData,
    backgroundColor: [
      'rgb(0,188,194)',
      'rgb(33,150,243)',
      'rgb(248,250,253)'
    ],
    hoverOffset: 3
  }]
 }
});
return()=>{
if (chartInstance.current) {
    chartInstance.current.destroy()
}
}
}, [])

  return (
    <div className='px-2 py-4 bg-white rounded-lg shadow-md flex items-center justify-center'>
      <canvas ref={chartRef} />
    </div>
  )
}

export default PieChart
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

// eslint-disable-next-line react/prop-types
const DoughnutChart = ({DoughnutData}) => {
const chartRef=useRef(null);
const chartInstance=useRef(null);
useEffect(() => {
if (chartInstance.current) {
    chartInstance.current.destroy()
}
const myChartRef=chartRef.current.getContext('2d')
chartInstance.current= new Chart(myChartRef,{
type:'doughnut',
options: {
  cutout: '85%',
  aspectRatio: 2,
},
 data:  {
  labels: [
    'United States',
    'United Kingdom',
    'Germany'
  ],
  datasets: [{
    labels: [
    'United States',
    'United Kingdom',
    'Germany'
  ],
    data: DoughnutData,
    backgroundColor: [
      'rgb(0,188,194)',
      'rgb(33,150,243)',
      'rgb(248,250,253)'
    ],
    hoverOffset: 3
  }]
},
});
return()=>{
if (chartInstance.current) {
    chartInstance.current.destroy()
}
}
}, [DoughnutData])

  return (
    <div className='px-2 py-4'>
      <canvas ref={chartRef} />
    </div>
  )
}

export default DoughnutChart
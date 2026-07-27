// import React from 'react'

import { Chart } from "chart.js";
import { Utils } from "./utils";
import { useEffect, useRef } from "react";

const AttendanceBarChart = () => {
const chartRef=useRef(null);
const chartInstance=useRef(null);

const labels = Utils.months({count: 7});
const data = {
  labels: labels,
  datasets: [{
    label: 'Attendance Statistics',
    data: [65, 59, 80, 81, 56, 55, 40],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};



const config = {
  type: 'bar',
  data: data,
  options: {
  aspectRatio: 1.2,
  responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  },
};


useEffect(() => {
if (chartInstance.current) {
    chartInstance.current.destroy()
}
const myChartRef=chartRef.current.getContext('2d')
chartInstance.current= new Chart(myChartRef,
config
);
return()=>{
if (chartInstance.current) {
    chartInstance.current.destroy()
}
}
}, [])

  return (
    <div>
     <div className='px-2 py-4 bg-white rounded-lg shadow-md flex items-center justify-center'>
    <canvas ref={chartRef}></canvas>
    </div>
    </div>
  )
}

export default AttendanceBarChart
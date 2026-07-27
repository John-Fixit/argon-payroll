/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const LineChartComponent = ({ trafficData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(myChartRef, {
      type: "bar",
      options: {
        responsive: true,
        animation: true,
        showLines: false,
        // aspectRatio: 2.5,
        datasets: {
          bar: {
            // backgroundColor: "#00bcc2",
          },
          line: {
            tension: 0.4,
            backgroundColor: "rgb(33,150,243)",
            borderColor: "rgb(33,150,243)",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "round",
            pointBorderColor: "rgb(33,150,243)",
            pointBackgroundColor: "rgb(33,150,243)",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgb(33,150,243)",
            pointHoverBorderColor: "rgb(33,150,243)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
          },
          
        },
      },
      data: {
        labels: trafficData ? trafficData.map((data) => data.name) : [],
        datasets: [
          {
            label: "Traffic",

            data: trafficData ? trafficData.map((data) => data.amount) : [],
            fill: false,
            borderColor: "rgb(33,150,243)",
            tension: 0.1,
          },
        ],
      },
    });
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [trafficData]);

  return (
    <div className="px-2 py-4">
      <canvas ref={chartRef} />
    </div>
  );
};

export default LineChartComponent;

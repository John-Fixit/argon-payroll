/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
const StatPieChart = ({ title, displayTitle, labels, stat_data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(myChartRef, {
      type: "pie",
      options: {
        aspectRatio: 1.2,
        responsive: true,
        plugins: {
          legend: {
            position: "chartArea",
          },
          title: {
            display: displayTitle ?? true,
            text: title,
          },
        },
      },
      data: {
        labels: labels,
        datasets: [
          {
            data: stat_data,
            backgroundColor: [
              "rgb(254,243,199)",
              "rgb(220,252,231)",
              "rgb(254,226,226)",
            ],
            // hoverOffset: 3,
          },
        ],
      },
    });
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [stat_data, labels]);

  return (
    <div className="px-2 py-4 bg-white rounded-lg shadow-md flex items-center justify-center">
      <canvas ref={chartRef} />
    </div>
  );
};

export default StatPieChart;

StatPieChart.propTypes = {
    title: PropTypes.string,
    displayTitle: PropTypes.bool,
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    stat_data: PropTypes.array.isRequired,
}

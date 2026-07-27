// import React from 'react'

import { Chart } from "chart.js";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useMemo } from "react";

const StatBarChart = ({ title, displayTitle, labels, stat_data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const truncateLabel = (label, maxLength = 10) => {
    return label.length > maxLength ? label.slice(0, maxLength) + "..." : label;
  };

  const sortAgeRanges = (ranges) => {
    return ranges?.sort((a, b) => {
      if (a === "Unspecified") return 1; // Push "Unspecified" to the end
      if (b === "Unspecified") return -1;

      const getLowerBound = (range) => parseInt(range?.split("-")[0], 10);
      return getLowerBound(a) - getLowerBound(b);
    });
  };

  const data = useMemo(
    () => ({
      labels:
        title === "AGE"
          ? sortAgeRanges(labels)
          : labels?.map((label) => truncateLabel(label)),
      datasets: [
        {
          label: "",
          data: stat_data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 1,
        },
      ],
    }),
    [labels, stat_data, title]
  );

  const config = useMemo(
    () => ({
      type: "bar",
      data: data,
      options: {
        aspectRatio: labels?.length ? 1.1 : 3,
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: "top",
          },
          title: {
            display: displayTitle ?? true,
            text: title,
          },
          tooltip: {
            callbacks: {
              title: (context) => labels[context[0].dataIndex], // Display full label on hover
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    }),
    [data, labels, displayTitle, title]
  );

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(myChartRef, config);
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [stat_data, labels, config]);

  return (
    <div className="px-2 py-4 bg-white rounded-lg shadow-md flex items-center justify-center">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default StatBarChart;

StatBarChart.propTypes = {
  title: PropTypes.string,
  displayTitle: PropTypes.bool,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  stat_data: PropTypes.array.isRequired,
};

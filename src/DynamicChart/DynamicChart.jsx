import React, { useEffect, useRef } from "react";
import {
  Chart,
  registerables // This will allow us to register all necessary components
} from "chart.js";

Chart.register(...registerables); // Register all components

const DynamicChart = ({ data, labels }) => {
  const chartRef = useRef(null); // Ref for the canvas element
  const chartInstance = useRef(null); // Ref to store the chart instance

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Destroy the previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a new chart instance
    chartInstance.current = new Chart(ctx, {
      type: "bar", // Ensure "bar" is registered
      data: {
        labels: labels,
        datasets: [
          {
            label: "Sample Data",
            data: data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
      },
    });

    // Clean up on component unmount or data/labels change
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, labels]); // Re-run when data or labels change

  return <canvas ref={chartRef}></canvas>;
};

export default DynamicChart;

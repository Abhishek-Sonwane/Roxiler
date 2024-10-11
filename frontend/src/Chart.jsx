import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Chart({ dataSet, monName }) {
  let arr = dataSet.map((e) => parseInt(e.price));
  let barChartHeader = "Bar Chart Stats - " + monName;
  const ranges = [
    { min: 0, max: 100 },
    { min: 101, max: 200 },
    { min: 201, max: 300 },
    { min: 301, max: 400 },
    { min: 401, max: 500 },
    { min: 501, max: 600 },
    { min: 601, max: 700 },
    { min: 701, max: 800 },
    { min: 801, max: 900 },
    { min: 901, max: Infinity },
  ];

  function convertToRanges(arr, ranges) {
    const rangeCount = new Array(ranges.length).fill(0);

    arr.forEach((num) => {
      for (let i = 0; i < ranges.length; i++) {
        if (num >= ranges[i].min && num <= ranges[i].max) {
          rangeCount[i]++;
          break;
        }
      }
    });

    

    return rangeCount;
  }

  let dataRangeCount = convertToRanges(arr, ranges);
  const data = {
    labels: [
      "0-100",
      "101-200",
      "201-300",
      "301-400",
      "401-500",
      "501-600",
      "601-700",
      "701-800",
      "801-900",
      "901 above",
    ],
    datasets: [
      {
        label: "Count",
        data: dataRangeCount,
        backgroundColor: "rgba(72, 220, 224, 0.6)",
        borderColor: "rgba(72, 220, 224, 1)",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: barChartHeader,
        font: {
          size: 20,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Range (X Axis)",
        },
      },
      y: {
        beginAtZero: true,
        max: 60,
        title: {
          display: true,
          text: "Number of Occurrences",
        },
      },
    },
  };

  return (
    <>
      <Bar options={options} data={data} />
    </>
  );
}

export default Chart;

// components/PieChart.jsx

import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PieChart = ({ passed, failed, onSliceClick }) => {
  const options = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
    },
    title: {
      text: "Visual Test Result Breakdown",
    },
    subtitle: {
      text: 'Source: <a href="https://yourcompany.test-reports.com" target="_blank">Test Reports</a>',
    },
    tooltip: {
      valueSuffix: " test(s)",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        point: {
          events: {
            click: function () {
              if (onSliceClick) {
                onSliceClick(this.name); // this.name will be "Passed" or "Failed"
              }
            },
          },
        },
        dataLabels: [
          {
            enabled: true,
            distance: 20,
            style: {
              fontWeight: "bold",
              color: "white",
            },
          },
          {
            enabled: true,
            distance: -40,
            format: "{point.percentage:.1f}%",
            style: {
              fontSize: "1.2em",
              textOutline: "none",
              opacity: 0.7,
            },
            filter: {
              operator: ">",
              property: "percentage",
              value: 10,
            },
          },
        ],
      },
    },
    series: [
      {
        name: "Tests",
        colorByPoint: true,
        data: [
          {
            name: "Passed",
            y: passed,
            color: "limegreen",
            sliced: passed > failed,
            selected: passed > failed,
          },
          {
            name: "Failed",
            y: failed,
            color: "tomato",
            sliced: failed >= passed,
            selected: failed >= passed,
          },
        ],
      },
    ],
  };

  return (
    <div className="chart-container">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PieChart;

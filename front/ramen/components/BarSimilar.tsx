import React from "react";
import { Chart } from "chart.js";
import { useRef } from "react";
import { DataProps } from "./Types";

const BarSimilar = ({ barChartData }: { barChartData: DataProps }) => {
  console.log(barChartData);
  const chartRef = useRef<Chart | null>(null);

  // callback creates the chart on the canvas element
  const canvasCallback = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    else {
      chartRef.current?.destroy();
    }

    const ctx = canvas.getContext("2d");
    if (ctx) {
      console.log(barChartData);
      console.log(barChartData.data[0]);
      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["짠맛", "단맛"],
          datasets: [
            {
              label: "현재라면",
              data: [barChartData.data[1], barChartData.data[3]],
              backgroundColor: ["rgb(54, 162, 235)", "rgb(54, 162, 235)"],
              borderColor: "black",
              borderWidth: 0,
              barThickness: 20,
            },
            {
              label: "유사라면",
              data: [barChartData.data[0], barChartData.data[2]],
              backgroundColor: ["rgb(255, 205, 86)", "rgb(255, 205, 86)"],
              borderColor: "black",
              borderWidth: 0,
              barThickness: 20,
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
    }
  };

  return (
    <div className="self-center w-1/2">
      <div className="overflow-hidden">
        <canvas ref={canvasCallback}></canvas>
      </div>
    </div>
  );
};

export default BarSimilar;
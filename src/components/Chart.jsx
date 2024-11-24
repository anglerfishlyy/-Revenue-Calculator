//bringing in  chart.js lib
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
 );

const Chart = ({ projections }) => {
  const years = projections.map(p => p.year);
  const revenues = projections.map(p => p.revenue);
  const growthRates = projections.map(p => p.growthPercentage);

   const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
     plugins: {
      legend: {
         position: 'top',
         labels: {
          boxWidth: 20,
          padding: 10,
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          }
         }
      },
       tooltip: {
        mode: 'index',
        intersect: false,
        padding: 10,
       }
     },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          },
           callback: function(value) {
            if (value >= 1000000) {
              return (value / 1000000).toFixed(1) + 'M';
            }
            if (value >= 1000) {
              return (value / 1000).toFixed(1) + 'K';
            }
            return value;
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          }
        }
      }
    }
  };

   const lineChartData = {
    labels: years,
    datasets: [
      {
        label: 'Projected Revenue ($)',
        data: revenues,
        borderColor: '#2196f3',
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
         tension: 0.4,
        fill: true,
        pointRadius: window.innerWidth < 768 ? 3 : 5,
      }
    ]
  };

    const barChartData = {
    labels: years,
    datasets: [
      {
        label: 'Growth Rate (%)',
        data: growthRates,
        backgroundColor: 'rgba(76, 175, 80, 0.6)',
        borderColor: '#4caf50',
        borderWidth: 1,
         barThickness: window.innerWidth < 768 ? 20 : 30,
      }
    ]
  };

   return (
    <div className="chart-container">
      <h2>Revenue Growth Visualization</h2>
       <div className="charts">
        <div className="chart-wrapper">
           <h3>Revenue Projection</h3>

          <div className="chart-box">
            <Line data={lineChartData} options={commonOptions} />
          </div>

         </div>
        <div className="chart-wrapper">
          <h3>Growth Rate</h3>
           <div className="chart-box">
            <Bar data={barChartData} options={commonOptions} />
           </div>
        </div>
       </div>
    </div>

  );
};

export default Chart;


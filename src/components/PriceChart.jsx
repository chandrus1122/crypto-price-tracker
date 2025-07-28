import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import './PriceChart.css';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const PriceChart = ({ coinId }) => {
  const [range, setRange] = useState('7D');
  const [chartData, setChartData] = useState(null);

  const ranges = {
    '1D': 1,
    '7D': 7,
    '1M': 30,
  };

  const fetchChart = async () => {
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
        {
          params: {
            vs_currency: 'usd',
            days: ranges[range],
          },
        }
      );

      const prices = res.data.prices;

      setChartData({
        labels: prices.map(p => {
          const date = new Date(p[0]);
          return ranges[range] === 1
            ? date.toLocaleTimeString()
            : date.toLocaleDateString();
        }),
        datasets: [
          {
            label: `Price (USD) - ${range}`,
            data: prices.map(p => p[1]),
            fill: false,
            borderColor: 'lightgreen',
            tension: 0.3,
            pointRadius: 0,
          },
        ],
      });
    } catch (err) {
      console.error('Failed to fetch price chart:', err);
    }
  };

  useEffect(() => {
    fetchChart();
    const interval = setInterval(() => {
      fetchChart();
    }, 30000);
    return () => clearInterval(interval);
  }, [coinId, range]);

  const options = {
    responsive: true,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      tooltip: {
        callbacks: {
          label: context => ` $${context.parsed.y.toFixed(2)}`,
          title: context => context[0].label,
        },
      },
      legend: { display: false },
    },
    scales: {
      x: { ticks: { color: '#aaa' } },
      y: { ticks: { color: '#aaa' } },
    },
  };

  return (
    <div className="price-chart-container">
      <h3>Price Chart</h3>

      <div className="range-buttons">
        {Object.keys(ranges).map(label => (
          <button
            key={label}
            className={range === label ? 'active' : ''}
            onClick={() => setRange(label)}
          >
            {label}
          </button>
        ))}
      </div>

      {chartData ? (
        <div className="chart-wrapper">
          <Line data={chartData} options={options} />
        </div>
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default PriceChart;

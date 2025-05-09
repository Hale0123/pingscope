import React from 'react';
import { Line } from 'react-chartjs-2';
import './LatencyChart.css';

interface LatencyChartProps {
  latencyHistory: number[];
  exportToCSV: () => void;
  avgLatency: number | null;
  minLatency: number | null;
  maxLatency: number | null;
}

const LatencyChart: React.FC<LatencyChartProps> = ({
  latencyHistory,
  exportToCSV,
  avgLatency,
  minLatency,
  maxLatency
}) => {
  return (
    <div className="latency-chart-section">
      <h3>Latency History</h3>
      <div className="latency-chart-wrapper">
        <Line
          data={{
            labels: latencyHistory.map((_, idx) => `Test ${idx + 1}`),
            datasets: [
              {
                label: 'Latency (ms)',
                data: latencyHistory,
                fill: false,
                borderColor: 'rgba(50, 50, 50, 0.8)',
                pointBackgroundColor: (ctx) => {
                  const value = latencyHistory[ctx.dataIndex];
                  return value > 50 ? 'red' : 'rgba(75,192,192,1)';
                },
                tension: 0.3,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { display: true },
              title: { display: true, text: 'Latency Over Time' },
            },
          }}
        />
      </div>

      {avgLatency !== null && (
        <div className="latency-stats">
          <p>Average Latency: {avgLatency} ms</p>
          <p>Minimum Latency: {minLatency} ms</p>
          <p>Maximum Latency: {maxLatency} ms</p>
        </div>
      )}

      <div className="latency-export">
        <button className='btn-primary' onClick={exportToCSV}>Export Latency History (CSV)</button>
      </div>
    </div>
  );
};

export default LatencyChart;

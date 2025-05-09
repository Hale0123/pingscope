import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const LatencyTester: React.FC = () => {
  const [latency, setLatency] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [latencyHistory, setLatencyHistory] = useState<number[]>([]);
  const [packetLossResult, setPacketLossResult] = useState<string | null>(null);
  const [dnsTime, setDnsTime] = useState<number | null>(null);
  const [autoPing, setAutoPing] = useState<boolean>(false);


  // Measure one-time latency
  const testLatency = async () => {
    setLoading(true);
    const start = performance.now();

    try {
      await fetch('https://jsonplaceholder.typicode.com/posts/1');
    } catch (err) {
      console.error('Latency test error:', err);
    }

    const end = performance.now();
    const result = Math.round(end - start);

    setLatency(result);
    setLatencyHistory(prev => [...prev, result]);
    setLoading(false);
  };

  // Simulate packet loss
  const simulatePacketLoss = async (url: string, attempts: number = 10) => {
    let failed = 0;

    for (let i = 0; i < attempts; i++) {
      try {
        await fetch(url, { mode: 'cors' });
      } catch {
        failed++;
      }
    }

    setPacketLossResult(`${failed}/${attempts} requests failed (${Math.round((failed / attempts) * 100)}%)`);
  };

  // Simulate DNS resolution time
  const testDNSSpeed = async () => {
    const start = performance.now();
    try {
      await fetch('https://cloudflare.com', { mode: 'cors' });
    } catch (error) {
      console.error('DNS test fetch failed:', error);
    }
    const end = performance.now();

    const time = Math.round(end - start);
    setDnsTime(time);
  };

  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + latencyHistory.map((latency, index) => `Test ${index + 1},${latency}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "latency_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  useEffect(() => {
    let interval: any;

    if (autoPing) {
      interval = setInterval(() => {
        testLatency();
      }, 5000); // every 5 seconds
    }

    return () => clearInterval(interval); // cleanup
  }, [autoPing]);


  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>PingScope - Network Analyzer</h2>

      {/* Latency */}
      <div style={{ marginBottom: '2rem' }}>
        <h3>Latency Tester</h3>
        <button onClick={testLatency} disabled={loading}>
          {loading ? 'Testing...' : 'Test Latency'}
        </button>
        {latency !== null && <p>Latency: {latency} ms</p>}
        <div style={{ marginTop: '1rem' }}>
          <h4>Auto-Ping Mode</h4>
          <button onClick={() => setAutoPing(prev => !prev)}>
            {autoPing ? '🛑 Stop Auto-Ping' : '▶️ Start Auto-Ping'}
          </button>
        </div>
      </div>

      {/* Packet Loss */}
      <div style={{ marginBottom: '2rem' }}>
        <h3>Packet Loss Simulator</h3>
        <button
          onClick={() =>
            simulatePacketLoss('https://jsonplaceholder.typicode.com/posts/1')
          }
        >
          Simulate Packet Loss
        </button>
        {packetLossResult && <p>{packetLossResult}</p>}
      </div>

      {/* DNS Speed */}
      <div style={{ marginBottom: '2rem' }}>
        <h3>DNS Speed Test</h3>
        <button onClick={testDNSSpeed}>Test DNS Speed</button>
        {dnsTime !== null && <p>DNS Resolution Time: {dnsTime} ms</p>}
      </div>

      {/* Latency Chart */}
      {latencyHistory.length > 0 && (
        <div>
          <h3>Latency History</h3>
          <div style={{ width: '100%', maxWidth: '600px', marginTop: '1rem' }}>
            <Line
              data={{
                labels: latencyHistory.map((_, idx) => `Test ${idx + 1}`),
                datasets: [
                  {
                    label: 'Latency (ms)',
                    data: latencyHistory,
                    fill: false,
                    borderColor: 'rgba(75,192,192,1)',
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
          <div style={{ marginTop: '1rem' }}>
            <button onClick={exportToCSV}>📤 Export Latency History (CSV)</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LatencyTester;

import React, { useState, useEffect } from 'react';
import LatencyControls from './LatencyControls/LatencyControls';
import PacketLossSimulator from './PacketLossSimulator/PacketLossSimulator';
import DNSSpeedTest from './DNSSpeedTest/DNSSpeedTest';
import LatencyChart from './LatencyChart/LatencyChart';
import SectionCard from './SectionCard/SectionCard';


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
  const avgLatency =
    latencyHistory.length > 0
      ? Math.round(latencyHistory.reduce((a, b) => a + b, 0) / latencyHistory.length)
      : null;
  
  const minLatency = latencyHistory.length > 0 ? Math.min(...latencyHistory) : null;
  const maxLatency = latencyHistory.length > 0 ? Math.max(...latencyHistory) : null;
  const [status, setStatus] = useState<string>('Idle');

  const getLatencyRating = (latency: number | null): string => {
    if (latency === null) return '';
    if (latency <= 50) return '🟢 Excellent';
    if (latency <= 100) return '🟡 Good';
    if (latency <= 200) return '🟠 Fair';
    return '🔴 Poor';
  };

  





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
      await new Promise((res) => setTimeout(res, 100)); // simulate delay
      const isFailed = Math.random() < 0.2; // 20% simulated packet loss
      if (isFailed) failed++;
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
      <h2 style={{ marginBottom: '1rem' }}>Dashboard</h2>

      <SectionCard>
        <LatencyControls
          latency={latency}
          loading={loading}
          autoPing={autoPing}
          testLatency={testLatency}
          toggleAutoPing={() => setAutoPing(prev => !prev)}
          getLatencyRating={getLatencyRating}
        />
      </SectionCard>

      {latencyHistory.length > 0 && (
        <SectionCard>
          <LatencyChart
            latencyHistory={latencyHistory}
            exportToCSV={exportToCSV}
            avgLatency={avgLatency}
            minLatency={minLatency}
            maxLatency={maxLatency}
          />
        </SectionCard>
      )}


      <SectionCard>
        <PacketLossSimulator
          packetLossResult={packetLossResult}
          simulatePacketLoss={simulatePacketLoss}
        />
      </SectionCard>

      <SectionCard>
        <DNSSpeedTest
          dnsTime={dnsTime}
          testDNSSpeed={testDNSSpeed}
        />
      </SectionCard>

      
    </div>
  );
};

export default LatencyTester;

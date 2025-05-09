import React from 'react';
import './LatencyControls.css';

interface LatencyControlsProps {
  latency: number | null;
  loading: boolean;
  autoPing: boolean;
  testLatency: () => void;
  toggleAutoPing: () => void;
  getLatencyRating: (latency: number | null) => string;
}

const LatencyControls: React.FC<LatencyControlsProps> = ({
  latency,
  loading,
  autoPing,
  testLatency,
  toggleAutoPing,
  getLatencyRating
}) => {
  return (
    <div className="latency-controls">
      <h3>Latency Tester</h3>
      <button className="latency-button btn-primary" onClick={testLatency} disabled={loading}>
        {loading ? 'Testing...' : 'Test Latency'}
      </button>
      {latency !== null && (
        <p style={{ marginTop: '0.5rem' }}>
          Latency: {latency} ms — <span>{getLatencyRating(latency)}</span>
        </p>
      )}
      <div className="auto-ping-toggle">
        <h4>Auto-Ping Mode</h4>
        <button className='btn-primary' onClick={toggleAutoPing}>
          {autoPing ? '🛑 Stop Auto-Ping' : '▶️ Start Auto-Ping'}
        </button>
      </div>
    </div>
  );
};

export default LatencyControls;

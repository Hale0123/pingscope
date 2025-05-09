import React from 'react';
import LatencyTester from './Components/LatencyTester';
import './App.css';

const App: React.FC = () => {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'Segoe UI, Roboto, sans-serif',
      color: '#333',
    }}>
      <LatencyTester />
    </div>

  );
};

export default App;

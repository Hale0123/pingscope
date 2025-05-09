import React from 'react';
import './DNSSpeedTest.css';

interface DNSSpeedTestProps {
  dnsTime: number | null;
  testDNSSpeed: () => void;
}

const DNSSpeedTest: React.FC<DNSSpeedTestProps> = ({
  dnsTime,
  testDNSSpeed,
}) => {
  return (
    <div className="dns-speed-section">
      <h3>DNS Speed Test</h3>
      <button className="dns-test-button btn-primary" onClick={testDNSSpeed}>
        Test DNS Speed
      </button>
      {dnsTime !== null && (
        <p>DNS Resolution Time: {dnsTime} ms</p>
      )}
    </div>
  );
};

export default DNSSpeedTest;

import React from 'react';
import './PacketLossSimulator.css';

interface PacketLossSimulatorProps {
  packetLossResult: string | null;
  simulatePacketLoss: (url: string, attempts?: number) => void;
}

const PacketLossSimulator: React.FC<PacketLossSimulatorProps> = ({
  packetLossResult,
  simulatePacketLoss,
}) => {
  return (
    <div className="packet-loss-section">
      <h3>Packet Loss Simulator</h3>
      <button
        className="packet-loss-button btn-primary"
        onClick={() =>
          simulatePacketLoss('https://jsonplaceholder.typicode.com/posts/1')
        }
      >
        Simulate Packet Loss
      </button>
      {packetLossResult && <p>{packetLossResult}</p>}
    </div>
  );
};

export default PacketLossSimulator;

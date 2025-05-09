import React from 'react';
import './SectionCard.css';

interface SectionCardProps {
  children: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ children }) => {
  return <div className="section-card">{children}</div>;
};

export default SectionCard;

import React from 'react';
import './ScrollIndicator.css';

const ScrollIndicator: React.FC = () => {
  return (
    <div className="scroll-indicator">
      <span className="scroll-text">scroll down</span>
      <div className="scroll-arrow">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default ScrollIndicator;
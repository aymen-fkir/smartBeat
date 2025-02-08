import React from 'react';

export const VestVisualization: React.FC = () => {
  return (
    <svg viewBox="0 0 300 400" className="w-full max-w-md mx-auto">
      <path
        d="M50,100 Q150,50 250,100 L250,300 L200,350 L100,350 L50,300 Z"
        fill="none"
        stroke="black"
        strokeWidth="2"
      />
      {/* ECG Sensors */}
      <circle cx="120" cy="150" r="5" fill="blue" />
      <circle cx="180" cy="150" r="5" fill="blue" />
      <circle cx="120" cy="180" r="5" fill="blue" />
      <circle cx="180" cy="180" r="5" fill="blue" />
      
      {/* Processing Unit */}
      <rect x="135" y="240" width="30" height="15" fill="red" />
      
      {/* Batteries */}
      <rect x="80" y="270" width="20" height="20" fill="yellow" />
      <rect x="200" y="270" width="20" height="20" fill="yellow" />
      
      {/* Legend */}
      <g transform="translate(50, 380)">
        <text x="0" y="0" fontSize="12">● ECG Sensors</text>
        <text x="200" y="0" fontSize="12">■ Processing Unit</text>
      </g>
    </svg>
  );
};


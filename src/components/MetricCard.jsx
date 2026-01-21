import React from 'react';

const MetricCard = ({ title, value, color }) => (
  <div className="metric-card" style={{ borderTop: `4px solid ${color}` }}>
    <h3>{title}</h3>
    <div className="metric-value" style={{ color: color }}>{value}</div>
  </div>
);

export default MetricCard;
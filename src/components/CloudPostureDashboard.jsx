import React, { useState, useMemo } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import MetricCard from './MetricCard';
import FixModal from './FixModal';
import { INITIAL_DATA } from '../data/securityFindings';

const COLORS = { Critical: '#ef4444', High: '#f59e0b', Medium: '#fbbf24', Low: '#10b981' };

export default function CloudPostureDashboard() {
  const [data, setData] = useState(INITIAL_DATA);
  const [filterSeverity, setFilterSeverity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [selectedItem, setSelectedItem] = useState(null);
  const [isFixing, setIsFixing] = useState(false);

  // Filtering Logic
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSeverity = filterSeverity === 'All' || item.severity === filterSeverity;
      const matchesSearch = item.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.account.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSeverity && matchesSearch;
    });
  }, [filterSeverity, searchQuery, data]);

  // Chart Data Preparation
  const severityChartData = useMemo(() => {
    const counts = {};
    filteredData.forEach(item => {
      counts[item.severity] = (counts[item.severity] || 0) + 1;
    });
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  }, [filteredData]);

  const serviceChartData = useMemo(() => {
    const counts = {};
    filteredData.forEach(item => {
      counts[item.service] = (counts[item.service] || 0) + 1;
    });
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  }, [filteredData]);

  // Handlers
  const handleFixClick = (item) => {
    setSelectedItem(item);
  };

  const handleConfirmFix = () => {
    setIsFixing(true);
    setTimeout(() => {
      setData(prev => prev.filter(item => item.id !== selectedItem.id));
      setIsFixing(false);
      setSelectedItem(null);
    }, 1500);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-grid">

        {/* HEADER */}
        <header>
          <h1>Cloud Security Posture</h1>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--spacing-xs)' }}>Overview of misconfigurations across all accounts</p>
        </header>

        {/* METRICS */}
        <div className="metrics-container">
          <MetricCard title="Total Findings" value={filteredData.length} color="var(--color-text-primary)" />
          <MetricCard title="Critical Issues" value={filteredData.filter(i => i.severity === 'Critical').length} color="var(--color-danger)" />
          <MetricCard title="Accounts Monitored" value="3" color="var(--color-primary)" />
        </div>

        {/* CHARTS */}
        <div className="charts-container">
          <div className="chart-card">
            <h3>Findings by Severity</h3>
            <div style={{ flex: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={severityChartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {severityChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#8884d8'} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="chart-card">
            <h3>Findings by Service</h3>
            <div style={{ flex: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serviceChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                  <XAxis dataKey="name" tick={{ fill: 'var(--color-text-secondary)' }} axisLine={false} tickLine={false} />
                  <YAxis allowDecimals={false} tick={{ fill: 'var(--color-text-secondary)' }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: 'var(--color-background)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                  <Bar dataKey="value" fill="var(--color-primary)" barSize={40} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="controls-container">
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="control-select"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="control-search"
          />
        </div>

        {/* TABLE */}
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Severity</th>
                <th>Account</th>
                <th>Service</th>
                <th>Issue Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => (
                <tr key={row.id}>
                  <td>
                    <span style={{ color: COLORS[row.severity] || 'var(--color-text-primary)', fontWeight: 'bold' }}>{row.severity}</span>
                  </td>
                  <td>{row.account}</td>
                  <td>{row.service}</td>
                  <td>{row.issue}</td>
                  <td>
                    <button
                      onClick={() => handleFixClick(row)}
                      className="btn-primary"
                      style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                    >
                      Fix
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <FixModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onConfirm={handleConfirmFix}
          isFixing={isFixing}
        />
      </div>
    </div>
  );
}
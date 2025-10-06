import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';


const PerformanceChart = ({ data, className = '' }) => {
  const [chartType, setChartType] = useState('wpm');
  const [timeRange, setTimeRange] = useState('7d');

  const chartConfigs = {
    wpm: {
      title: 'Words Per Minute Progress',
      dataKey: 'wpm',
      color: '#2563EB',
      icon: 'Zap'
    },
    accuracy: {
      title: 'Accuracy Trends',
      dataKey: 'accuracy',
      color: '#059669',
      icon: 'Target'
    },
    distribution: {
      title: 'Performance Distribution',
      dataKey: 'count',
      color: '#D97706',
      icon: 'BarChart3'
    }
  };

  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '3 Months' },
    { value: '1y', label: '1 Year' }
  ];

  const currentConfig = chartConfigs?.[chartType];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-popover-foreground mb-1">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.name}: ${entry?.value}${chartType === 'accuracy' ? '%' : ''}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name={currentConfig?.icon} size={20} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">{currentConfig?.title}</h3>
        </div>

        <div className="flex items-center space-x-2">
          {/* Time Range Selector */}
          <div className="flex bg-muted rounded-lg p-1">
            {timeRanges?.map((range) => (
              <button
                key={range?.value}
                onClick={() => setTimeRange(range?.value)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors duration-200 ${
                  timeRange === range?.value
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {range?.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Chart Type Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted rounded-lg p-1">
        {Object.entries(chartConfigs)?.map(([key, config]) => (
          <button
            key={key}
            onClick={() => setChartType(key)}
            className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
              chartType === key
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={config?.icon} size={16} />
            <span className="hidden sm:inline">{config?.title?.split(' ')?.[0]}</span>
          </button>
        ))}
      </div>
      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'distribution' ? (
            <BarChart data={data?.distribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis
                dataKey="range"
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey={currentConfig?.dataKey}
                fill={currentConfig?.color}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          ) : (
            <LineChart data={data?.timeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis
                dataKey="date"
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey={currentConfig?.dataKey}
                stroke={currentConfig?.color}
                strokeWidth={3}
                dot={{ fill: currentConfig?.color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: currentConfig?.color, strokeWidth: 2 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
      {/* Chart Summary */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-sm text-muted-foreground">Best</p>
            <p className="text-lg font-semibold text-foreground">
              {chartType === 'wpm' ? '87 WPM' : chartType === 'accuracy' ? '98%' : '12 tests'}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Average</p>
            <p className="text-lg font-semibold text-foreground">
              {chartType === 'wpm' ? '72 WPM' : chartType === 'accuracy' ? '94%' : '8 tests'}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Trend</p>
            <div className="flex items-center justify-center space-x-1">
              <Icon name="TrendingUp" size={16} className="text-success" />
              <p className="text-lg font-semibold text-success">+12%</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Goal</p>
            <p className="text-lg font-semibold text-accent">
              {chartType === 'wpm' ? '80 WPM' : chartType === 'accuracy' ? '95%' : '100 tests'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
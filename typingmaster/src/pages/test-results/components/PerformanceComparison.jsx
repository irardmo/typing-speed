import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const PerformanceComparison = ({
  currentResults = {},
  historicalData = [],
  personalBests = {},
  className = ''
}) => {
  // Mock current results
  const mockCurrentResults = {
    wpm: currentResults?.wpm || 65,
    accuracy: currentResults?.accuracy || 94.5,
    testDate: currentResults?.testDate || new Date()?.toISOString(),
    ...currentResults
  };

  // Mock historical data for the last 10 tests
  const mockHistoricalData = historicalData?.length > 0 ? historicalData : [
    { test: 1, wpm: 45, accuracy: 89.2, date: '2025-01-06' },
    { test: 2, wpm: 48, accuracy: 91.1, date: '2025-01-07' },
    { test: 3, wpm: 52, accuracy: 88.7, date: '2025-01-08' },
    { test: 4, wpm: 49, accuracy: 92.3, date: '2025-01-09' },
    { test: 5, wpm: 55, accuracy: 90.8, date: '2025-01-10' },
    { test: 6, wpm: 58, accuracy: 93.1, date: '2025-01-11' },
    { test: 7, wpm: 61, accuracy: 91.9, date: '2025-01-12' },
    { test: 8, wpm: 59, accuracy: 94.2, date: '2025-01-13' },
    { test: 9, wpm: 63, accuracy: 92.7, date: '2025-01-14' },
    { test: 10, wpm: 65, accuracy: 94.5, date: '2025-01-15' }
  ];

  // Mock personal bests
  const mockPersonalBests = {
    wpm: personalBests?.wpm || 68,
    accuracy: personalBests?.accuracy || 96.2,
    ...personalBests
  };

  // Calculate improvements
  const previousTest = mockHistoricalData?.[mockHistoricalData?.length - 2];
  const wpmImprovement = previousTest ? mockCurrentResults?.wpm - previousTest?.wpm : 0;
  const accuracyImprovement = previousTest ? mockCurrentResults?.accuracy - previousTest?.accuracy : 0;

  // Calculate averages
  const averageWPM = mockHistoricalData?.reduce((sum, test) => sum + test?.wpm, 0) / mockHistoricalData?.length;
  const averageAccuracy = mockHistoricalData?.reduce((sum, test) => sum + test?.accuracy, 0) / mockHistoricalData?.length;

  const comparisonStats = [
    {
      label: 'vs Previous Test',
      wpmChange: wpmImprovement,
      accuracyChange: accuracyImprovement,
      icon: wpmImprovement >= 0 ? 'TrendingUp' : 'TrendingDown',
      color: wpmImprovement >= 0 ? 'text-success' : 'text-error'
    },
    {
      label: 'vs Personal Best',
      wpmChange: mockCurrentResults?.wpm - mockPersonalBests?.wpm,
      accuracyChange: mockCurrentResults?.accuracy - mockPersonalBests?.accuracy,
      icon: mockCurrentResults?.wpm >= mockPersonalBests?.wpm ? 'Trophy' : 'Target',
      color: mockCurrentResults?.wpm >= mockPersonalBests?.wpm ? 'text-success' : 'text-warning'
    },
    {
      label: 'vs Average',
      wpmChange: mockCurrentResults?.wpm - averageWPM,
      accuracyChange: mockCurrentResults?.accuracy - averageAccuracy,
      icon: mockCurrentResults?.wpm >= averageWPM ? 'TrendingUp' : 'TrendingDown',
      color: mockCurrentResults?.wpm >= averageWPM ? 'text-success' : 'text-error'
    }
  ];

  const formatChange = (value, suffix = '') => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value?.toFixed(1)}${suffix}`;
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="TrendingUp" size={20} className="text-primary" />
        <h2 className="text-lg font-heading font-semibold text-foreground">
          Performance Comparison
        </h2>
      </div>
      <div className="space-y-8">
        {/* Comparison Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {comparisonStats?.map((stat, index) => (
            <div key={index} className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-muted-foreground">{stat?.label}</span>
                <Icon name={stat?.icon} size={16} className={stat?.color} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">WPM</span>
                  <span className={`text-sm font-data font-semibold ${stat?.color}`}>
                    {formatChange(stat?.wpmChange)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Accuracy</span>
                  <span className={`text-sm font-data font-semibold ${stat?.color}`}>
                    {formatChange(stat?.accuracyChange, '%')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Chart */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
            Progress Over Time
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockHistoricalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis
                  dataKey="test"
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="wpm"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                  name="WPM"
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="var(--color-accent)"
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
                  name="Accuracy %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Benchmarks */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
            Performance Benchmarks
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Target" size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">Current</span>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-data font-bold text-primary">
                  {mockCurrentResults?.wpm} WPM
                </div>
                <div className="text-sm text-muted-foreground">
                  {mockCurrentResults?.accuracy}% accuracy
                </div>
              </div>
            </div>

            <div className="p-4 bg-success/5 rounded-lg border border-success/20">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Trophy" size={16} className="text-success" />
                <span className="text-sm font-medium text-foreground">Personal Best</span>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-data font-bold text-success">
                  {mockPersonalBests?.wpm} WPM
                </div>
                <div className="text-sm text-muted-foreground">
                  {mockPersonalBests?.accuracy}% accuracy
                </div>
              </div>
            </div>

            <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="BarChart3" size={16} className="text-accent" />
                <span className="text-sm font-medium text-foreground">Average</span>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-data font-bold text-accent">
                  {Math.round(averageWPM)} WPM
                </div>
                <div className="text-sm text-muted-foreground">
                  {averageAccuracy?.toFixed(1)}% accuracy
                </div>
              </div>
            </div>

            <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/20">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Users" size={16} className="text-secondary" />
                <span className="text-sm font-medium text-foreground">Global Avg</span>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-data font-bold text-secondary">
                  42 WPM
                </div>
                <div className="text-sm text-muted-foreground">
                  88.5% accuracy
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceComparison;
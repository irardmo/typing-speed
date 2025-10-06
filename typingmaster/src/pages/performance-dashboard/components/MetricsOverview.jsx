import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsOverview = ({ metrics, className = '' }) => {
  const metricCards = [
    {
      id: 'wpm',
      title: 'Average WPM',
      value: metrics?.averageWPM,
      change: metrics?.wpmChange,
      icon: 'Zap',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      id: 'accuracy',
      title: 'Overall Accuracy',
      value: `${metrics?.overallAccuracy}%`,
      change: metrics?.accuracyChange,
      icon: 'Target',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'tests',
      title: 'Tests Completed',
      value: metrics?.testsCompleted,
      change: metrics?.testsChange,
      icon: 'FileText',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'improvement',
      title: 'Improvement',
      value: `${metrics?.improvement}%`,
      change: metrics?.improvementChange,
      icon: 'TrendingUp',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  const getChangeColor = (change) => {
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = (change) => {
    if (change > 0) return 'ArrowUp';
    if (change < 0) return 'ArrowDown';
    return 'Minus';
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {metricCards?.map((metric) => (
        <div
          key={metric?.id}
          className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${metric?.bgColor}`}>
              <Icon name={metric?.icon} size={24} className={metric?.color} />
            </div>
            <div className="flex items-center space-x-1">
              <Icon
                name={getChangeIcon(metric?.change)}
                size={16}
                className={getChangeColor(metric?.change)}
              />
              <span className={`text-sm font-medium ${getChangeColor(metric?.change)}`}>
                {Math.abs(metric?.change)}%
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-foreground">{metric?.value}</h3>
            <p className="text-sm text-muted-foreground">{metric?.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsOverview;
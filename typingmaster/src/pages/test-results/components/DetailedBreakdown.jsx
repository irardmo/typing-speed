import React from 'react';
import Icon from '../../../components/AppIcon';

const DetailedBreakdown = ({
  totalKeystrokes = 0,
  correctKeystrokes = 0,
  incorrectKeystrokes = 0,
  wordsTyped = 0,
  charactersTyped = 0,
  backspaces = 0,
  testDuration = 60,
  className = ''
}) => {
  const errorRate = totalKeystrokes > 0 ? ((incorrectKeystrokes / totalKeystrokes) * 100)?.toFixed(1) : 0;
  const keystrokesPerMinute = totalKeystrokes > 0 ? Math.round((totalKeystrokes / testDuration) * 60) : 0;
  const averageWordLength = wordsTyped > 0 ? (charactersTyped / wordsTyped)?.toFixed(1) : 0;

  const stats = [
    {
      icon: 'Type',
      label: 'Total Keystrokes',
      value: totalKeystrokes?.toLocaleString(),
      description: 'All key presses including corrections',
      color: 'text-foreground'
    },
    {
      icon: 'CheckCircle',
      label: 'Correct Keystrokes',
      value: correctKeystrokes?.toLocaleString(),
      description: 'Accurate character inputs',
      color: 'text-success'
    },
    {
      icon: 'XCircle',
      label: 'Incorrect Keystrokes',
      value: incorrectKeystrokes?.toLocaleString(),
      description: 'Typing errors made',
      color: 'text-error'
    },
    {
      icon: 'FileText',
      label: 'Words Typed',
      value: wordsTyped?.toLocaleString(),
      description: 'Complete words entered',
      color: 'text-accent'
    },
    {
      icon: 'Hash',
      label: 'Characters Typed',
      value: charactersTyped?.toLocaleString(),
      description: 'Total characters including spaces',
      color: 'text-primary'
    },
    {
      icon: 'Delete',
      label: 'Backspaces Used',
      value: backspaces?.toLocaleString(),
      description: 'Correction attempts',
      color: 'text-warning'
    }
  ];

  const calculatedMetrics = [
    {
      icon: 'TrendingDown',
      label: 'Error Rate',
      value: `${errorRate}%`,
      description: 'Percentage of incorrect keystrokes',
      color: errorRate < 5 ? 'text-success' : errorRate < 10 ? 'text-warning' : 'text-error'
    },
    {
      icon: 'Activity',
      label: 'Keystrokes/Min',
      value: keystrokesPerMinute?.toLocaleString(),
      description: 'Raw typing speed measurement',
      color: 'text-secondary'
    },
    {
      icon: 'BarChart3',
      label: 'Avg Word Length',
      value: `${averageWordLength} chars`,
      description: 'Average characters per word',
      color: 'text-muted-foreground'
    }
  ];

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="BarChart3" size={20} className="text-primary" />
        <h2 className="text-lg font-heading font-semibold text-foreground">
          Detailed Breakdown
        </h2>
      </div>
      {/* Raw Statistics */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
          Raw Statistics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats?.map((stat, index) => (
            <div key={index} className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Icon name={stat?.icon} size={20} className={stat?.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-lg font-data font-semibold ${stat?.color}`}>
                    {stat?.value}
                  </div>
                  <div className="text-sm font-medium text-foreground mb-1">
                    {stat?.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat?.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Calculated Metrics */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
          Calculated Metrics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {calculatedMetrics?.map((metric, index) => (
            <div key={index} className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Icon name={metric?.icon} size={20} className={metric?.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-lg font-data font-semibold ${metric?.color}`}>
                    {metric?.value}
                  </div>
                  <div className="text-sm font-medium text-foreground mb-1">
                    {metric?.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {metric?.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* WPM Calculation Explanation */}
      <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-sm text-foreground">
            <span className="font-medium">WPM Calculation:</span> Words Per Minute is calculated as
            (Total Characters ÷ 5) ÷ (Time in Minutes). The standard word length of 5 characters
            includes spaces and punctuation for consistent measurement across different text types.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedBreakdown;
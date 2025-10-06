import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceComparison = ({ userStats, communityStats, className = '' }) => {
  const [comparisonType, setComparisonType] = useState('global');

  const comparisonTypes = [
    { value: 'global', label: 'Global', icon: 'Globe' },
    { value: 'country', label: 'Country', icon: 'MapPin' },
    { value: 'age', label: 'Age Group', icon: 'Users' },
    { value: 'experience', label: 'Experience', icon: 'TrendingUp' }
  ];

  const getPercentileColor = (percentile) => {
    if (percentile >= 90) return 'text-success';
    if (percentile >= 75) return 'text-accent';
    if (percentile >= 50) return 'text-warning';
    return 'text-muted-foreground';
  };

  const getPercentileIcon = (percentile) => {
    if (percentile >= 90) return 'Trophy';
    if (percentile >= 75) return 'Award';
    if (percentile >= 50) return 'TrendingUp';
    return 'BarChart3';
  };

  const getComparisonData = () => {
    switch (comparisonType) {
      case 'global':
        return communityStats?.global;
      case 'country':
        return communityStats?.country;
      case 'age':
        return communityStats?.ageGroup;
      case 'experience':
        return communityStats?.experience;
      default:
        return communityStats?.global;
    }
  };

  const currentData = getComparisonData();

  const comparisonMetrics = [
    {
      id: 'wpm',
      title: 'Words Per Minute',
      userValue: userStats?.averageWPM,
      communityAverage: currentData?.averageWPM,
      percentile: currentData?.wpmPercentile,
      icon: 'Zap',
      unit: 'WPM'
    },
    {
      id: 'accuracy',
      title: 'Accuracy Rate',
      userValue: userStats?.averageAccuracy,
      communityAverage: currentData?.averageAccuracy,
      percentile: currentData?.accuracyPercentile,
      icon: 'Target',
      unit: '%'
    },
    {
      id: 'consistency',
      title: 'Consistency Score',
      userValue: userStats?.consistencyScore,
      communityAverage: currentData?.averageConsistency,
      percentile: currentData?.consistencyPercentile,
      icon: 'Activity',
      unit: ''
    },
    {
      id: 'improvement',
      title: 'Improvement Rate',
      userValue: userStats?.improvementRate,
      communityAverage: currentData?.averageImprovement,
      percentile: currentData?.improvementPercentile,
      icon: 'TrendingUp',
      unit: '%'
    }
  ];

  const getDifferenceText = (userValue, communityValue, unit) => {
    const difference = userValue - communityValue;
    const isPositive = difference > 0;
    const absValue = Math.abs(difference);

    return {
      text: `${isPositive ? '+' : '-'}${absValue}${unit}`,
      color: isPositive ? 'text-success' : 'text-error',
      icon: isPositive ? 'ArrowUp' : 'ArrowDown'
    };
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="BarChart3" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Performance Comparison</h3>
            <p className="text-sm text-muted-foreground">
              See how you rank against other typists
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          iconName="RefreshCw"
          iconPosition="left"
        >
          Update
        </Button>
      </div>
      {/* Comparison Type Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {comparisonTypes?.map((type) => (
          <button
            key={type?.value}
            onClick={() => setComparisonType(type?.value)}
            className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
              comparisonType === type?.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
            }`}
          >
            <Icon name={type?.icon} size={16} />
            <span>{type?.label}</span>
          </button>
        ))}
      </div>
      {/* Comparison Metrics */}
      <div className="space-y-4">
        {comparisonMetrics?.map((metric) => {
          const difference = getDifferenceText(metric?.userValue, metric?.communityAverage, metric?.unit);

          return (
            <div key={metric?.id} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Icon name={metric?.icon} size={20} className="text-muted-foreground" />
                  <h4 className="font-medium text-foreground">{metric?.title}</h4>
                </div>

                <div className="flex items-center space-x-2">
                  <Icon
                    name={getPercentileIcon(metric?.percentile)}
                    size={16}
                    className={getPercentileColor(metric?.percentile)}
                  />
                  <span className={`text-sm font-medium ${getPercentileColor(metric?.percentile)}`}>
                    {metric?.percentile}th percentile
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Your Score</p>
                  <p className="text-lg font-bold text-foreground">
                    {metric?.userValue}{metric?.unit}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Community Avg</p>
                  <p className="text-lg font-bold text-muted-foreground">
                    {metric?.communityAverage}{metric?.unit}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Difference</p>
                  <div className="flex items-center justify-center space-x-1">
                    <Icon name={difference?.icon} size={16} className={difference?.color} />
                    <p className={`text-lg font-bold ${difference?.color}`}>
                      {difference?.text}
                    </p>
                  </div>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="mt-3">
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      metric?.percentile >= 90 ? 'bg-success' :
                      metric?.percentile >= 75 ? 'bg-accent' :
                      metric?.percentile >= 50 ? 'bg-warning' : 'bg-muted-foreground'
                    }`}
                    style={{ width: `${metric?.percentile}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Overall Ranking */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Trophy" size={24} className="text-warning" />
            <h4 className="text-xl font-bold text-foreground">
              Overall Rank: #{currentData?.overallRank}
            </h4>
          </div>
          <p className="text-muted-foreground">
            Out of {currentData?.totalUsers?.toLocaleString()} active typists in {comparisonType} category
          </p>

          <div className="flex items-center justify-center space-x-4 mt-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Better than</p>
              <p className="text-lg font-bold text-success">
                {Math.round((currentData?.totalUsers - currentData?.overallRank) / currentData?.totalUsers * 100)}%
              </p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Top</p>
              <p className="text-lg font-bold text-accent">
                {Math.round(currentData?.overallRank / currentData?.totalUsers * 100)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceComparison;
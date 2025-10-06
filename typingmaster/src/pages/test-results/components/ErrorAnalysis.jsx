import React from 'react';
import Icon from '../../../components/AppIcon';

const ErrorAnalysis = ({
  commonErrors = [],
  missedCharacters = [],
  errorPatterns = [],
  className = ''
}) => {
  // Mock data for demonstration
  const mockCommonErrors = commonErrors?.length > 0 ? commonErrors : [
    { character: 'a', errors: 12, frequency: 8.5 },
    { character: 's', errors: 9, frequency: 6.2 },
    { character: 'e', errors: 8, frequency: 5.8 },
    { character: 'r', errors: 7, frequency: 4.9 },
    { character: 't', errors: 6, frequency: 4.1 },
    { character: 'i', errors: 5, frequency: 3.6 },
    { character: 'o', errors: 4, frequency: 2.8 },
    { character: 'n', errors: 3, frequency: 2.1 }
  ];

  const mockMissedCharacters = missedCharacters?.length > 0 ? missedCharacters : [
    { intended: 'q', typed: 'w', count: 5 },
    { intended: 'p', typed: 'o', count: 4 },
    { intended: 'l', typed: 'k', count: 3 },
    { intended: 'z', typed: 'x', count: 3 },
    { intended: 'm', typed: 'n', count: 2 }
  ];

  const mockErrorPatterns = errorPatterns?.length > 0 ? errorPatterns : [
    { pattern: 'Double letters', description: 'Typing same character twice', count: 8, example: 'tthe → the' },
    { pattern: 'Adjacent keys', description: 'Hitting neighboring keys', count: 15, example: 'teh → the' },
    { pattern: 'Finger confusion', description: 'Wrong finger placement', count: 6, example: 'adn → and' },
    { pattern: 'Speed errors', description: 'Mistakes from typing too fast', count: 12, example: 'hte → the' }
  ];

  const getErrorIntensity = (frequency) => {
    if (frequency >= 7) return 'bg-error text-error-foreground';
    if (frequency >= 5) return 'bg-warning text-warning-foreground';
    if (frequency >= 3) return 'bg-accent text-accent-foreground';
    return 'bg-muted text-muted-foreground';
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="AlertTriangle" size={20} className="text-warning" />
        <h2 className="text-lg font-heading font-semibold text-foreground">
          Error Analysis
        </h2>
      </div>
      <div className="space-y-8">
        {/* Character Error Heatmap */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
            Most Problematic Characters
          </h3>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {mockCommonErrors?.map((error, index) => (
              <div
                key={index}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center text-center p-2 ${getErrorIntensity(error?.frequency)}`}
                title={`${error?.errors} errors (${error?.frequency}% error rate)`}
              >
                <div className="text-lg font-data font-bold">
                  {error?.character?.toUpperCase()}
                </div>
                <div className="text-xs opacity-80">
                  {error?.errors}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
            <span>Less errors</span>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-muted rounded"></div>
              <div className="w-3 h-3 bg-accent rounded"></div>
              <div className="w-3 h-3 bg-warning rounded"></div>
              <div className="w-3 h-3 bg-error rounded"></div>
            </div>
            <span>More errors</span>
          </div>
        </div>

        {/* Common Substitutions */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
            Common Character Substitutions
          </h3>
          <div className="space-y-2">
            {mockMissedCharacters?.map((miss, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Intended:</span>
                    <span className="font-data font-semibold text-success bg-success/10 px-2 py-1 rounded">
                      {miss?.intended}
                    </span>
                  </div>
                  <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Typed:</span>
                    <span className="font-data font-semibold text-error bg-error/10 px-2 py-1 rounded">
                      {miss?.typed}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {miss?.count} time{miss?.count !== 1 ? 's' : ''}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Error Patterns */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
            Error Patterns
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mockErrorPatterns?.map((pattern, index) => (
              <div key={index} className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-foreground">{pattern?.pattern}</h4>
                  <span className="text-sm font-data font-semibold text-error bg-error/10 px-2 py-1 rounded">
                    {pattern?.count}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {pattern?.description}
                </p>
                <div className="text-xs text-muted-foreground font-data">
                  Example: <span className="text-error">{pattern?.example?.split(' → ')?.[0]}</span>
                  {' → '}
                  <span className="text-success">{pattern?.example?.split(' → ')?.[1]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Improvement Tips */}
        <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
          <div className="flex items-start space-x-2">
            <Icon name="Lightbulb" size={16} className="text-accent mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-foreground mb-2">Improvement Tips</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Focus on accuracy over speed - slow down for problematic characters</li>
                <li>• Practice finger placement exercises for frequently missed keys</li>
                <li>• Use typing games to improve muscle memory for common patterns</li>
                <li>• Take breaks to prevent fatigue-related errors</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorAnalysis;
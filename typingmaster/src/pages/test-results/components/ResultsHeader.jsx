import React from 'react';
import Icon from '../../../components/AppIcon';

const ResultsHeader = ({
  wpm,
  accuracy,
  testDuration,
  testType = 'Standard',
  isPersonalBest = false,
  className = ''
}) => {
  const getWPMRating = (wpm) => {
    if (wpm >= 80) return { label: 'Excellent', color: 'text-success', bgColor: 'bg-success/10' };
    if (wpm >= 60) return { label: 'Good', color: 'text-accent', bgColor: 'bg-accent/10' };
    if (wpm >= 40) return { label: 'Average', color: 'text-warning', bgColor: 'bg-warning/10' };
    return { label: 'Needs Practice', color: 'text-error', bgColor: 'bg-error/10' };
  };

  const getAccuracyRating = (accuracy) => {
    if (accuracy >= 98) return { label: 'Perfect', color: 'text-success' };
    if (accuracy >= 95) return { label: 'Excellent', color: 'text-success' };
    if (accuracy >= 90) return { label: 'Good', color: 'text-accent' };
    if (accuracy >= 85) return { label: 'Fair', color: 'text-warning' };
    return { label: 'Needs Work', color: 'text-error' };
  };

  const wpmRating = getWPMRating(wpm);
  const accuracyRating = getAccuracyRating(accuracy);

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      {/* Header with test info */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-foreground mb-1">
            Test Results
          </h1>
          <p className="text-muted-foreground">
            {testType} Test • {testDuration} minute{testDuration !== 1 ? 's' : ''}
          </p>
        </div>
        {isPersonalBest && (
          <div className="flex items-center space-x-2 bg-success/10 text-success px-3 py-1 rounded-full">
            <Icon name="Trophy" size={16} />
            <span className="text-sm font-medium">Personal Best!</span>
          </div>
        )}
      </div>
      {/* Main metrics grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* WPM Score */}
        <div className="text-center">
          <div className="relative mb-3">
            <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-data font-bold text-primary">{wpm}</div>
                <div className="text-xs text-muted-foreground">WPM</div>
              </div>
            </div>
          </div>
          <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${wpmRating?.bgColor} ${wpmRating?.color}`}>
            <Icon name="Zap" size={12} />
            <span>{wpmRating?.label}</span>
          </div>
        </div>

        {/* Accuracy Score */}
        <div className="text-center">
          <div className="relative mb-3">
            <div className="w-24 h-24 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-data font-bold text-accent">{accuracy}%</div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </div>
            </div>
          </div>
          <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-accent/10 ${accuracyRating?.color}`}>
            <Icon name="Target" size={12} />
            <span>{accuracyRating?.label}</span>
          </div>
        </div>

        {/* Test Duration */}
        <div className="text-center">
          <div className="relative mb-3">
            <div className="w-24 h-24 mx-auto rounded-full bg-secondary/10 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-data font-bold text-secondary">{testDuration}:00</div>
                <div className="text-xs text-muted-foreground">Duration</div>
              </div>
            </div>
          </div>
          <div className="inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
            <Icon name="Clock" size={12} />
            <span>Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsHeader;
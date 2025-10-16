import React from 'react';
import Icon from '../../../components/AppIcon';

const LiveMetrics = ({
  wpm = 0,
  accuracy = 100,
  timeRemaining = 0,
  wordsTyped = 0,
  totalKeystrokes = 0,
  correctKeystrokes = 0,
  className = '',
  testCompleted = false,
  timeCompleted = 0,
  totalWords = 0,
  testDuration = 60,
}) => {
  const calculateFinalScore = () => {
    if (!testCompleted) return 0;

    // 1. WPM Score (25%) - Based on a 30 WPM target
    const wpmScore = Math.min((wpm / 30) * 100, 100);

    // 2. Accuracy Score (25%)
    const accuracyScore = accuracy;

    // 3. Completion Score (25%)
    const completionScore = totalWords > 0 ? (wordsTyped / totalWords) * 100 : 0;

    // 4. Time Bonus (25%) - Scaled by accuracy
    const timeBonus =
      timeCompleted > 0 && timeCompleted < testDuration
        ? (((testDuration - timeCompleted) / testDuration) * 100) * (accuracy / 100)
        : 0;

    let finalScore = Math.round(
      wpmScore * 0.25 +
        accuracyScore * 0.25 +
        completionScore * 0.25 +
        timeBonus * 0.25
    );

    // Penalty for not finishing
    if (timeRemaining <= 0 && wordsTyped < totalWords) {
      const wordsMissed = totalWords - wordsTyped;
      const penalty = (wordsMissed / totalWords) * 25; // Penalty up to 25 points
      finalScore = Math.max(0, finalScore - penalty);
    }

    return Math.round(finalScore);
  };

  const finalScore = calculateFinalScore();

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getWPMColor = () => {
    if (wpm >= 60) return 'text-success';
    if (wpm >= 40) return 'text-accent';
    if (wpm >= 20) return 'text-warning';
    return 'text-muted-foreground';
  };

  const getAccuracyColor = () => {
    if (accuracy >= 95) return 'text-success';
    if (accuracy >= 85) return 'text-warning';
    return 'text-error';
  };

  const getTimeColor = () => {
    if (timeRemaining <= 10) return 'text-error';
    if (timeRemaining <= 30) return 'text-warning';
    return 'text-foreground';
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          {testCompleted ? 'Final Results' : 'Live Metrics'}
        </h2>
        <Icon name="Activity" size={20} className="text-muted-foreground" />
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        {/* Words Per Minute */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Icon name="Zap" size={20} className="text-muted-foreground mr-2" />
            <span className="text-sm font-medium text-muted-foreground">WPM</span>
          </div>
          <div className={`text-3xl font-data font-bold ${getWPMColor()}`}>
            {wpm}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Words/Minute
          </div>
        </div>

        {/* Accuracy */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Icon name="Target" size={20} className="text-muted-foreground mr-2" />
            <span className="text-sm font-medium text-muted-foreground">Accuracy</span>
          </div>
          <div className={`text-3xl font-data font-bold ${getAccuracyColor()}`}>
            {accuracy}%
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Correct Rate
          </div>
        </div>

        {/* Time Remaining */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Icon name="Clock" size={20} className="text-muted-foreground mr-2" />
            <span className="text-sm font-medium text-muted-foreground">Time</span>
          </div>
          <div className={`text-3xl font-data font-bold ${getTimeColor()}`}>
            {formatTime(timeRemaining)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Remaining
          </div>
        </div>

        {/* Words Typed */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Icon name="Type" size={20} className="text-muted-foreground mr-2" />
            <span className="text-sm font-medium text-muted-foreground">Words</span>
          </div>
          <div className="text-3xl font-data font-bold text-foreground">
            {wordsTyped}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Completed
          </div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Hash" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Total Keystrokes</span>
          </div>
          <span className="text-sm font-data font-medium text-foreground">
            {totalKeystrokes}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Correct Keys</span>
          </div>
          <span className="text-sm font-data font-medium text-success">
            {correctKeystrokes}
          </span>
        </div>
      </div>

      {/* Final Score - Conditionally Rendered */}
      {testCompleted && (
        <div className="text-center mt-6 pt-6 border-t border-border">
          <div className="flex items-center justify-center mb-2">
            <Icon name="Award" size={24} className="text-muted-foreground mr-2" />
            <span className="text-lg font-medium text-muted-foreground">Final Score</span>
          </div>
          <div className="text-5xl font-data font-bold text-primary">
            {finalScore}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Performance Grade
          </div>
        </div>
      )}

      {/* Progress Indicators */}
      {!testCompleted && (
        <div className="mt-6 space-y-3">
          {/* Accuracy Progress Bar */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Accuracy Progress</span>
              <span className="text-xs font-data text-muted-foreground">{accuracy}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  accuracy >= 95
                    ? 'bg-success'
                    : accuracy >= 85
                    ? 'bg-warning'
                    : 'bg-error'
                }`}
                style={{ width: `${Math.min(accuracy, 100)}%` }}
              />
            </div>
          </div>

          {/* WPM Progress Bar (assuming target of 30 WPM) */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Speed Progress</span>
              <span className="text-xs font-data text-muted-foreground">{wpm} WPM</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  wpm >= 30
                    ? 'bg-success'
                    : wpm >= 15
                    ? 'bg-accent'
                    : 'bg-primary'
                }`}
                style={{ width: `${Math.min((wpm / 30) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveMetrics;
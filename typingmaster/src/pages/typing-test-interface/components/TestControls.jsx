import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TestControls = ({
  isTestActive,
  isPaused,
  onStart,
  onPause,
  onResume,
  onRestart,
  onStop,
  onViewResults,
  testCompleted = false,
  className = ''
}) => {
  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="PlayCircle" size={20} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Test Controls</span>
        </div>

        <div className="flex items-center space-x-2">
          {!isTestActive && !testCompleted && (
            <Button
              variant="default"
              size="sm"
              onClick={onStart}
              iconName="Play"
              iconPosition="left"
            >
              Start Test
            </Button>
          )}

          {isTestActive && !isPaused && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={onPause}
                iconName="Pause"
                iconPosition="left"
              >
                Pause
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={onStop}
                iconName="Square"
                iconPosition="left"
              >
                Stop
              </Button>
            </>
          )}

          {isTestActive && isPaused && (
            <>
              <Button
                variant="default"
                size="sm"
                onClick={onResume}
                iconName="Play"
                iconPosition="left"
              >
                Resume
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={onStop}
                iconName="Square"
                iconPosition="left"
              >
                Stop
              </Button>
            </>
          )}

          {testCompleted && (
            <>
              <Button
                variant="default"
                size="sm"
                onClick={onViewResults}
                iconName="BarChart3"
                iconPosition="left"
              >
                View Results
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={onRestart}
                iconName="RotateCcw"
                iconPosition="left"
              >
                New Test
              </Button>
            </>
          )}

          {(isTestActive || testCompleted) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRestart}
              iconName="RefreshCw"
              iconPosition="left"
            >
              Restart
            </Button>
          )}
        </div>
      </div>

      {/* Status Indicator */}
      <div className="mt-3 flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${
          testCompleted ? 'bg-success' : isTestActive && !isPaused ?'bg-primary animate-pulse': isPaused ?'bg-warning': 'bg-muted-foreground'
        }`} />
        <span className="text-xs text-muted-foreground">
          {testCompleted ? 'Test Completed' :
           isTestActive && !isPaused ? 'Test Active': isPaused ?'Test Paused': 'Ready to Start'}
        </span>
      </div>
    </div>
  );
};

export default TestControls;
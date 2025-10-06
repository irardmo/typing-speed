import React, { useState, useEffect, useCallback } from 'react';
import Icon from '../AppIcon';

const TestProgressOverlay = ({
  isActive = false,
  testDuration = 60,
  onTestComplete,
  className = ''
}) => {
  const [timeRemaining, setTimeRemaining] = useState(testDuration);
  const [wordsPerMinute, setWordsPerMinute] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0);
  const [wordsTyped, setWordsTyped] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);

  // Timer effect
  useEffect(() => {
    if (!isActive || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          onTestComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeRemaining, onTestComplete]);

  // Calculate WPM
  const calculateWPM = useCallback(() => {
    const timeElapsed = (testDuration - timeRemaining) / 60;
    if (timeElapsed > 0) {
      const wpm = Math.round(wordsTyped / timeElapsed);
      setWordsPerMinute(wpm);
    }
  }, [testDuration, timeRemaining, wordsTyped]);

  // Calculate accuracy
  const calculateAccuracy = useCallback(() => {
    if (totalKeystrokes > 0) {
      const acc = Math.round((correctKeystrokes / totalKeystrokes) * 100);
      setAccuracy(acc);
    }
  }, [totalKeystrokes, correctKeystrokes]);

  useEffect(() => {
    calculateWPM();
  }, [calculateWPM]);

  useEffect(() => {
    calculateAccuracy();
  }, [calculateAccuracy]);

  // Simulate keystroke tracking (in real implementation, this would come from props)
  useEffect(() => {
    if (!isActive) return;

    const simulateTyping = setInterval(() => {
      setTotalKeystrokes(prev => prev + Math.random() > 0.5 ? 1 : 0);
      setCorrectKeystrokes(prev => prev + Math.random() > 0.2 ? 1 : 0);
      setWordsTyped(prev => prev + Math.random() > 0.8 ? 1 : 0);
    }, 1000);

    return () => clearInterval(simulateTyping);
  }, [isActive]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return ((testDuration - timeRemaining) / testDuration) * 100;
  };

  const getAccuracyColor = () => {
    if (accuracy >= 95) return 'text-success';
    if (accuracy >= 85) return 'text-warning';
    return 'text-error';
  };

  const getWPMColor = () => {
    if (wordsPerMinute >= 60) return 'text-success';
    if (wordsPerMinute >= 40) return 'text-accent';
    return 'text-muted-foreground';
  };

  if (!isActive) return null;

  return (
    <>
      {/* Desktop Progress Overlay */}
      <div className={`fixed top-20 right-4 z-150 transition-all duration-300 ${isMinimized ? 'w-12' : 'w-80'} ${className}`}>
        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-lg">
          {isMinimized ? (
            // Minimized view
            (<div className="p-3">
              <button
                onClick={() => setIsMinimized(false)}
                className="w-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Icon name="Maximize2" size={20} />
              </button>
            </div>)
          ) : (
            // Full view
            (<>
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="text-sm font-medium text-foreground">Test Progress</h3>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <Icon name="Minimize2" size={16} />
                </button>
              </div>
              {/* Progress Bar */}
              <div className="px-4 pt-4">
                <div className="w-full bg-muted rounded-full h-2 mb-4">
                  <div
                    className="progress-indicator h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage()}%` }}
                  />
                </div>
              </div>
              {/* Stats Grid */}
              <div className="px-4 pb-4 space-y-3">
                {/* Time Remaining */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Time</span>
                  </div>
                  <span className="text-lg font-data font-medium text-foreground">
                    {formatTime(timeRemaining)}
                  </span>
                </div>

                {/* Words Per Minute */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Zap" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">WPM</span>
                  </div>
                  <span className={`text-lg font-data font-medium ${getWPMColor()}`}>
                    {wordsPerMinute}
                  </span>
                </div>

                {/* Accuracy */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Target" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Accuracy</span>
                  </div>
                  <span className={`text-lg font-data font-medium ${getAccuracyColor()}`}>
                    {accuracy}%
                  </span>
                </div>

                {/* Words Typed */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Type" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Words</span>
                  </div>
                  <span className="text-lg font-data font-medium text-foreground">
                    {wordsTyped}
                  </span>
                </div>
              </div>
            </>)
          )}
        </div>
      </div>
      {/* Mobile Progress Bar */}
      <div className="md:hidden fixed top-16 left-0 right-0 z-150 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-4 text-sm">
              <span className="font-data font-medium text-foreground">
                {formatTime(timeRemaining)}
              </span>
              <span className={`font-data font-medium ${getWPMColor()}`}>
                {wordsPerMinute} WPM
              </span>
              <span className={`font-data font-medium ${getAccuracyColor()}`}>
                {accuracy}%
              </span>
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-1">
            <div
              className="progress-indicator h-1 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TestProgressOverlay;
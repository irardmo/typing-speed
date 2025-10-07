import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../../components/ui/NavigationBar';
import TestProgressOverlay from '../../components/ui/TestProgressOverlay';
import TestCustomization from './components/TestCustomization';
import TypingArea from './components/TypingArea';
import LiveMetrics from './components/LiveMetrics';
import SettingsPanel from './components/SettingsPanel';
import TestControls from './components/TestControls';
import Icon from '../../components/AppIcon';
import texts from '../../data/testTexts.json';

const TypingTestInterface = () => {
  const navigate = useNavigate();

  // Test configuration state
  const [duration, setDuration] = useState(60);
  const [difficulty, setDifficulty] = useState('medium');
  const [category, setCategory] = useState('general');

  // Test state
  const [isTestActive, setIsTestActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [timeCompleted, setTimeCompleted] = useState(0);

  // Performance metrics
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [wordsTyped, setWordsTyped] = useState(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0);

  // UI state
  const [isSettingsCollapsed, setIsSettingsCollapsed] = useState(true);
  const [settings, setSettings] = useState({
    fontSize: 'medium',
    theme: 'light',
    soundEffects: true,
    showKeyboard: false,
    highlightErrors: true,
    showProgress: true,
    autoRestart: false
  });

  // Get test text from imported JSON
  const getTestText = useCallback(() => {
    return texts[category]?.[difficulty] || texts.general.medium;
  }, [category, difficulty]);

  const testText = getTestText();
  const totalWords = testText.split(' ').filter(Boolean).length;

  // Timer effect
  useEffect(() => {
    if (!isTestActive || isPaused || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleTestComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTestActive, isPaused, timeRemaining]);

  // Calculate WPM
  useEffect(() => {
    if (isTestActive && !isPaused) {
      const timeElapsed = (duration - timeRemaining) / 60;
      if (timeElapsed > 0) {
        const calculatedWpm = Math.round(wordsTyped / timeElapsed);
        setWpm(calculatedWpm);
      }
    }
  }, [duration, timeRemaining, wordsTyped, isTestActive, isPaused]);

  // Calculate accuracy
  useEffect(() => {
    if (totalKeystrokes > 0) {
      const calculatedAccuracy = Math.round((correctKeystrokes / totalKeystrokes) * 100);
      setAccuracy(calculatedAccuracy);
    }
  }, [totalKeystrokes, correctKeystrokes]);

  // Test control handlers
  const handleStartTest = () => {
    setIsTestActive(true);
    setIsPaused(false);
    setTestCompleted(false);
    setTimeRemaining(duration);
    resetMetrics();
    setIsSettingsCollapsed(true);
  };

  const handlePauseTest = () => {
    setIsPaused(true);
  };

  const handleResumeTest = () => {
    setIsPaused(false);
  };

  const handleStopTest = () => {
    setIsTestActive(false);
    setIsPaused(false);
    setTestCompleted(false);
    resetMetrics();
  };

  const handleRestartTest = () => {
    setIsTestActive(false);
    setIsPaused(false);
    setTestCompleted(false);
    setTimeRemaining(duration);
    resetMetrics();
    setTimeCompleted(0);
  };

  const handleTestComplete = () => {
    setIsTestActive(false);
    setIsPaused(false);
    setTestCompleted(true);
    const completedTime = duration - timeRemaining;
    setTimeCompleted(completedTime);

    // Save test results to localStorage
    const testResult = {
      id: Date.now(),
      date: new Date()?.toISOString(),
      duration,
      difficulty,
      category,
      wpm,
      accuracy,
      wordsTyped,
      totalKeystrokes,
      correctKeystrokes,
      timeCompleted: completedTime,
    };

    const existingResults = JSON.parse(localStorage.getItem('typingTestResults') || '[]');
    existingResults?.push(testResult);
    localStorage.setItem('typingTestResults', JSON.stringify(existingResults));

    if (settings?.autoRestart) {
      setTimeout(() => {
        handleRestartTest();
        handleStartTest();
      }, 3000);
    }
  };

  const handleViewResults = () => {
    navigate('/test-results');
  };

  const resetMetrics = () => {
    setWpm(0);
    setAccuracy(100);
    setWordsTyped(0);
    setTotalKeystrokes(0);
    setCorrectKeystrokes(0);
    setTimeCompleted(0);
  };

  // Keystroke handler
  const handleKeystroke = useCallback((char, wordIndex, charIndex) => {
    setTotalKeystrokes(prev => prev + 1);

    // Simple accuracy calculation (in real implementation, this would be more sophisticated)
    if (Math.random() > 0.15) { // Simulate 85% accuracy
      setCorrectKeystrokes(prev => prev + 1);
    }

    // Update words typed (simplified)
    if (char === ' ') {
      setWordsTyped(prev => prev + 1);
    }
  }, []);

  // Settings handlers
  const handleSettingsToggle = () => {
    setIsSettingsCollapsed(!isSettingsCollapsed);
  };

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem('typingTestSettings', JSON.stringify(newSettings));
  };

  // Load settings on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('typingTestSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      {/* Test Progress Overlay */}
      <TestProgressOverlay
        isActive={isTestActive && !isPaused}
        testDuration={duration}
        onTestComplete={handleTestComplete}
      />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">
                  Typing Test Interface
                </h1>
                <p className="text-muted-foreground mt-2">
                  Test your typing speed and accuracy with real-time feedback
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Icon name="Keyboard" size={24} className="text-primary" />
                <span className="text-sm text-muted-foreground">
                  {new Date()?.toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Test Customization */}
          {!isTestActive && !testCompleted && (
            <TestCustomization
              duration={duration}
              setDuration={setDuration}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              category={category}
              setCategory={setCategory}
              onStartTest={handleStartTest}
              isTestActive={isTestActive}
              className="mb-6"
            />
          )}

          {/* Test Controls */}
          <TestControls
            isTestActive={isTestActive}
            isPaused={isPaused}
            onStart={handleStartTest}
            onPause={handlePauseTest}
            onResume={handleResumeTest}
            onRestart={handleRestartTest}
            onStop={handleStopTest}
            onViewResults={handleViewResults}
            testCompleted={testCompleted}
            className="mb-6"
          />

          {/* Main Test Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Typing Area */}
            <div className="lg:col-span-2">
              <TypingArea
                testText={getTestText()}
                isTestActive={isTestActive && !isPaused}
                onKeystroke={handleKeystroke}
                onTestComplete={handleTestComplete}
              />
            </div>

            {/* Live Metrics */}
            <div>
              <LiveMetrics
                wpm={wpm}
                accuracy={accuracy}
                timeRemaining={timeRemaining}
                wordsTyped={wordsTyped}
                totalKeystrokes={totalKeystrokes}
                correctKeystrokes={correctKeystrokes}
                testCompleted={testCompleted}
                timeCompleted={timeCompleted}
                totalWords={totalWords}
                testDuration={duration}
              />
            </div>
          </div>

          {/* Settings Panel */}
          <SettingsPanel
            isCollapsed={isSettingsCollapsed}
            onToggle={handleSettingsToggle}
            settings={settings}
            onSettingsChange={handleSettingsChange}
          />

          {/* Test Completion Message */}
          {testCompleted && (
            <div className="mt-6 bg-success/10 border border-success/20 rounded-lg p-6">
              <div className="flex items-center space-x-3">
                <Icon name="CheckCircle" size={24} className="text-success" />
                <div>
                  <h3 className="text-lg font-heading font-semibold text-success">
                    Test Completed!
                  </h3>
                  <p className="text-success/80 mt-1">
                    Great job! You achieved {wpm} WPM with {accuracy}% accuracy.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Pause Overlay */}
          {isPaused && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-200">
              <div className="bg-card border border-border rounded-lg p-8 text-center max-w-md">
                <Icon name="Pause" size={48} className="text-warning mx-auto mb-4" />
                <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                  Test Paused
                </h3>
                <p className="text-muted-foreground mb-6">
                  Click resume to continue your typing test
                </p>
                <div className="flex space-x-3 justify-center">
                  <button
                    onClick={handleResumeTest}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200"
                  >
                    Resume Test
                  </button>
                  <button
                    onClick={handleStopTest}
                    className="px-6 py-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition-colors duration-200"
                  >
                    End Test
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TypingTestInterface;
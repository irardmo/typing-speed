import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigationBar from '../../components/ui/NavigationBar';
import ResultsHeader from './components/ResultsHeader';
import DetailedBreakdown from './components/DetailedBreakdown';
import ErrorAnalysis from './components/ErrorAnalysis';
import PerformanceComparison from './components/PerformanceComparison';
import ActionButtons from './components/ActionButtons';

const TestResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [testResults, setTestResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock test results data
  const mockTestResults = {
    wpm: 65,
    accuracy: 94.5,
    testDuration: 3,
    testType: 'Standard',
    totalKeystrokes: 325,
    correctKeystrokes: 307,
    incorrectKeystrokes: 18,
    wordsTyped: 195,
    charactersTyped: 975,
    backspaces: 12,
    testDate: new Date()?.toISOString(),
    isPersonalBest: true,
    commonErrors: [
      { character: 'a', errors: 3, frequency: 2.1 },
      { character: 's', errors: 2, frequency: 1.4 },
      { character: 'e', errors: 4, frequency: 2.8 },
      { character: 'r', errors: 2, frequency: 1.4 },
      { character: 't', errors: 3, frequency: 2.1 },
      { character: 'i', errors: 1, frequency: 0.7 },
      { character: 'o', errors: 2, frequency: 1.4 },
      { character: 'n', errors: 1, frequency: 0.7 }
    ],
    missedCharacters: [
      { intended: 'q', typed: 'w', count: 2 },
      { intended: 'p', typed: 'o', count: 1 },
      { intended: 'l', typed: 'k', count: 1 }
    ],
    errorPatterns: [
      { pattern: 'Adjacent keys', description: 'Hitting neighboring keys', count: 8, example: 'teh → the' },
      { pattern: 'Double letters', description: 'Typing same character twice', count: 4, example: 'tthe → the' },
      { pattern: 'Speed errors', description: 'Mistakes from typing too fast', count: 6, example: 'hte → the' }
    ]
  };

  useEffect(() => {
    // Simulate loading test results
    const loadTestResults = async () => {
      setIsLoading(true);

      try {
        // Check if results were passed via navigation state
        if (location?.state?.testResults) {
          setTestResults(location?.state?.testResults);
        } else {
          // Use mock data or load from localStorage
          const savedResults = localStorage.getItem('currentTestResults');
          if (savedResults) {
            setTestResults(JSON.parse(savedResults));
          } else {
            setTestResults(mockTestResults);
          }
        }
      } catch (error) {
        console.error('Failed to load test results:', error);
        setTestResults(mockTestResults);
      } finally {
        setIsLoading(false);
      }
    };

    loadTestResults();
  }, [location?.state]);

  const handleRetakeTest = () => {
    // Clear current results and navigate to test interface
    localStorage.removeItem('currentTestResults');
    navigate('/typing-test-interface', {
      state: {
        testConfig: {
          duration: testResults?.testDuration || 3,
          testType: testResults?.testType || 'Standard'
        }
      }
    });
  };

  const handleSaveResults = (results) => {
    // Save results to localStorage (in real app, this would be an API call)
    const savedResults = JSON.parse(localStorage.getItem('typingTestHistory') || '[]');
    savedResults?.push({
      ...results,
      id: Date.now(),
      savedAt: new Date()?.toISOString()
    });
    localStorage.setItem('typingTestHistory', JSON.stringify(savedResults));

    // Update user stats if authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      const username = localStorage.getItem('username');
      const userStats = JSON.parse(localStorage.getItem(`userStats_${username}`) || '{}');

      // Update personal bests
      if (!userStats?.personalBest || results?.wpm > userStats?.personalBest?.wpm) {
        userStats.personalBest = {
          wpm: results?.wpm,
          accuracy: results?.accuracy,
          date: new Date()?.toISOString()
        };
      }

      // Update test count
      userStats.totalTests = (userStats?.totalTests || 0) + 1;
      userStats.lastTestDate = new Date()?.toISOString();

      localStorage.setItem(`userStats_${username}`, JSON.stringify(userStats));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationBar />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading test results...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!testResults) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationBar />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-heading font-semibold text-foreground mb-4">
                No Test Results Found
              </h1>
              <p className="text-muted-foreground mb-6">
                It looks like you haven't completed a typing test yet.
              </p>
              <button
                onClick={() => navigate('/typing-test-interface')}
                className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-200"
              >
                <span>Start Typing Test</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            {/* Results Header */}
            <ResultsHeader
              wpm={testResults?.wpm}
              accuracy={testResults?.accuracy}
              testDuration={testResults?.testDuration}
              testType={testResults?.testType}
              isPersonalBest={testResults?.isPersonalBest}
            />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Detailed Stats */}
              <div className="lg:col-span-2 space-y-8">
                <DetailedBreakdown
                  totalKeystrokes={testResults?.totalKeystrokes}
                  correctKeystrokes={testResults?.correctKeystrokes}
                  incorrectKeystrokes={testResults?.incorrectKeystrokes}
                  wordsTyped={testResults?.wordsTyped}
                  charactersTyped={testResults?.charactersTyped}
                  backspaces={testResults?.backspaces}
                  testDuration={testResults?.testDuration}
                />

                <ErrorAnalysis
                  commonErrors={testResults?.commonErrors}
                  missedCharacters={testResults?.missedCharacters}
                  errorPatterns={testResults?.errorPatterns}
                />

                <PerformanceComparison
                  currentResults={testResults}
                  userStats={{}}
                  communityStats={{}}
                />
              </div>

              {/* Right Column - Actions */}
              <div className="lg:col-span-1">
                <ActionButtons
                  testResults={testResults}
                  onRetakeTest={handleRetakeTest}
                  onSaveResults={handleSaveResults}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResults;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../../components/ui/NavigationBar';
import MetricsOverview from './components/MetricsOverview';
import PerformanceChart from './components/PerformanceChart';
import RecentTestsTable from './components/RecentTestsTable';
import GoalTracker from './components/GoalTracker';
import AchievementBadges from './components/AchievementBadges';
import PerformanceComparison from './components/PerformanceComparison';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const PerformanceDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user authentication check
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/user-login');
      return;
    }

    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, [navigate]);

  // Mock performance metrics data
  const performanceMetrics = {
    averageWPM: 72,
    wpmChange: 8.5,
    overallAccuracy: 94,
    accuracyChange: 2.1,
    testsCompleted: 127,
    testsChange: 15.3,
    improvement: 23,
    improvementChange: 5.7
  };

  // Mock chart data
  const chartData = {
    timeline: [
      { date: "Sep 1", wpm: 65, accuracy: 92 },
      { date: "Sep 3", wpm: 68, accuracy: 93 },
      { date: "Sep 5", wpm: 70, accuracy: 94 },
      { date: "Sep 7", wpm: 69, accuracy: 93 },
      { date: "Sep 9", wpm: 73, accuracy: 95 },
      { date: "Sep 11", wpm: 75, accuracy: 94 },
      { date: "Sep 13", wpm: 72, accuracy: 96 },
      { date: "Sep 15", wpm: 78, accuracy: 95 },
      { date: "Sep 16", wpm: 80, accuracy: 97 }
    ],
    distribution: [
      { range: "40-50", count: 8 },
      { range: "50-60", count: 15 },
      { range: "60-70", count: 32 },
      { range: "70-80", count: 45 },
      { range: "80-90", count: 23 },
      { range: "90+", count: 4 }
    ]
  };

  // Mock recent tests data
  const recentTests = [
    {
      id: 1,
      date: "2025-09-16T10:30:00",
      duration: 5,
      wpm: 87,
      accuracy: 96,
      type: "Standard",
      typeIcon: "FileText",
      timeAgo: "2 hours ago"
    },
    {
      id: 2,
      date: "2025-09-15T15:45:00",
      duration: 3,
      wpm: 82,
      accuracy: 94,
      type: "Programming",
      typeIcon: "Code",
      timeAgo: "1 day ago"
    },
    {
      id: 3,
      date: "2025-09-15T09:20:00",
      duration: 1,
      wpm: 78,
      accuracy: 98,
      type: "Numbers",
      typeIcon: "Hash",
      timeAgo: "1 day ago"
    },
    {
      id: 4,
      date: "2025-09-14T14:15:00",
      duration: 5,
      wpm: 75,
      accuracy: 92,
      type: "Standard",
      typeIcon: "FileText",
      timeAgo: "2 days ago"
    },
    {
      id: 5,
      date: "2025-09-14T11:30:00",
      duration: 3,
      wpm: 73,
      accuracy: 95,
      type: "Quotes",
      typeIcon: "Quote",
      timeAgo: "2 days ago"
    }
  ];

  // Mock goals data
  const goals = [
    {
      id: 1,
      title: "Reach 80 WPM",
      description: "Achieve consistent 80+ words per minute",
      current: 72,
      target: 80,
      unit: "WPM",
      progress: 90,
      startDate: "Aug 1",
      targetDate: "Oct 1"
    },
    {
      id: 2,
      title: "95% Accuracy",
      description: "Maintain 95% accuracy across all tests",
      current: 94,
      target: 95,
      unit: "%",
      progress: 99,
      startDate: "Aug 15",
      targetDate: "Sep 30"
    },
    {
      id: 3,
      title: "Complete 150 Tests",
      description: "Finish 150 typing tests this month",
      current: 127,
      target: 150,
      unit: "tests",
      progress: 85,
      startDate: "Sep 1",
      targetDate: "Sep 30"
    }
  ];

  // Mock achievements data
  const achievements = [
    {
      id: 1,
      title: "Speed Demon",
      description: "Achieve 100+ WPM in a single test",
      category: "speed",
      rarity: "legendary",
      unlocked: false,
      progress: 87
    },
    {
      id: 2,
      title: "Perfect Score",
      description: "Complete a test with 100% accuracy",
      category: "accuracy",
      rarity: "epic",
      unlocked: true,
      unlockedDate: "Sep 10",
      isNew: true
    },
    {
      id: 3,
      title: "Consistent Performer",
      description: "Maintain 90%+ accuracy for 10 consecutive tests",
      category: "consistency",
      rarity: "rare",
      unlocked: true,
      unlockedDate: "Sep 5"
    },
    {
      id: 4,
      title: "First Steps",
      description: "Complete your first typing test",
      category: "milestone",
      rarity: "common",
      unlocked: true,
      unlockedDate: "Aug 1"
    },
    {
      id: 5,
      title: "Century Club",
      description: "Complete 100 typing tests",
      category: "milestone",
      rarity: "rare",
      unlocked: true,
      unlockedDate: "Sep 12"
    },
    {
      id: 6,
      title: "Lightning Fingers",
      description: "Achieve 80+ WPM consistently",
      category: "speed",
      rarity: "epic",
      unlocked: false,
      progress: 72
    }
  ];

  // Mock user stats for comparison
  const userStats = {
    averageWPM: 72,
    averageAccuracy: 94,
    consistencyScore: 87,
    improvementRate: 23
  };

  // Mock community stats
  const communityStats = {
    global: {
      averageWPM: 45,
      averageAccuracy: 87,
      averageConsistency: 72,
      averageImprovement: 15,
      wpmPercentile: 85,
      accuracyPercentile: 92,
      consistencyPercentile: 78,
      improvementPercentile: 88,
      overallRank: 1247,
      totalUsers: 15420
    },
    country: {
      averageWPM: 48,
      averageAccuracy: 89,
      averageConsistency: 75,
      averageImprovement: 18,
      wpmPercentile: 82,
      accuracyPercentile: 89,
      consistencyPercentile: 76,
      improvementPercentile: 85,
      overallRank: 156,
      totalUsers: 2340
    },
    ageGroup: {
      averageWPM: 52,
      averageAccuracy: 91,
      averageConsistency: 78,
      averageImprovement: 20,
      wpmPercentile: 78,
      accuracyPercentile: 85,
      consistencyPercentile: 73,
      improvementPercentile: 82,
      overallRank: 89,
      totalUsers: 890
    },
    experience: {
      averageWPM: 68,
      averageAccuracy: 93,
      averageConsistency: 85,
      averageImprovement: 12,
      wpmPercentile: 65,
      accuracyPercentile: 72,
      consistencyPercentile: 68,
      improvementPercentile: 95,
      overallRank: 45,
      totalUsers: 234
    }
  };

  const handleRetryTest = (test) => {
    navigate('/typing-test-interface', {
      state: {
        duration: test?.duration,
        type: test?.type?.toLowerCase()
      }
    });
  };

  const handleUpdateGoal = (goalId, newTarget) => {
    console.log(`Updating goal ${goalId} to ${newTarget}`);
    // In real implementation, this would update the goal in the database
  };

  const handleExportReport = () => {
    console.log('Exporting performance report...');
    // In real implementation, this would generate and download a PDF report
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'progress', label: 'Progress', icon: 'TrendingUp' },
    { id: 'achievements', label: 'Achievements', icon: 'Award' },
    { id: 'comparison', label: 'Comparison', icon: 'Users' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationBar />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-muted-foreground">Loading your performance data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <div className="pt-16">
        {/* Header */}
        <div className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Performance Dashboard</h1>
                <p className="text-muted-foreground mt-2">
                  Track your typing progress and analyze your performance trends
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                  onClick={handleExportReport}
                >
                  Export Report
                </Button>
                <Button
                  variant="default"
                  iconName="Play"
                  iconPosition="left"
                  onClick={() => navigate('/typing-test-interface')}
                >
                  Start New Test
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Metrics Overview */}
              <MetricsOverview metrics={performanceMetrics} />

              {/* Charts and Recent Tests */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2">
                  <PerformanceChart data={chartData} />
                </div>
                <div>
                  <GoalTracker
                    goals={goals}
                    onUpdateGoal={handleUpdateGoal}
                  />
                </div>
              </div>

              {/* Recent Tests */}
              <RecentTestsTable
                tests={recentTests}
                onRetryTest={handleRetryTest}
              />
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="space-y-8">
              <PerformanceChart data={chartData} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <GoalTracker
                  goals={goals}
                  onUpdateGoal={handleUpdateGoal}
                />
                <RecentTestsTable
                  tests={recentTests}
                  onRetryTest={handleRetryTest}
                />
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <AchievementBadges achievements={achievements} />
          )}

          {activeTab === 'comparison' && (
            <div className="space-y-8">
              <PerformanceComparison
                userStats={userStats}
                communityStats={communityStats}
              />
              <MetricsOverview metrics={performanceMetrics} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;
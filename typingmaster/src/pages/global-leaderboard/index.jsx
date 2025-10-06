import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../../components/ui/NavigationBar';
import Icon from '../../components/AppIcon';
import LeaderboardTable from './components/LeaderboardTable';
import LeaderboardTabs from './components/LeaderboardTabs';
import UserPositionCard from './components/UserPositionCard';
import LeaderboardFilters from './components/LeaderboardFilters';
import AchievementShowcase from './components/AchievementShowcase';
import LeaderboardPagination from './components/LeaderboardPagination';

const GlobalLeaderboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overall');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    duration: 'all',
    difficulty: 'all',
    period: 'all-time',
    country: 'all'
  });
  const [isLoading, setIsLoading] = useState(true);

  // Mock current user data
  const currentUser = {
    id: 'user-123',
    username: 'speedtyper2024',
    rank: 47,
    previousRank: 52,
    bestWPM: 87,
    avgAccuracy: 96,
    totalTests: 234,
    streak: 12,
    country: 'United States',
    joinedDate: '2024-01-15'
  };

  // Mock leaderboard data
  const mockUsers = [
    {
      id: 'user-001',
      username: 'TypeMaster_Pro',
      rank: 1,
      bestWPM: 142,
      avgAccuracy: 98,
      totalTests: 1247,
      country: 'United States',
      joinedDate: '2023-03-12'
    },
    {
      id: 'user-002',
      username: 'KeyboardNinja',
      rank: 2,
      bestWPM: 138,
      avgAccuracy: 97,
      totalTests: 892,
      country: 'Canada',
      joinedDate: '2023-07-08'
    },
    {
      id: 'user-003',
      username: 'SpeedDemon_UK',
      rank: 3,
      bestWPM: 135,
      avgAccuracy: 99,
      totalTests: 1456,
      country: 'United Kingdom',
      joinedDate: '2023-01-22'
    },
    {
      id: 'user-004',
      username: 'FingerFlash',
      rank: 4,
      bestWPM: 132,
      avgAccuracy: 96,
      totalTests: 678,
      country: 'Australia',
      joinedDate: '2023-09-14'
    },
    {
      id: 'user-005',
      username: 'RapidTyper_DE',
      rank: 5,
      bestWPM: 129,
      avgAccuracy: 98,
      totalTests: 1123,
      country: 'Germany',
      joinedDate: '2023-05-03'
    },
    {
      id: 'user-006',
      username: 'QuickKeys_FR',
      rank: 6,
      bestWPM: 127,
      avgAccuracy: 95,
      totalTests: 834,
      country: 'France',
      joinedDate: '2023-11-18'
    },
    {
      id: 'user-007',
      username: 'TypeRacer_JP',
      rank: 7,
      bestWPM: 125,
      avgAccuracy: 97,
      totalTests: 945,
      country: 'Japan',
      joinedDate: '2023-06-27'
    },
    {
      id: 'user-008',
      username: 'FastFingers_IN',
      rank: 8,
      bestWPM: 123,
      avgAccuracy: 94,
      totalTests: 567,
      country: 'India',
      joinedDate: '2024-02-09'
    },
    {
      id: 'user-009',
      username: 'KeyStroke_BR',
      rank: 9,
      bestWPM: 121,
      avgAccuracy: 96,
      totalTests: 789,
      country: 'Brazil',
      joinedDate: '2023-12-05'
    },
    {
      id: 'user-010',
      username: 'TypingChamp_NL',
      rank: 10,
      bestWPM: 119,
      avgAccuracy: 98,
      totalTests: 1034,
      country: 'Netherlands',
      joinedDate: '2023-04-16'
    }
  ];

  // Mock nearby users for current user
  const nearbyUsers = [
    {
      id: 'user-045',
      username: 'QuickType_45',
      rank: 45,
      bestWPM: 89,
      avgAccuracy: 97,
      totalTests: 198
    },
    {
      id: 'user-046',
      username: 'FastKeys_46',
      rank: 46,
      bestWPM: 88,
      avgAccuracy: 95,
      totalTests: 267
    },
    {
      id: 'user-048',
      username: 'TypeSpeed_48',
      rank: 48,
      bestWPM: 86,
      avgAccuracy: 94,
      totalTests: 156
    },
    {
      id: 'user-049',
      username: 'KeyMaster_49',
      rank: 49,
      bestWPM: 85,
      avgAccuracy: 96,
      totalTests: 289
    }
  ];

  // Mock featured users with achievements
  const featuredUsers = [
    {
      id: 'user-001',
      username: 'TypeMaster_Pro',
      rank: 1,
      bestWPM: 142,
      avgAccuracy: 98,
      country: 'United States',
      achievementType: 'speed-demon',
      achievementDate: '2024-12-10'
    },
    {
      id: 'user-003',
      username: 'SpeedDemon_UK',
      rank: 3,
      bestWPM: 135,
      avgAccuracy: 99,
      country: 'United Kingdom',
      achievementType: 'accuracy-master',
      achievementDate: '2024-12-08'
    },
    {
      id: 'user-015',
      username: 'NewTyper_2024',
      rank: 15,
      bestWPM: 95,
      avgAccuracy: 92,
      country: 'Canada',
      achievementType: 'newcomer',
      achievementDate: '2024-12-12'
    }
  ];

  const totalUsers = 15847;
  const usersPerPage = 50;
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [activeTab, filters, searchQuery, currentPage]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleUserClick = (user) => {
    // Navigate to user profile or show user details
    console.log('View user profile:', user);
  };

  const handleViewProfile = (user) => {
    navigate('/performance-dashboard');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <div className="pt-16">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Icon name="Trophy" size={32} className="text-primary" />
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                  Global Leaderboard
                </h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Compete with typists worldwide and track your progress among the best performers
              </p>
              <div className="flex items-center justify-center space-x-6 mt-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {totalUsers?.toLocaleString()} Active Users
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Globe" size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">
                    150+ Countries
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="TrendingUp" size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Updated Live
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Tabs */}
              <LeaderboardTabs
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />

              {/* Filters */}
              <LeaderboardFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                searchQuery={searchQuery}
                onSearch={handleSearch}
              />

              {/* Loading State */}
              {isLoading ? (
                <div className="bg-card rounded-lg border border-border p-12 text-center">
                  <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading leaderboard...</p>
                </div>
              ) : (
                <>
                  {/* Leaderboard Table */}
                  <LeaderboardTable
                    users={mockUsers}
                    currentUser={currentUser}
                    onUserClick={handleUserClick}
                  />

                  {/* Pagination */}
                  <LeaderboardPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalUsers={totalUsers}
                    usersPerPage={usersPerPage}
                    onPageChange={handlePageChange}
                  />
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* User Position Card */}
              <UserPositionCard
                currentUser={currentUser}
                nearbyUsers={nearbyUsers}
                totalUsers={totalUsers}
                onViewProfile={handleViewProfile}
              />

              {/* Achievement Showcase */}
              <AchievementShowcase
                featuredUsers={featuredUsers}
                onUserClick={handleUserClick}
              />

              {/* Quick Actions */}
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-lg font-medium text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => navigate('/typing-test-interface')}
                    className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-md hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Icon name="Play" size={16} />
                    <span>Take Test Now</span>
                  </button>
                  <button
                    onClick={() => navigate('/performance-dashboard')}
                    className="w-full bg-muted text-foreground py-3 px-4 rounded-md hover:bg-muted/80 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Icon name="BarChart3" size={16} />
                    <span>View My Stats</span>
                  </button>
                  <button
                    onClick={() => navigate('/test-results')}
                    className="w-full bg-muted text-foreground py-3 px-4 rounded-md hover:bg-muted/80 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Icon name="History" size={16} />
                    <span>Test History</span>
                  </button>
                </div>
              </div>

              {/* Statistics */}
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-lg font-medium text-foreground mb-4">Platform Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Tests Today</span>
                    <span className="font-data font-medium text-foreground">2,847</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Average WPM</span>
                    <span className="font-data font-medium text-foreground">52</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Top WPM Today</span>
                    <span className="font-data font-medium text-success">156</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">New Users</span>
                    <span className="font-data font-medium text-foreground">127</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalLeaderboard;
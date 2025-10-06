import React from 'react';
import Icon from '../../../components/AppIcon';


const AchievementShowcase = ({
  featuredUsers = [],
  onUserClick = () => {},
  className = ''
}) => {
  const getAchievementIcon = (type) => {
    const icons = {
      'speed-demon': { icon: 'Zap', color: 'text-yellow-500' },
      'accuracy-master': { icon: 'Target', color: 'text-green-500' },
      'consistency-king': { icon: 'TrendingUp', color: 'text-blue-500' },
      'marathon-typist': { icon: 'Clock', color: 'text-purple-500' },
      'perfectionist': { icon: 'Award', color: 'text-pink-500' },
      'newcomer': { icon: 'Star', color: 'text-orange-500' }
    };
    return icons?.[type] || { icon: 'Trophy', color: 'text-primary' };
  };

  const getAchievementTitle = (type) => {
    const titles = {
      'speed-demon': 'Speed Demon',
      'accuracy-master': 'Accuracy Master',
      'consistency-king': 'Consistency King',
      'marathon-typist': 'Marathon Typist',
      'perfectionist': 'Perfectionist',
      'newcomer': 'Rising Star'
    };
    return titles?.[type] || 'Champion';
  };

  const getAchievementDescription = (type) => {
    const descriptions = {
      'speed-demon': 'Achieved 120+ WPM',
      'accuracy-master': 'Maintained 99%+ accuracy',
      'consistency-king': 'Consistent performance over 30 days',
      'marathon-typist': 'Completed 1000+ tests',
      'perfectionist': '100% accuracy in multiple tests',
      'newcomer': 'Rapid improvement in first month'
    };
    return descriptions?.[type] || 'Outstanding achievement';
  };

  if (featuredUsers?.length === 0) {
    return (
      <div className={`bg-card rounded-lg border border-border p-8 text-center ${className}`}>
        <Icon name="Trophy" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No Featured Users Yet</h3>
        <p className="text-muted-foreground">
          Complete typing tests to earn achievements and get featured here!
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-card rounded-lg border border-border ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Award" size={20} className="text-primary" />
          <h3 className="text-lg font-medium text-foreground">Achievement Showcase</h3>
        </div>
        <div className="text-sm text-muted-foreground">
          Featured Users
        </div>
      </div>
      {/* Featured Users Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredUsers?.map((user) => {
            const achievementInfo = getAchievementIcon(user?.achievementType);

            return (
              <div
                key={user?.id}
                onClick={() => onUserClick(user)}
                className="bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all duration-300 border border-border hover:border-primary/30"
              >
                {/* Achievement Badge */}
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground text-xl font-bold">
                        {user?.username?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <div className={`absolute -top-1 -right-1 w-8 h-8 bg-card rounded-full flex items-center justify-center border-2 border-background ${achievementInfo?.color}`}>
                      <Icon name={achievementInfo?.icon} size={16} />
                    </div>
                  </div>
                </div>
                {/* User Info */}
                <div className="text-center mb-4">
                  <h4 className="font-medium text-foreground mb-1">{user?.username}</h4>
                  <div className="text-sm text-muted-foreground mb-2">
                    Rank #{user?.rank} • {user?.country}
                  </div>
                  <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium inline-block">
                    {getAchievementTitle(user?.achievementType)}
                  </div>
                </div>
                {/* Achievement Description */}
                <div className="text-center mb-4">
                  <p className="text-sm text-muted-foreground">
                    {getAchievementDescription(user?.achievementType)}
                  </p>
                </div>
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-data font-bold text-success">
                      {user?.bestWPM}
                    </div>
                    <div className="text-xs text-muted-foreground">Best WPM</div>
                  </div>
                  <div>
                    <div className="text-lg font-data font-bold text-accent">
                      {user?.avgAccuracy}%
                    </div>
                    <div className="text-xs text-muted-foreground">Accuracy</div>
                  </div>
                </div>
                {/* Achievement Date */}
                <div className="text-center mt-4 pt-4 border-t border-border">
                  <div className="text-xs text-muted-foreground">
                    Achieved on {user?.achievementDate}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* View All Button */}
      <div className="p-6 border-t border-border text-center">
        <button className="text-primary hover:text-primary/80 transition-colors duration-200 text-sm font-medium flex items-center justify-center space-x-1 mx-auto">
          <span>View All Achievements</span>
          <Icon name="ArrowRight" size={14} />
        </button>
      </div>
    </div>
  );
};

export default AchievementShowcase;
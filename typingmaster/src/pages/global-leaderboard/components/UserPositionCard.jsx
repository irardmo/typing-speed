import React from 'react';
import Icon from '../../../components/AppIcon';

const UserPositionCard = ({
  currentUser = null,
  nearbyUsers = [],
  totalUsers = 0,
  onViewProfile = () => {},
  className = ''
}) => {
  if (!currentUser) {
    return (
      <div className={`bg-card rounded-lg border border-border p-6 text-center ${className}`}>
        <Icon name="User" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Join the Competition</h3>
        <p className="text-muted-foreground mb-4">
          Complete a typing test to see your ranking among {totalUsers?.toLocaleString()} users
        </p>
        <button
          onClick={() => window.location.href = '/typing-test-interface'}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors duration-200"
        >
          Take Your First Test
        </button>
      </div>
    );
  }

  const getPercentile = () => {
    if (totalUsers === 0) return 0;
    return Math.round(((totalUsers - currentUser?.rank + 1) / totalUsers) * 100);
  };

  const getRankChange = () => {
    if (!currentUser?.previousRank) return null;
    const change = currentUser?.previousRank - currentUser?.rank;
    if (change > 0) return { type: 'up', value: change };
    if (change < 0) return { type: 'down', value: Math.abs(change) };
    return { type: 'same', value: 0 };
  };

  const rankChange = getRankChange();

  return (
    <div className={`bg-card rounded-lg border border-border overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-primary/5 border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-foreground mb-1">Your Position</h3>
            <p className="text-sm text-muted-foreground">
              Top {getPercentile()}% of all users
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-data font-bold text-primary">
              #{currentUser?.rank}
            </div>
            {rankChange && (
              <div className={`flex items-center justify-end space-x-1 text-sm ${
                rankChange?.type === 'up' ? 'text-success' :
                rankChange?.type === 'down' ? 'text-error' : 'text-muted-foreground'
              }`}>
                {rankChange?.type === 'up' && <Icon name="TrendingUp" size={14} />}
                {rankChange?.type === 'down' && <Icon name="TrendingDown" size={14} />}
                {rankChange?.type === 'same' && <Icon name="Minus" size={14} />}
                <span>
                  {rankChange?.type === 'same' ? 'No change' : `${rankChange?.value} spots`}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* User Stats */}
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-data font-bold text-success">
              {currentUser?.bestWPM}
            </div>
            <div className="text-sm text-muted-foreground">Best WPM</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-data font-bold text-accent">
              {currentUser?.avgAccuracy}%
            </div>
            <div className="text-sm text-muted-foreground">Avg Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-data font-bold text-foreground">
              {currentUser?.totalTests}
            </div>
            <div className="text-sm text-muted-foreground">Total Tests</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-data font-bold text-warning">
              {currentUser?.streak || 0}
            </div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </div>
        </div>

        {/* Nearby Users */}
        {nearbyUsers?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Nearby Competitors</h4>
            <div className="space-y-2">
              {nearbyUsers?.map((user) => (
                <div
                  key={user?.id}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-md hover:bg-muted/50 transition-colors duration-200 cursor-pointer"
                  onClick={() => onViewProfile(user)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-sm font-data text-muted-foreground">
                      #{user?.rank}
                    </div>
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground text-xs font-medium">
                        {user?.username?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {user?.username}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-data font-medium text-success">
                      {user?.bestWPM} WPM
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {user?.avgAccuracy}% acc
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-6 pt-6 border-t border-border">
          <button
            onClick={() => onViewProfile(currentUser)}
            className="w-full bg-muted text-foreground py-2 px-4 rounded-md hover:bg-muted/80 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Icon name="User" size={16} />
            <span>View Full Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPositionCard;
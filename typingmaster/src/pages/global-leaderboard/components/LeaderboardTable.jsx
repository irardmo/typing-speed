import React from 'react';
import Icon from '../../../components/AppIcon';


const LeaderboardTable = ({
  users = [],
  currentUser = null,
  onUserClick = () => {},
  className = ''
}) => {
  const getRankIcon = (rank) => {
    if (rank === 1) return { icon: 'Crown', color: 'text-yellow-500' };
    if (rank === 2) return { icon: 'Medal', color: 'text-gray-400' };
    if (rank === 3) return { icon: 'Award', color: 'text-amber-600' };
    return { icon: 'Hash', color: 'text-muted-foreground' };
  };

  const getWPMColor = (wpm) => {
    if (wpm >= 80) return 'text-success';
    if (wpm >= 60) return 'text-accent';
    if (wpm >= 40) return 'text-warning';
    return 'text-muted-foreground';
  };

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 98) return 'text-success';
    if (accuracy >= 95) return 'text-accent';
    if (accuracy >= 90) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className={`bg-card rounded-lg border border-border overflow-hidden ${className}`}>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Rank</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">User</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">WPM</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Accuracy</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Tests</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => {
              const rankInfo = getRankIcon(user?.rank);
              const isCurrentUser = currentUser && user?.id === currentUser?.id;

              return (
                <tr
                  key={user?.id}
                  onClick={() => onUserClick(user)}
                  className={`border-b border-border hover:bg-muted/30 cursor-pointer transition-colors duration-200 ${
                    isCurrentUser ? 'bg-primary/5 border-primary/20' : ''
                  }`}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <Icon
                        name={rankInfo?.icon}
                        size={18}
                        className={rankInfo?.color}
                      />
                      <span className="font-data font-medium text-foreground">
                        #{user?.rank}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-primary-foreground text-sm font-medium">
                          {user?.username?.charAt(0)?.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{user?.username}</div>
                        {user?.country && (
                          <div className="text-sm text-muted-foreground">{user?.country}</div>
                        )}
                      </div>
                      {isCurrentUser && (
                        <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                          You
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`font-data font-bold text-lg ${getWPMColor(user?.bestWPM)}`}>
                      {user?.bestWPM}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`font-data font-medium ${getAccuracyColor(user?.avgAccuracy)}`}>
                      {user?.avgAccuracy}%
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-muted-foreground font-data">
                      {user?.totalTests?.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-muted-foreground text-sm">
                      {user?.joinedDate}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="md:hidden space-y-3 p-4">
        {users?.map((user) => {
          const rankInfo = getRankIcon(user?.rank);
          const isCurrentUser = currentUser && user?.id === currentUser?.id;

          return (
            <div
              key={user?.id}
              onClick={() => onUserClick(user)}
              className={`bg-card border border-border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                isCurrentUser ? 'border-primary bg-primary/5' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <Icon
                      name={rankInfo?.icon}
                      size={16}
                      className={rankInfo?.color}
                    />
                    <span className="font-data font-bold text-foreground">
                      #{user?.rank}
                    </span>
                  </div>
                  {isCurrentUser && (
                    <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                      You
                    </div>
                  )}
                </div>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              </div>
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-medium">
                    {user?.username?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground">{user?.username}</div>
                  {user?.country && (
                    <div className="text-sm text-muted-foreground">{user?.country}</div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className={`font-data font-bold text-lg ${getWPMColor(user?.bestWPM)}`}>
                    {user?.bestWPM}
                  </div>
                  <div className="text-xs text-muted-foreground">WPM</div>
                </div>
                <div>
                  <div className={`font-data font-medium ${getAccuracyColor(user?.avgAccuracy)}`}>
                    {user?.avgAccuracy}%
                  </div>
                  <div className="text-xs text-muted-foreground">Accuracy</div>
                </div>
                <div>
                  <div className="font-data text-muted-foreground">
                    {user?.totalTests > 999 ? `${(user?.totalTests / 1000)?.toFixed(1)}k` : user?.totalTests}
                  </div>
                  <div className="text-xs text-muted-foreground">Tests</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeaderboardTable;
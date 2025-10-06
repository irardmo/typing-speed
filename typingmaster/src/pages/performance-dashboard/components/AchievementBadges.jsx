import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AchievementBadges = ({ achievements, className = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Badges', icon: 'Award' },
    { value: 'speed', label: 'Speed', icon: 'Zap' },
    { value: 'accuracy', label: 'Accuracy', icon: 'Target' },
    { value: 'consistency', label: 'Consistency', icon: 'TrendingUp' },
    { value: 'milestone', label: 'Milestones', icon: 'Flag' }
  ];

  const filteredAchievements = selectedCategory === 'all'
    ? achievements
    : achievements?.filter(achievement => achievement?.category === selectedCategory);

  const getBadgeColor = (rarity) => {
    switch (rarity) {
      case 'legendary':
        return 'from-purple-500 to-pink-500';
      case 'epic':
        return 'from-blue-500 to-purple-500';
      case 'rare':
        return 'from-green-500 to-blue-500';
      case 'common':
        return 'from-gray-400 to-gray-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const getBadgeIcon = (category) => {
    switch (category) {
      case 'speed':
        return 'Zap';
      case 'accuracy':
        return 'Target';
      case 'consistency':
        return 'TrendingUp';
      case 'milestone':
        return 'Flag';
      default:
        return 'Award';
    }
  };

  const getRarityText = (rarity) => {
    return rarity?.charAt(0)?.toUpperCase() + rarity?.slice(1);
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-warning/10 rounded-lg">
            <Icon name="Award" size={20} className="text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Achievement Badges</h3>
            <p className="text-sm text-muted-foreground">
              {achievements?.filter(a => a?.unlocked)?.length} of {achievements?.length} unlocked
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          iconName="Share2"
          iconPosition="left"
        >
          Share
        </Button>
      </div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories?.map((category) => (
          <button
            key={category?.value}
            onClick={() => setSelectedCategory(category?.value)}
            className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
              selectedCategory === category?.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
            }`}
          >
            <Icon name={category?.icon} size={16} />
            <span>{category?.label}</span>
          </button>
        ))}
      </div>
      {/* Achievement Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements?.map((achievement) => (
          <div
            key={achievement?.id}
            className={`relative border border-border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${
              achievement?.unlocked
                ? 'bg-card hover:bg-muted/20' :'bg-muted/50 opacity-60'
            }`}
          >
            {/* Badge Icon */}
            <div className="flex items-center justify-center mb-3">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getBadgeColor(achievement?.rarity)} flex items-center justify-center shadow-lg`}>
                <Icon
                  name={getBadgeIcon(achievement?.category)}
                  size={24}
                  color="white"
                />
              </div>
            </div>

            {/* Achievement Info */}
            <div className="text-center space-y-2">
              <h4 className="font-semibold text-foreground">{achievement?.title}</h4>
              <p className="text-sm text-muted-foreground">{achievement?.description}</p>

              {/* Rarity Badge */}
              <div className="flex items-center justify-center">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  achievement?.rarity === 'legendary' ? 'bg-purple-100 text-purple-800' :
                  achievement?.rarity === 'epic' ? 'bg-blue-100 text-blue-800' :
                  achievement?.rarity === 'rare'? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {getRarityText(achievement?.rarity)}
                </span>
              </div>

              {/* Progress or Date */}
              {achievement?.unlocked ? (
                <div className="flex items-center justify-center space-x-1 text-success">
                  <Icon name="CheckCircle" size={16} />
                  <span className="text-sm font-medium">
                    Unlocked {achievement?.unlockedDate}
                  </span>
                </div>
              ) : achievement?.progress !== undefined ? (
                <div className="space-y-2">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${achievement?.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {achievement?.progress}% complete
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-1 text-muted-foreground">
                  <Icon name="Lock" size={16} />
                  <span className="text-sm">Locked</span>
                </div>
              )}
            </div>

            {/* New Badge Indicator */}
            {achievement?.isNew && achievement?.unlocked && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">!</span>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Achievement Statistics */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-warning">
              {achievements?.filter(a => a?.rarity === 'legendary' && a?.unlocked)?.length}
            </p>
            <p className="text-sm text-muted-foreground">Legendary</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">
              {achievements?.filter(a => a?.rarity === 'epic' && a?.unlocked)?.length}
            </p>
            <p className="text-sm text-muted-foreground">Epic</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-success">
              {achievements?.filter(a => a?.rarity === 'rare' && a?.unlocked)?.length}
            </p>
            <p className="text-sm text-muted-foreground">Rare</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-muted-foreground">
              {achievements?.filter(a => a?.rarity === 'common' && a?.unlocked)?.length}
            </p>
            <p className="text-sm text-muted-foreground">Common</p>
          </div>
        </div>
      </div>
      {/* Empty State */}
      {filteredAchievements?.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Award" size={24} className="text-muted-foreground" />
          </div>
          <h4 className="text-lg font-medium text-foreground mb-2">No achievements in this category</h4>
          <p className="text-muted-foreground">
            Complete more typing tests to unlock achievements.
          </p>
        </div>
      )}
    </div>
  );
};

export default AchievementBadges;
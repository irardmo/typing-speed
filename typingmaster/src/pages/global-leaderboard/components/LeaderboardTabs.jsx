import React from 'react';
import Icon from '../../../components/AppIcon';

const LeaderboardTabs = ({
  activeTab = 'overall',
  onTabChange = () => {},
  className = ''
}) => {
  const tabs = [
    {
      id: 'overall',
      label: 'Overall',
      icon: 'Trophy',
      description: 'All-time best performers'
    },
    {
      id: 'weekly',
      label: 'Weekly',
      icon: 'Calendar',
      description: 'This week\'s champions'
    },
    {
      id: 'monthly',
      label: 'Monthly',
      icon: 'CalendarDays',
      description: 'Monthly leaders'
    },
    {
      id: 'speed',
      label: 'Speed',
      icon: 'Zap',
      description: 'Fastest typists'
    },
    {
      id: 'accuracy',
      label: 'Accuracy',
      icon: 'Target',
      description: 'Most accurate typists'
    }
  ];

  return (
    <div className={`bg-card rounded-lg border border-border ${className}`}>
      {/* Desktop Tabs */}
      <div className="hidden md:flex border-b border-border">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 text-sm font-medium transition-all duration-200 border-b-2 ${
              activeTab === tab?.id
                ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Mobile Dropdown */}
      <div className="md:hidden p-4">
        <div className="relative">
          <select
            value={activeTab}
            onChange={(e) => onTabChange(e?.target?.value)}
            className="w-full appearance-none bg-background border border-border rounded-md py-3 px-4 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            {tabs?.map((tab) => (
              <option key={tab?.id} value={tab?.id}>
                {tab?.label} - {tab?.description}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
            <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
          </div>
        </div>
      </div>
      {/* Tab Description */}
      <div className="hidden md:block px-6 py-3 bg-muted/30 border-b border-border">
        <p className="text-sm text-muted-foreground">
          {tabs?.find(tab => tab?.id === activeTab)?.description}
        </p>
      </div>
    </div>
  );
};

export default LeaderboardTabs;
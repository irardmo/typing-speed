import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const LeaderboardFilters = ({
  filters = {},
  onFilterChange = () => {},
  onSearch = () => {},
  searchQuery = '',
  className = ''
}) => {
  const durationOptions = [
    { value: 'all', label: 'All Durations' },
    { value: '15', label: '15 seconds' },
    { value: '30', label: '30 seconds' },
    { value: '60', label: '1 minute' },
    { value: '180', label: '3 minutes' },
    { value: '300', label: '5 minutes' }
  ];

  const difficultyOptions = [
    { value: 'all', label: 'All Difficulties' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
    { value: 'expert', label: 'Expert' }
  ];

  const periodOptions = [
    { value: 'all-time', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ];

  const countryOptions = [
    { value: 'all', label: 'All Countries' },
    { value: 'US', label: 'United States' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'CA', label: 'Canada' },
    { value: 'AU', label: 'Australia' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
    { value: 'JP', label: 'Japan' },
    { value: 'IN', label: 'India' },
    { value: 'BR', label: 'Brazil' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFilterChange({
      duration: 'all',
      difficulty: 'all',
      period: 'all-time',
      country: 'all'
    });
    onSearch('');
  };

  const hasActiveFilters = () => {
    return Object.values(filters)?.some(value => value && value !== 'all' && value !== 'all-time') || searchQuery;
  };

  return (
    <div className={`bg-card rounded-lg border border-border ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="text-lg font-medium text-foreground">Filters</h3>
        </div>
        {hasActiveFilters() && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary hover:text-primary/80 transition-colors duration-200 flex items-center space-x-1"
          >
            <Icon name="X" size={14} />
            <span>Clear All</span>
          </button>
        )}
      </div>
      {/* Search */}
      <div className="p-4 border-b border-border">
        <Input
          type="search"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => onSearch(e?.target?.value)}
          className="w-full"
        />
      </div>
      {/* Filter Controls */}
      <div className="p-4 space-y-4">
        {/* Desktop Grid Layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            label="Duration"
            options={durationOptions}
            value={filters?.duration || 'all'}
            onChange={(value) => handleFilterChange('duration', value)}
          />

          <Select
            label="Difficulty"
            options={difficultyOptions}
            value={filters?.difficulty || 'all'}
            onChange={(value) => handleFilterChange('difficulty', value)}
          />

          <Select
            label="Time Period"
            options={periodOptions}
            value={filters?.period || 'all-time'}
            onChange={(value) => handleFilterChange('period', value)}
          />

          <Select
            label="Country"
            options={countryOptions}
            value={filters?.country || 'all'}
            onChange={(value) => handleFilterChange('country', value)}
            searchable
          />
        </div>

        {/* Mobile Stack Layout */}
        <div className="md:hidden space-y-4">
          <Select
            label="Test Duration"
            options={durationOptions}
            value={filters?.duration || 'all'}
            onChange={(value) => handleFilterChange('duration', value)}
          />

          <Select
            label="Difficulty Level"
            options={difficultyOptions}
            value={filters?.difficulty || 'all'}
            onChange={(value) => handleFilterChange('difficulty', value)}
          />

          <Select
            label="Time Period"
            options={periodOptions}
            value={filters?.period || 'all-time'}
            onChange={(value) => handleFilterChange('period', value)}
          />

          <Select
            label="Country"
            options={countryOptions}
            value={filters?.country || 'all'}
            onChange={(value) => handleFilterChange('country', value)}
            searchable
          />
        </div>
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters() && (
        <div className="p-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters)?.map(([key, value]) => {
              if (!value || value === 'all' || value === 'all-time') return null;

              const getFilterLabel = (key, value) => {
                const option = {
                  duration: durationOptions,
                  difficulty: difficultyOptions,
                  period: periodOptions,
                  country: countryOptions
                }?.[key]?.find(opt => opt?.value === value);

                return option ? `${key}: ${option?.label}` : `${key}: ${value}`;
              };

              return (
                <div
                  key={key}
                  className="flex items-center space-x-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                >
                  <span>{getFilterLabel(key, value)}</span>
                  <button
                    onClick={() => handleFilterChange(key, key === 'period' ? 'all-time' : 'all')}
                    className="hover:text-primary/80 transition-colors duration-200"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </div>
              );
            })}

            {searchQuery && (
              <div className="flex items-center space-x-1 bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">
                <span>Search: {searchQuery}</span>
                <button
                  onClick={() => onSearch('')}
                  className="hover:text-accent/80 transition-colors duration-200"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderboardFilters;
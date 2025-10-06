import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentTestsTable = ({ tests, onRetryTest, className = '' }) => {
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const sortedTests = [...tests]?.sort((a, b) => {
    let aValue = a?.[sortBy];
    let bValue = b?.[sortBy];

    if (sortBy === 'date') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 95) return 'text-success';
    if (accuracy >= 85) return 'text-warning';
    return 'text-error';
  };

  const getWPMColor = (wpm) => {
    if (wpm >= 60) return 'text-success';
    if (wpm >= 40) return 'text-accent';
    return 'text-muted-foreground';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const SortButton = ({ field, children }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center space-x-1 text-left font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
    >
      <span>{children}</span>
      {sortBy === field && (
        <Icon
          name={sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown'}
          size={16}
        />
      )}
    </button>
  );

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="Clock" size={20} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Recent Tests</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={() => window.location?.reload()}
        >
          Refresh
        </Button>
      </div>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4">
                <SortButton field="date">Date</SortButton>
              </th>
              <th className="text-left p-4">
                <SortButton field="duration">Duration</SortButton>
              </th>
              <th className="text-left p-4">
                <SortButton field="wpm">WPM</SortButton>
              </th>
              <th className="text-left p-4">
                <SortButton field="accuracy">Accuracy</SortButton>
              </th>
              <th className="text-left p-4">Test Type</th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedTests?.map((test) => (
              <tr key={test?.id} className="border-b border-border hover:bg-muted/50 transition-colors duration-200">
                <td className="p-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">
                      {formatDate(test?.date)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {test?.timeAgo}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm font-data text-foreground">
                    {test?.duration}m
                  </span>
                </td>
                <td className="p-4">
                  <span className={`text-sm font-data font-medium ${getWPMColor(test?.wpm)}`}>
                    {test?.wpm}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`text-sm font-data font-medium ${getAccuracyColor(test?.accuracy)}`}>
                    {test?.accuracy}%
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name={test?.typeIcon} size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{test?.type}</span>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={() => console.log('View details:', test?.id)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="RotateCcw"
                      onClick={() => onRetryTest(test)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-border">
        {sortedTests?.map((test) => (
          <div key={test?.id} className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name={test?.typeIcon} size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{test?.type}</span>
              </div>
              <span className="text-xs text-muted-foreground">{test?.timeAgo}</span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="text-sm font-data font-medium text-foreground">{test?.duration}m</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">WPM</p>
                <p className={`text-sm font-data font-medium ${getWPMColor(test?.wpm)}`}>
                  {test?.wpm}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Accuracy</p>
                <p className={`text-sm font-data font-medium ${getAccuracyColor(test?.accuracy)}`}>
                  {test?.accuracy}%
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-muted-foreground">
                {formatDate(test?.date)}
              </span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Eye"
                  onClick={() => console.log('View details:', test?.id)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  iconName="RotateCcw"
                  onClick={() => onRetryTest(test)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {tests?.length === 0 && (
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="FileText" size={24} className="text-muted-foreground" />
          </div>
          <h4 className="text-lg font-medium text-foreground mb-2">No tests completed yet</h4>
          <p className="text-muted-foreground mb-4">
            Start your first typing test to see your performance data here.
          </p>
          <Button
            variant="default"
            iconName="Play"
            iconPosition="left"
            onClick={() => window.location.href = '/typing-test-interface'}
          >
            Start Test
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentTestsTable;
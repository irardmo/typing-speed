import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const GoalTracker = ({ goals, onUpdateGoal, className = '' }) => {
  const [editingGoal, setEditingGoal] = useState(null);
  const [newGoalValue, setNewGoalValue] = useState('');

  const handleEditGoal = (goalId, currentValue) => {
    setEditingGoal(goalId);
    setNewGoalValue(currentValue?.toString());
  };

  const handleSaveGoal = (goalId) => {
    const numericValue = parseInt(newGoalValue);
    if (numericValue > 0) {
      onUpdateGoal(goalId, numericValue);
    }
    setEditingGoal(null);
    setNewGoalValue('');
  };

  const handleCancelEdit = () => {
    setEditingGoal(null);
    setNewGoalValue('');
  };

  const getProgressColor = (progress) => {
    if (progress >= 100) return 'bg-success';
    if (progress >= 75) return 'bg-accent';
    if (progress >= 50) return 'bg-warning';
    return 'bg-primary';
  };

  const getStatusIcon = (progress) => {
    if (progress >= 100) return 'CheckCircle';
    if (progress >= 75) return 'TrendingUp';
    return 'Target';
  };

  const getStatusColor = (progress) => {
    if (progress >= 100) return 'text-success';
    if (progress >= 75) return 'text-accent';
    return 'text-muted-foreground';
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-accent/10 rounded-lg">
            <Icon name="Target" size={20} className="text-accent" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Goal Tracker</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
        >
          Add Goal
        </Button>
      </div>
      {/* Goals List */}
      <div className="space-y-4">
        {goals?.map((goal) => (
          <div key={goal?.id} className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Icon
                  name={getStatusIcon(goal?.progress)}
                  size={20}
                  className={getStatusColor(goal?.progress)}
                />
                <div>
                  <h4 className="text-sm font-medium text-foreground">{goal?.title}</h4>
                  <p className="text-xs text-muted-foreground">{goal?.description}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {editingGoal === goal?.id ? (
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      value={newGoalValue}
                      onChange={(e) => setNewGoalValue(e?.target?.value)}
                      className="w-20 h-8 text-sm"
                      min="1"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Check"
                      onClick={() => handleSaveGoal(goal?.id)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="X"
                      onClick={handleCancelEdit}
                    />
                  </div>
                ) : (
                  <>
                    <div className="text-right">
                      <p className="text-sm font-data font-medium text-foreground">
                        {goal?.current} / {goal?.target} {goal?.unit}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {goal?.progress}% complete
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit2"
                      onClick={() => handleEditGoal(goal?.id, goal?.target)}
                    />
                  </>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(goal?.progress)}`}
                  style={{ width: `${Math.min(goal?.progress, 100)}%` }}
                />
              </div>

              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Started {goal?.startDate}</span>
                <span>Target: {goal?.targetDate}</span>
              </div>
            </div>

            {/* Achievement Badge */}
            {goal?.progress >= 100 && (
              <div className="mt-3 flex items-center space-x-2 text-success">
                <Icon name="Award" size={16} />
                <span className="text-sm font-medium">Goal Achieved!</span>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Goal Statistics */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-success">
              {goals?.filter(g => g?.progress >= 100)?.length}
            </p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-accent">
              {goals?.filter(g => g?.progress >= 50 && g?.progress < 100)?.length}
            </p>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-muted-foreground">
              {goals?.filter(g => g?.progress < 50)?.length}
            </p>
            <p className="text-sm text-muted-foreground">Starting</p>
          </div>
        </div>
      </div>
      {/* Empty State */}
      {goals?.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Target" size={24} className="text-muted-foreground" />
          </div>
          <h4 className="text-lg font-medium text-foreground mb-2">No goals set yet</h4>
          <p className="text-muted-foreground mb-4">
            Set typing speed and accuracy goals to track your progress.
          </p>
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
          >
            Create Your First Goal
          </Button>
        </div>
      )}
    </div>
  );
};

export default GoalTracker;
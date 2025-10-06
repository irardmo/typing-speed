import React from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const TestCustomization = ({
  duration,
  setDuration,
  difficulty,
  setDifficulty,
  category,
  setCategory,
  onStartTest,
  isTestActive,
  className = ''
}) => {
  const durationOptions = [
    { value: 60, label: '1 Minute' },
    { value: 180, label: '3 Minutes' },
    { value: 300, label: '5 Minutes' }
  ];

  const difficultyOptions = [
    { value: 'easy', label: 'Easy', description: 'Common words and simple sentences' },
    { value: 'medium', label: 'Medium', description: 'Mixed vocabulary with punctuation' },
    { value: 'hard', label: 'Hard', description: 'Complex text with numbers and symbols' }
  ];

  const categoryOptions = [
    { value: 'general', label: 'General Text' },
    { value: 'programming', label: 'Programming Code' },
    { value: 'literature', label: 'Literature' },
    { value: 'business', label: 'Business Writing' },
    { value: 'quotes', label: 'Famous Quotes' },
    { value: 'news', label: 'News Articles' }
  ];

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">Test Settings</h2>
        <Icon name="Settings" size={20} className="text-muted-foreground" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Duration Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Duration</label>
          <div className="grid grid-cols-1 gap-2">
            {durationOptions?.map((option) => (
              <Button
                key={option?.value}
                variant={duration === option?.value ? "default" : "outline"}
                size="sm"
                onClick={() => setDuration(option?.value)}
                disabled={isTestActive}
                className="justify-start"
              >
                <Icon
                  name="Clock"
                  size={16}
                  className="mr-2"
                />
                {option?.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Difficulty Selection */}
        <div>
          <Select
            label="Difficulty Level"
            options={difficultyOptions}
            value={difficulty}
            onChange={setDifficulty}
            disabled={isTestActive}
            placeholder="Select difficulty"
          />
        </div>

        {/* Category Selection */}
        <div>
          <Select
            label="Text Category"
            options={categoryOptions}
            value={category}
            onChange={setCategory}
            disabled={isTestActive}
            placeholder="Select category"
          />
        </div>
      </div>
      {/* Start Test Button */}
      <div className="flex justify-center">
        <Button
          variant="default"
          size="lg"
          onClick={onStartTest}
          disabled={isTestActive}
          iconName="Play"
          iconPosition="left"
          className="px-8"
        >
          {isTestActive ? 'Test in Progress' : 'Start Typing Test'}
        </Button>
      </div>
    </div>
  );
};

export default TestCustomization;
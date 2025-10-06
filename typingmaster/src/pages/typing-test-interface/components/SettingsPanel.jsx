import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const SettingsPanel = ({
  isCollapsed = true,
  onToggle,
  settings = {},
  onSettingsChange,
  className = ''
}) => {
  const [localSettings, setLocalSettings] = useState({
    fontSize: 'medium',
    theme: 'light',
    soundEffects: true,
    showKeyboard: false,
    highlightErrors: true,
    showProgress: true,
    autoRestart: false,
    ...settings
  });

  const fontSizeOptions = [
    { value: 'small', label: 'Small (14px)' },
    { value: 'medium', label: 'Medium (16px)' },
    { value: 'large', label: 'Large (18px)' },
    { value: 'extra-large', label: 'Extra Large (20px)' }
  ];

  const themeOptions = [
    { value: 'light', label: 'Light Theme' },
    { value: 'dark', label: 'Dark Theme' },
    { value: 'high-contrast', label: 'High Contrast' },
    { value: 'sepia', label: 'Sepia' }
  ];

  const handleSettingChange = (key, value) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    onSettingsChange?.(newSettings);
  };

  return (
    <div className={`bg-card border border-border rounded-lg transition-all duration-300 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Settings" size={20} className="text-muted-foreground" />
          <h3 className="text-lg font-heading font-medium text-foreground">Settings</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          iconName={isCollapsed ? "ChevronDown" : "ChevronUp"}
          iconPosition="right"
        >
          {isCollapsed ? 'Show' : 'Hide'}
        </Button>
      </div>
      {/* Settings Content */}
      {!isCollapsed && (
        <div className="p-6 space-y-6">
          {/* Display Settings */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground border-b border-border pb-2">
              Display Settings
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Font Size"
                options={fontSizeOptions}
                value={localSettings?.fontSize}
                onChange={(value) => handleSettingChange('fontSize', value)}
              />

              <Select
                label="Theme"
                options={themeOptions}
                value={localSettings?.theme}
                onChange={(value) => handleSettingChange('theme', value)}
              />
            </div>
          </div>

          {/* Audio Settings */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground border-b border-border pb-2">
              Audio Settings
            </h4>

            <Checkbox
              label="Sound Effects"
              description="Play sounds for keystrokes and errors"
              checked={localSettings?.soundEffects}
              onChange={(e) => handleSettingChange('soundEffects', e?.target?.checked)}
            />
          </div>

          {/* Interface Settings */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground border-b border-border pb-2">
              Interface Settings
            </h4>

            <div className="space-y-3">
              <Checkbox
                label="Show Virtual Keyboard"
                description="Display on-screen keyboard for reference"
                checked={localSettings?.showKeyboard}
                onChange={(e) => handleSettingChange('showKeyboard', e?.target?.checked)}
              />

              <Checkbox
                label="Highlight Errors"
                description="Show visual feedback for typing errors"
                checked={localSettings?.highlightErrors}
                onChange={(e) => handleSettingChange('highlightErrors', e?.target?.checked)}
              />

              <Checkbox
                label="Show Progress Bar"
                description="Display test completion progress"
                checked={localSettings?.showProgress}
                onChange={(e) => handleSettingChange('showProgress', e?.target?.checked)}
              />

              <Checkbox
                label="Auto Restart"
                description="Automatically start new test after completion"
                checked={localSettings?.autoRestart}
                onChange={(e) => handleSettingChange('autoRestart', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground border-b border-border pb-2">
              Quick Actions
            </h4>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                iconName="RotateCcw"
                iconPosition="left"
                onClick={() => {
                  const defaultSettings = {
                    fontSize: 'medium',
                    theme: 'light',
                    soundEffects: true,
                    showKeyboard: false,
                    highlightErrors: true,
                    showProgress: true,
                    autoRestart: false
                  };
                  setLocalSettings(defaultSettings);
                  onSettingsChange?.(defaultSettings);
                }}
              >
                Reset to Default
              </Button>

              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
              >
                Export Settings
              </Button>

              <Button
                variant="outline"
                size="sm"
                iconName="Upload"
                iconPosition="left"
              >
                Import Settings
              </Button>
            </div>
          </div>

          {/* Settings Preview */}
          <div className="bg-muted rounded-lg p-4">
            <h5 className="text-sm font-medium text-foreground mb-2">Preview</h5>
            <div
              className={`p-3 rounded border ${
                localSettings?.theme === 'dark' ? 'bg-gray-800 text-white border-gray-600' :
                localSettings?.theme === 'high-contrast' ? 'bg-black text-yellow-400 border-yellow-400' :
                localSettings?.theme === 'sepia'? 'bg-yellow-50 text-amber-900 border-amber-200' : 'bg-white text-gray-900 border-gray-200'
              }`}
              style={{
                fontSize: localSettings?.fontSize === 'small' ? '14px' :
                         localSettings?.fontSize === 'large' ? '18px' :
                         localSettings?.fontSize === 'extra-large' ? '20px' : '16px'
              }}
            >
              <span className={localSettings?.highlightErrors ? 'bg-red-100 text-red-800' : ''}>
                Sample typing text with error highlighting
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPanel;
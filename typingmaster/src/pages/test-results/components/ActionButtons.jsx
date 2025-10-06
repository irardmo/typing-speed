import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ActionButtons = ({
  testResults = {},
  onRetakeTest,
  onSaveResults,
  className = ''
}) => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleRetakeTest = () => {
    if (onRetakeTest) {
      onRetakeTest();
    } else {
      navigate('/typing-test-interface');
    }
  };

  const handleNewTest = () => {
    navigate('/typing-test-interface');
  };

  const handleSaveResults = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (onSaveResults) {
        onSaveResults(testResults);
      }

      // Save to localStorage as backup
      const savedResults = JSON.parse(localStorage.getItem('typingTestResults') || '[]');
      savedResults?.push({
        ...testResults,
        id: Date.now(),
        timestamp: new Date()?.toISOString()
      });
      localStorage.setItem('typingTestResults', JSON.stringify(savedResults));

    } catch (error) {
      console.error('Failed to save results:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportResults = async () => {
    setIsExporting(true);
    try {
      // Simulate PDF generation
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create downloadable content
      const resultsData = {
        testDate: new Date()?.toLocaleDateString(),
        wpm: testResults?.wpm || 65,
        accuracy: testResults?.accuracy || 94.5,
        testDuration: testResults?.testDuration || 60,
        totalKeystrokes: testResults?.totalKeystrokes || 325,
        correctKeystrokes: testResults?.correctKeystrokes || 307,
        errors: testResults?.errors || 18
      };

      const dataStr = JSON.stringify(resultsData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `typing-test-results-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
      document.body?.appendChild(link);
      link?.click();
      document.body?.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Failed to export results:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = (platform) => {
    const shareText = `I just completed a typing test! 🎯\n\n⚡ Speed: ${testResults?.wpm || 65} WPM\n🎯 Accuracy: ${testResults?.accuracy || 94.5}%\n\nTry TypingMaster and test your skills!`;
    const shareUrl = window.location?.origin;

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`
    };

    if (shareUrls?.[platform]) {
      window.open(shareUrls?.[platform], '_blank', 'width=600,height=400');
    }

    setShowShareMenu(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard?.writeText(window.location?.href);
      // You could show a toast notification here
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
    setShowShareMenu(false);
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Zap" size={20} className="text-primary" />
        <h2 className="text-lg font-heading font-semibold text-foreground">
          What's Next?
        </h2>
      </div>

      <div className="space-y-6">
        {/* Primary Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            variant="default"
            size="lg"
            onClick={handleRetakeTest}
            iconName="RotateCcw"
            iconPosition="left"
            fullWidth
          >
            Retake Same Test
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={handleNewTest}
            iconName="Play"
            iconPosition="left"
            fullWidth
          >
            Try Different Test
          </Button>
        </div>

        {/* Secondary Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button
            variant="secondary"
            onClick={handleSaveResults}
            loading={isSaving}
            iconName="Save"
            iconPosition="left"
            fullWidth
          >
            {isSaving ? 'Saving...' : 'Save Results'}
          </Button>

          <Button
            variant="secondary"
            onClick={handleExportResults}
            loading={isExporting}
            iconName="Download"
            iconPosition="left"
            fullWidth
          >
            {isExporting ? 'Exporting...' : 'Export PDF'}
          </Button>

          <div className="relative">
            <Button
              variant="secondary"
              onClick={() => setShowShareMenu(!showShareMenu)}
              iconName="Share2"
              iconPosition="left"
              fullWidth
            >
              Share Results
            </Button>

            {/* Share Dropdown */}
            {showShareMenu && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg z-150">
                <div className="p-2 space-y-1">
                  <button
                    onClick={() => handleShare('twitter')}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-md transition-colors duration-200"
                  >
                    <Icon name="Twitter" size={16} />
                    <span>Share on Twitter</span>
                  </button>
                  <button
                    onClick={() => handleShare('facebook')}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-md transition-colors duration-200"
                  >
                    <Icon name="Facebook" size={16} />
                    <span>Share on Facebook</span>
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-md transition-colors duration-200"
                  >
                    <Icon name="Linkedin" size={16} />
                    <span>Share on LinkedIn</span>
                  </button>
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-md transition-colors duration-200"
                  >
                    <Icon name="MessageCircle" size={16} />
                    <span>Share on WhatsApp</span>
                  </button>
                  <hr className="my-1 border-border" />
                  <button
                    onClick={handleCopyLink}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-md transition-colors duration-200"
                  >
                    <Icon name="Copy" size={16} />
                    <span>Copy Link</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="pt-4 border-t border-border">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button
              variant="ghost"
              onClick={() => navigate('/performance-dashboard')}
              iconName="BarChart3"
              iconPosition="left"
              fullWidth
            >
              View Dashboard
            </Button>

            <Button
              variant="ghost"
              onClick={() => navigate('/global-leaderboard')}
              iconName="Trophy"
              iconPosition="left"
              fullWidth
            >
              Leaderboard
            </Button>

            <Button
              variant="ghost"
              onClick={() => navigate('/test-results')}
              iconName="History"
              iconPosition="left"
              fullWidth
            >
              Test History
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay for share menu */}
      {showShareMenu && (
        <div
          className="fixed inset-0 z-140"
          onClick={() => setShowShareMenu(false)}
        />
      )}
    </div>
  );
};

export default ActionButtons;
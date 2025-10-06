import React from 'react';
import Icon from '../../../components/AppIcon';

const PrivacyLinks = () => {
  const handleLinkClick = (type) => {
    // In a real application, these would open actual policy pages
    console.log(`Opening ${type} page`);
  };

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="text-center space-y-4">
        {/* Security Notice */}
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Shield" size={16} className="text-success" />
          <span>Your data is protected with enterprise-grade security</span>
        </div>

        {/* Policy Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <button
            onClick={() => handleLinkClick('terms')}
            className="text-primary hover:text-primary/80 transition-colors duration-200 underline underline-offset-4"
          >
            Terms of Service
          </button>
          <span className="text-muted-foreground">•</span>
          <button
            onClick={() => handleLinkClick('privacy')}
            className="text-primary hover:text-primary/80 transition-colors duration-200 underline underline-offset-4"
          >
            Privacy Policy
          </button>
          <span className="text-muted-foreground">•</span>
          <button
            onClick={() => handleLinkClick('cookies')}
            className="text-primary hover:text-primary/80 transition-colors duration-200 underline underline-offset-4"
          >
            Cookie Policy
          </button>
        </div>

        {/* Copyright */}
        <div className="text-xs text-muted-foreground">
          © {new Date()?.getFullYear()} TypingMaster. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default PrivacyLinks;
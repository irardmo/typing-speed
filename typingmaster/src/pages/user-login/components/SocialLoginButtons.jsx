import React from 'react';
import Button from '../../../components/ui/Button';


const SocialLoginButtons = ({ onGoogleLogin, onGithubLogin, isLoading }) => {
  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        fullWidth
        onClick={onGoogleLogin}
        disabled={isLoading}
        iconName="Chrome"
        iconPosition="left"
        className="h-11"
      >
        Continue with Google
      </Button>

      <Button
        variant="outline"
        fullWidth
        onClick={onGithubLogin}
        disabled={isLoading}
        iconName="Github"
        iconPosition="left"
        className="h-11"
      >
        Continue with GitHub
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
    </div>
  );
};

export default SocialLoginButtons;
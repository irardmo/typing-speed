import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegistrationHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center space-y-4 mb-8">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-lg">
          <Icon name="Keyboard" size={32} color="white" />
        </div>
      </div>

      {/* Title and Description */}
      <div className="space-y-2">
        <h1 className="text-3xl font-heading font-semibold text-foreground">
          Join TypingMaster
        </h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Create your account to start improving your typing speed and accuracy with personalized tests and detailed analytics.
        </p>
      </div>

      {/* Login Link */}
      <div className="flex items-center justify-center space-x-2 text-sm">
        <span className="text-muted-foreground">Already have an account?</span>
        <Button
          variant="link"
          size="sm"
          onClick={() => navigate('/user-login')}
          className="p-0 h-auto font-medium"
        >
          Sign in here
        </Button>
      </div>
    </div>
  );
};

export default RegistrationHeader;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const SignUpPrompt = ({ isLoading }) => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/user-registration');
  };

  return (
    <div className="text-center pt-6 border-t border-border">
      <p className="text-sm text-muted-foreground mb-4">
        Don't have an account yet?
      </p>

      <Button
        variant="outline"
        fullWidth
        onClick={handleSignUpClick}
        disabled={isLoading}
        iconName="UserPlus"
        iconPosition="left"
        className="h-11"
      >
        Create Account
      </Button>
    </div>
  );
};

export default SignUpPrompt;
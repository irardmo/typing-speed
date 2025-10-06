import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
          <Icon name="Keyboard" size={32} color="white" />
        </div>
      </div>

      <h1 className="text-3xl font-heading font-semibold text-foreground mb-2">
        Welcome Back
      </h1>

      <p className="text-muted-foreground">
        Sign in to continue your typing journey and track your progress
      </p>
    </div>
  );
};

export default LoginHeader;
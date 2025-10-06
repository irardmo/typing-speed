import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../../components/ui/NavigationBar';
import LoginHeader from './components/LoginHeader';
import SocialLoginButtons from './components/SocialLoginButtons';
import LoginForm from './components/LoginForm';
import SignUpPrompt from './components/SignUpPrompt';

const UserLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Mock user credentials for demonstration
  const mockCredentials = {
    email: 'demo@typingmaster.com',
    password: 'demo123'
  };

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/performance-dashboard');
    }
  }, [navigate]);

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check credentials against mock data
      if (formData?.email === mockCredentials?.email && formData?.password === mockCredentials?.password) {
        // Successful login
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', 'Demo User');
        localStorage.setItem('userEmail', formData?.email);

        if (formData?.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }

        // Navigate to dashboard
        navigate('/performance-dashboard');
      } else {
        // Invalid credentials
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate social login delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful social login
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', `${provider} User`);
      localStorage.setItem('userEmail', `user@${provider?.toLowerCase()}.com`);

      navigate('/performance-dashboard');
    } catch (err) {
      setError(`Failed to sign in with ${provider}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <div className="pt-16 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-card rounded-lg shadow-lg border border-border p-8">
            <LoginHeader />

            <div className="space-y-6">
              <SocialLoginButtons
                onGoogleLogin={() => handleSocialLogin('Google')}
                onGithubLogin={() => handleSocialLogin('GitHub')}
                isLoading={isLoading}
              />

              <LoginForm
                onSubmit={handleLogin}
                isLoading={isLoading}
                error={error}
              />

              <SignUpPrompt isLoading={isLoading} />
            </div>
          </div>

          {/* Demo Credentials Info */}
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-2">Demo Credentials:</p>
            <div className="space-y-1 text-xs font-data">
              <p className="text-foreground">Email: {mockCredentials?.email}</p>
              <p className="text-foreground">Password: {mockCredentials?.password}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
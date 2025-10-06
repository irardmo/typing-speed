import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../../components/ui/NavigationBar';
import RegistrationHeader from './components/RegistrationHeader';
import SocialRegistration from './components/SocialRegistration';
import RegistrationForm from './components/RegistrationForm';
import PrivacyLinks from './components/PrivacyLinks';

const UserRegistration = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/typing-test-interface');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />

      {/* Main Content */}
      <div className="pt-16">
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            {/* Registration Card */}
            <div className="bg-card border border-border rounded-lg shadow-lg p-8">
              {/* Header */}
              <RegistrationHeader />

              {/* Social Registration Options */}
              <SocialRegistration />

              {/* Registration Form */}
              <RegistrationForm />

              {/* Privacy Links */}
              <PrivacyLinks />
            </div>

            {/* Additional Help */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Need help? Contact our support team at{' '}
                <a
                  href="mailto:support@typingmaster.com"
                  className="text-primary hover:text-primary/80 transition-colors duration-200"
                >
                  support@typingmaster.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
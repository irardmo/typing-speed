import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const NavigationBar = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Test',
      path: '/typing-test-interface',
      icon: 'Keyboard',
      tooltip: 'Start typing test'
    },
    {
      label: 'Results',
      path: '/test-results',
      icon: 'BarChart3',
      tooltip: 'View test results'
    },
    {
      label: 'Dashboard',
      path: '/performance-dashboard',
      icon: 'TrendingUp',
      tooltip: 'Performance analytics'
    },
    {
      label: 'Leaderboard',
      path: '/global-leaderboard',
      icon: 'Trophy',
      tooltip: 'Global rankings'
    }
  ];

  useEffect(() => {
    // Check authentication status from localStorage
    const authStatus = localStorage.getItem('isAuthenticated');
    const storedUsername = localStorage.getItem('username');

    if (authStatus === 'true' && storedUsername) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [location?.pathname]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogin = () => {
    navigate('/user-login');
  };

  const handleRegister = () => {
    navigate('/user-registration');
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUsername('');
    setUserMenuOpen(false);
    navigate('/user-login');
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-100 bg-card border-b border-border ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Icon name="Keyboard" size={20} color="white" />
              </div>
              <span className="text-xl font-heading font-semibold">TypingMaster</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  title={item?.tooltip}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={16} />
                  <span>{item?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* User Status & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* User Status Indicator */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 px-3 py-2 rounded-md hover:bg-muted"
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground text-sm font-medium">
                      {username?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden sm:block">{username}</span>
                  <Icon name="ChevronDown" size={16} />
                </button>

                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-lg z-150">
                    <div className="py-1">
                      <button
                        onClick={() => navigate('/performance-dashboard')}
                        className="flex items-center w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                      >
                        <Icon name="User" size={16} className="mr-2" />
                        Profile
                      </button>
                      <button
                        onClick={() => navigate('/performance-dashboard')}
                        className="flex items-center w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                      >
                        <Icon name="Settings" size={16} className="mr-2" />
                        Settings
                      </button>
                      <hr className="my-1 border-border" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-error hover:bg-error/10 transition-colors duration-200"
                      >
                        <Icon name="LogOut" size={16} className="mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogin}
                >
                  Sign In
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleRegister}
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-3 w-full px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={20} />
                <span>{item?.label}</span>
              </button>
            ))}

            {/* Mobile Auth Buttons */}
            {!isAuthenticated && (
              <div className="pt-4 border-t border-border space-y-2">
                <Button
                  variant="ghost"
                  fullWidth
                  onClick={handleLogin}
                  className="justify-start"
                >
                  <Icon name="LogIn" size={20} className="mr-3" />
                  Sign In
                </Button>
                <Button
                  variant="default"
                  fullWidth
                  onClick={handleRegister}
                  className="justify-start"
                >
                  <Icon name="UserPlus" size={20} className="mr-3" />
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-90 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default NavigationBar;
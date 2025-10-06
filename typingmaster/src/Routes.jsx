import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import UserLogin from './pages/user-login';
import GlobalLeaderboard from './pages/global-leaderboard';
import TestResults from './pages/test-results';
import UserRegistration from './pages/user-registration';
import TypingTestInterface from './pages/typing-test-interface';
import PerformanceDashboard from './pages/performance-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<GlobalLeaderboard />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/global-leaderboard" element={<GlobalLeaderboard />} />
        <Route path="/test-results" element={<TestResults />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/typing-test-interface" element={<TypingTestInterface />} />
        <Route path="/performance-dashboard" element={<PerformanceDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

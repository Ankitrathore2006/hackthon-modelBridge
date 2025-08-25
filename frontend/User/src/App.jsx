import Navbar from "./components/Navbar";
import DashboardSidebar from "./components/DashboardSidebar";

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import { useLocation } from "react-router-dom";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";
import { Dashboard } from './components/Dashboard';
import { BillingPage } from './pages/BillingPage';
import { ApiKeyPage } from './pages/ApiKeyPage';
import { ApiDocsPage } from './pages/ApiDocsPage';
import { ModelLogsPage } from './pages/ModelLogsPage';
import { ApiUsagePage } from './pages/ApiUsagePage';

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();
  const location = useLocation();
  
  // Don't show navbar on auth pages
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  
  // Show sidebar on authenticated pages (dashboard, billing, api-keys, etc.)
  const isAuthenticatedPage = authUser && !isAuthPage && location.pathname !== '/settings';

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}>
      {!isAuthPage && <Navbar />}

      {isAuthenticatedPage ? (
        <div className="flex h-screen pt-16">
          <DashboardSidebar />
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/billing" element={<BillingPage />} />
              <Route path="/api-keys" element={<ApiKeyPage />} />
              <Route path="/api-docs" element={<ApiDocsPage />} />
              <Route path="/api-usage" element={<ApiUsagePage />} />
              <Route path="/logs" element={<ModelLogsPage />} />
            </Routes>
          </main>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={authUser ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/dashboard" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/dashboard" />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}

      <Toaster />
    </div>
  );
};

export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SimSwapLogs from "./pages/SimSwapLogs";
import ReportScam from "./pages/ReportScam";
import Alerts from "./pages/Alerts";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ActivityLogs from "./pages/ActivityLogs";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { NotificationsProvider } from "./contexts/NotificationsContext";
import { PageContainer } from "./components/PageContainer";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <PageContainer>{children}</PageContainer>;
};

// The routes wrapped with AuthProvider
const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path="/home" element={<ProtectedRoute><Index /></ProtectedRoute>} />
    <Route path="/sim-swap-logs" element={<ProtectedRoute><SimSwapLogs /></ProtectedRoute>} />
    <Route path="/report-scam" element={<ProtectedRoute><ReportScam /></ProtectedRoute>} />
    <Route path="/alerts" element={<ProtectedRoute><Alerts /></ProtectedRoute>} />
    <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
    <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
    <Route path="/activity-logs" element={<ProtectedRoute><ActivityLogs /></ProtectedRoute>} />
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <NotificationsProvider>
            <AppRoutes />
          </NotificationsProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ClerkLoaded, ClerkLoading } from '@clerk/clerk-react';
import { Loader2 } from 'lucide-react';
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Nutrition from "./pages/Nutrition";
import Fitness from "./pages/Fitness";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import OAuthCallback from "./pages/OAuthCallback";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <>
      <ClerkLoading>
        <div className="h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </ClerkLoading>
      
      <ClerkLoaded>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/sso-callback" element={<OAuthCallback />} />
            
            {/* Routes protégées */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/nutrition" element={
              <ProtectedRoute>
                <Nutrition />
              </ProtectedRoute>
            } />
            <Route path="/fitness" element={
              <ProtectedRoute>
                <Fitness />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </ClerkLoaded>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

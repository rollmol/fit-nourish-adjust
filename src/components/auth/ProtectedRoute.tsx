
import { useAuth } from '@clerk/clerk-react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();

  if (!isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isSignedIn) {
    // Stocker l'URL actuelle pour pouvoir rediriger après connexion
    const redirectUrl = encodeURIComponent(location.pathname);
    // Rediriger vers la page d'authentification
    return <Navigate to={`/auth?redirect_url=${redirectUrl}`} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

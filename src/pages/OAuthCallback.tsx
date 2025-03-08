
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';

const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoaded, isSignedIn } = useAuth();
  
  useEffect(() => {
    if (!isLoaded) return;
    
    // Vérifier si l'authentification est réussie
    if (isSignedIn) {
      // Extraire l'URL de redirection des paramètres de requête si elle existe
      const params = new URLSearchParams(location.search);
      const redirectUrl = params.get('redirect_url') || '/';
      
      console.log("Authentification réussie, redirection vers:", redirectUrl);
      
      // Rediriger après un court délai pour permettre à Clerk de finaliser le processus
      const timer = setTimeout(() => {
        navigate(redirectUrl, { replace: true });
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isLoaded, isSignedIn, location, navigate]);
  
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary/30">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <p className="text-lg">Finalisation de l'authentification...</p>
    </div>
  );
};

export default OAuthCallback;

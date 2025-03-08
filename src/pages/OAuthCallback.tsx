
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Extraire l'URL de redirection des paramètres de requête si elle existe
    const params = new URLSearchParams(location.search);
    const redirectUrl = params.get('redirect_url') || '/';
    
    // Rediriger après un court délai pour permettre à Clerk de traiter l'authentification
    const timer = setTimeout(() => {
      navigate(redirectUrl, { replace: true });
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [location, navigate]);
  
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary/30">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <p className="text-lg">Finalisation de l'authentification...</p>
    </div>
  );
};

export default OAuthCallback;

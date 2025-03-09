
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import { toast } from '@/hooks/use-toast';

const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoaded, isSignedIn } = useAuth();
  const [redirectAttempted, setRedirectAttempted] = useState(false);
  
  useEffect(() => {
    if (!isLoaded) return;
    
    // Éviter les redirections multiples
    if (redirectAttempted) return;
    
    // Une fois l'authentification vérifiée
    if (isSignedIn) {
      setRedirectAttempted(true);
      
      // Extraire l'URL de redirection des paramètres de requête si elle existe
      const params = new URLSearchParams(location.search);
      const redirectUrl = params.get('redirect_url') || '/profile';
      
      console.log("Authentification réussie, redirection vers:", redirectUrl);
      toast({
        title: "Authentification réussie",
        description: "Vous êtes maintenant connecté",
      });
      
      // Redirection immédiate avec replace pour éviter les problèmes d'historique
      navigate(redirectUrl, { replace: true });
    }
  }, [isLoaded, isSignedIn, location, navigate, redirectAttempted]);
  
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary/30">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <p className="text-lg">Finalisation de l'authentification...</p>
    </div>
  );
};

export default OAuthCallback;

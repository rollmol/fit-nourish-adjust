
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import { toast } from '@/hooks/use-toast';

const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoaded, isSignedIn } = useAuth();
  const [processed, setProcessed] = useState(false);
  
  useEffect(() => {
    // Ne rien faire tant que Clerk n'est pas chargé
    if (!isLoaded) return;
    
    // Éviter les traitements multiples
    if (processed) return;
    
    console.log("État de l'authentification:", { isLoaded, isSignedIn });
    
    if (isSignedIn) {
      // Marquer comme traité immédiatement pour éviter les doubles redirections
      setProcessed(true);
      
      // Extraire l'URL de redirection des paramètres de requête si elle existe
      const params = new URLSearchParams(location.search);
      const redirectUrl = params.get('redirect_url') || '/profile';
      
      console.log("Authentification réussie, redirection vers:", redirectUrl);
      
      // Notification de succès
      toast({
        title: "Authentification réussie",
        description: "Vous êtes maintenant connecté",
      });
      
      // Utiliser setTimeout pour s'assurer que l'état est mis à jour avant la redirection
      setTimeout(() => {
        navigate(redirectUrl, { replace: true });
      }, 100);
    }
  }, [isLoaded, isSignedIn, location, navigate, processed]);
  
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary/30">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <p className="text-lg">Finalisation de l'authentification...</p>
    </div>
  );
};

export default OAuthCallback;

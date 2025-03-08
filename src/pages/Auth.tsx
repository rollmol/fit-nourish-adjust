
import React from 'react';
import { motion } from 'framer-motion';
import { SignIn, SignUp, useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '@/components/ui/GlassCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Auth: React.FC = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();
  
  // Rediriger vers la page d'accueil si déjà connecté
  React.useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate('/');
    }
  }, [isLoaded, isSignedIn, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary/30 p-4"
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">FitNourish</h1>
          <p className="text-muted-foreground mt-2">
            Connectez-vous pour accéder à toutes les fonctionnalités
          </p>
        </div>
        
        <GlassCard>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="signin">Connexion</TabsTrigger>
              <TabsTrigger value="signup">Inscription</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="p-4">
              <SignIn 
                routing="path" 
                path="/auth"
                signUpUrl="/auth?tab=signup"
                appearance={{
                  elements: {
                    card: "shadow-none bg-transparent",
                    headerTitle: "text-xl font-semibold",
                    headerSubtitle: "text-muted-foreground",
                    formButtonPrimary: "bg-primary hover:bg-primary/90",
                    formFieldLabel: "text-foreground font-medium",
                    formFieldInput: "bg-background border border-input",
                    footerActionLink: "text-primary hover:text-primary/90",
                  }
                }}
              />
            </TabsContent>
            
            <TabsContent value="signup" className="p-4">
              <SignUp 
                routing="path" 
                path="/auth"
                signInUrl="/auth?tab=signin"
                appearance={{
                  elements: {
                    card: "shadow-none bg-transparent",
                    headerTitle: "text-xl font-semibold",
                    headerSubtitle: "text-muted-foreground",
                    formButtonPrimary: "bg-primary hover:bg-primary/90",
                    formFieldLabel: "text-foreground font-medium",
                    formFieldInput: "bg-background border border-input",
                    footerActionLink: "text-primary hover:text-primary/90",
                  }
                }}
              />
            </TabsContent>
          </Tabs>
        </GlassCard>
      </div>
    </motion.div>
  );
};

export default Auth;

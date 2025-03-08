
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import Header from '@/components/layout/Header';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

const Index: React.FC = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    navigate('/auth');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <Header />
      <main>
        <section id="hero" className="py-20 md:py-32">
          <Hero />
          
          {!isSignedIn && (
            <div className="flex justify-center mt-8">
              <Button 
                size="lg" 
                onClick={handleAuthAction}
                className="animate-pulse"
              >
                <LogIn className="mr-2 h-5 w-5" />
                Créer un compte pour commencer
              </Button>
            </div>
          )}
        </section>
        
        <section id="features" className="py-20 bg-muted/30">
          <Features />
        </section>
      </main>
    </motion.div>
  );
};

export default Index;

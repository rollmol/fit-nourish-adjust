
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen pt-20 pb-16 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 filter blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 right-1/2 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/10 filter blur-3xl opacity-50" />
      </div>
      
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full">
            Votre chemin vers le bien-être
          </span>
        </motion.div>
        
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Des menus équilibrés et des exercices personnalisés pour{' '}
          <span className="text-primary">retrouver votre poids de forme</span>
        </motion.h1>
        
        <motion.p
          className="text-lg md:text-xl text-foreground/80 mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          FitNourish vous accompagne avec des menus saisonniers, des plans d'exercices adaptés et un suivi personnalisé pour atteindre vos objectifs.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Button asChild size="lg" className="gap-2 px-6">
            <Link to="/profile">
              Commencer maintenant
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2 px-6">
            <Link to="/nutrition">
              Explorer les menus
            </Link>
          </Button>
        </motion.div>
        
        <motion.div
          className="grid md:grid-cols-2 gap-6 mt-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <GlassCard intensity="medium" hoverEffect className="p-6">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-nutrition/10 flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6 text-nutrition" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Nutrition adaptée</h3>
              <p className="text-foreground/70">
                Des menus saisonniers, équilibrés et délicieux pour vous aider à perdre du poids tout en vous faisant plaisir.
              </p>
            </div>
          </GlassCard>
          
          <GlassCard intensity="medium" hoverEffect className="p-6">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-fitness/10 flex items-center justify-center mb-4">
                <Dumbbell className="w-6 h-6 text-fitness" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fitness personnalisé</h3>
              <p className="text-foreground/70">
                Des programmes d'exercices adaptés à votre niveau et à votre équipement, avec une progression intelligente.
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;

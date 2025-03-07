
import React from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Header from '@/components/layout/Header';

const Index: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <Header />
      <main>
        <Hero />
        <Features />
        
        {/* Appel à l'action */}
        <section className="py-20 px-4 text-center bg-primary/5">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Prêt à transformer votre vie ?</h2>
            <p className="text-xl mb-8">
              Commencez dès aujourd'hui votre parcours vers une meilleure santé avec FitNourish.
            </p>
            <a
              href="/profile"
              className="inline-block px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Créer mon profil
            </a>
          </div>
        </section>
        
        {/* Pied de page */}
        <footer className="py-12 px-4 bg-secondary/30">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm text-foreground/60">
              © {new Date().getFullYear()} FitNourish. Tous droits réservés.
            </p>
          </div>
        </footer>
      </main>
    </motion.div>
  );
};

export default Index;

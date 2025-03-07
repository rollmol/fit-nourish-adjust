
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import GlassCard from "@/components/ui/GlassCard";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 pb-12"
    >
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12 flex items-center justify-center">
        <GlassCard className="p-8 md:p-12 w-full max-w-md text-center">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl text-foreground/70 mb-8">
            Oups ! Cette page n'existe pas
          </p>
          <Link
            to="/"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Link>
        </GlassCard>
      </main>
    </motion.div>
  );
};

export default NotFound;

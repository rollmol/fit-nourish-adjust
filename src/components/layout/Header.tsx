
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Menu, X, Leaf, Dumbbell, User, LogOut, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth, UserButton } from '@clerk/clerk-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navigationItems = [
    { name: 'Accueil', path: '/', icon: null },
    { name: 'Nutrition', path: '/nutrition', icon: <Leaf className="w-4 h-4 mr-1" />, requiresAuth: true },
    { name: 'Fitness', path: '/fitness', icon: <Dumbbell className="w-4 h-4 mr-1" />, requiresAuth: true },
    { name: 'Profil', path: '/profile', icon: <User className="w-4 h-4 mr-1" />, requiresAuth: true },
  ];

  const handleAuthAction = () => {
    if (isSignedIn) {
      // La déconnexion est gérée par le UserButton
    } else {
      navigate('/auth');
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8',
        isScrolled
          ? 'py-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-slate-800/80'
          : 'py-5 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
              FN
            </div>
          </motion.div>
          <span className="text-xl font-medium tracking-tight">FitNourish</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-1">
          {navigationItems
            .filter(item => !item.requiresAuth || (item.requiresAuth && isSignedIn))
            .map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium flex items-center transition-all duration-200",
                  location.pathname === item.path
                    ? "bg-secondary text-foreground"
                    : "hover:bg-secondary/50 text-foreground/70 hover:text-foreground"
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          
          {/* Bouton de connexion/déconnexion */}
          {isSignedIn ? (
            <div className="ml-2">
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-2 flex items-center"
              onClick={handleAuthAction}
            >
              <LogIn className="w-4 h-4 mr-1" />
              Connexion
            </Button>
          )}
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center space-x-2 md:hidden">
          {isSignedIn && (
            <div className="mr-2">
              <UserButton afterSignOutUrl="/" />
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: isMobileMenuOpen ? 'auto' : 0, opacity: isMobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          'md:hidden overflow-hidden',
          isScrolled ? 'bg-white/90 dark:bg-slate-900/90' : 'bg-white dark:bg-slate-900'
        )}
      >
        <div className="px-2 pt-2 pb-4 space-y-1 max-w-7xl mx-auto">
          {navigationItems
            .filter(item => !item.requiresAuth || (item.requiresAuth && isSignedIn))
            .map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "block px-4 py-3 rounded-lg text-base font-medium flex items-center",
                  location.pathname === item.path
                    ? "bg-secondary text-foreground"
                    : "hover:bg-secondary/50 text-foreground/70 hover:text-foreground"
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          
          {/* Bouton de connexion pour mobile */}
          {!isSignedIn && (
            <Button 
              variant="outline" 
              className="w-full mt-2 flex items-center justify-center"
              onClick={handleAuthAction}
            >
              <LogIn className="w-4 h-4 mr-1" />
              Connexion
            </Button>
          )}
        </div>
      </motion.div>
    </header>
  );
};

export default Header;

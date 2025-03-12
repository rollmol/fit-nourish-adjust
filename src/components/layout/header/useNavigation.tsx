import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Leaf, Dumbbell, User } from 'lucide-react';

export interface NavigationItem {
  name: string;
  path: string;
  icon: JSX.Element | null;
  requiresAuth: boolean;
}

export const useNavigation = (isSignedIn: boolean) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Effet pour gérer le défilement
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile lors des changements de page
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Items de navigation
  const navigationItems: NavigationItem[] = [
    { name: 'Accueil', path: '/', icon: null, requiresAuth: false },
    { 
      name: 'Nutrition', 
      path: '/nutrition', 
      icon: <Leaf className="w-4 h-4 mr-1" />, 
      requiresAuth: true 
    },
    { 
      name: 'Fitness', 
      path: '/fitness', 
      icon: <Dumbbell className="w-4 h-4 mr-1" />, 
      requiresAuth: true 
    },
    { 
      name: 'Profil', 
      path: '/profile', 
      icon: <User className="w-4 h-4 mr-1" />, 
      requiresAuth: true 
    },
  ];

  // Filtrer les items selon l'état d'authentification
  const filteredItems = navigationItems.filter(
    item => !item.requiresAuth || (item.requiresAuth && isSignedIn)
  );

  return {
    isScrolled,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    location,
    navigationItems: filteredItems
  };
};


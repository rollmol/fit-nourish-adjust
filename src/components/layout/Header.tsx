import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@clerk/clerk-react';

// Import des composants
import Logo from './header/Logo';
import DesktopNav from './header/DesktopNav';
import MobileNav from './header/MobileNav';
import { useNavigation } from './header/useNavigation';

const Header: React.FC = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  
  const { 
    isScrolled, 
    isMobileMenuOpen, 
    setIsMobileMenuOpen, 
    location, 
    navigationItems 
  } = useNavigation(isSignedIn || false);

  const handleAuthAction = () => {
    if (!isSignedIn) {
      navigate('/auth');
    }
    // La déconnexion est gérée par le UserButton
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
        <Logo />

        {/* Desktop navigation */}
        <DesktopNav 
          navigationItems={navigationItems}
          currentPath={location.pathname}
          isSignedIn={isSignedIn || false}
          onAuthAction={handleAuthAction}
        />

        {/* Mobile navigation */}
        <MobileNav 
          navigationItems={navigationItems}
          currentPath={location.pathname}
          isSignedIn={isSignedIn || false}
          isScrolled={isScrolled}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          onAuthAction={handleAuthAction}
        />
      </div>
    </header>
  );
};

export default Header;


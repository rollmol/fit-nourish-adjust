import React from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import NavItem from './NavItem';
import UserMenu from './UserMenu';
import { UserButton } from '@clerk/clerk-react';
import { NavigationItem } from './useNavigation';
import { LogIn } from 'lucide-react';

interface MobileNavProps {
  navigationItems: NavigationItem[];
  currentPath: string;
  isSignedIn: boolean;
  isScrolled: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  onAuthAction: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({
  navigationItems,
  currentPath,
  isSignedIn,
  isScrolled,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  onAuthAction
}) => {
  return (
    <>
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

      {/* Mobile menu dropdown */}
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
          {navigationItems.map((item) => (
            <NavItem
              key={item.path}
              name={item.name}
              path={item.path}
              icon={item.icon}
              isActive={currentPath === item.path}
              isMobile={true}
            />
          ))}

          {/* Bouton de connexion pour mobile */}
          {!isSignedIn && (
            <Button
              variant="outline"
              className="w-full mt-2 flex items-center justify-center"
              onClick={onAuthAction}
            >
              <LogIn className="w-4 h-4 mr-1" />
              Connexion
            </Button>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default MobileNav;


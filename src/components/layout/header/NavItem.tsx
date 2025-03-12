import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavItemProps {
  name: string;
  path: string;
  icon: JSX.Element | null;
  isActive: boolean;
  isMobile?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ 
  name, 
  path, 
  icon, 
  isActive,
  isMobile = false
}) => {
  return (
    <Link
      to={path}
      className={cn(
        isMobile
          ? "block px-4 py-3 rounded-lg text-base font-medium flex items-center"
          : "px-4 py-2 rounded-full text-sm font-medium flex items-center transition-all duration-200",
        isActive
          ? "bg-secondary text-foreground"
          : "hover:bg-secondary/50 text-foreground/70 hover:text-foreground"
      )}
    >
      {icon}
      {name}
    </Link>
  );
};

export default NavItem;


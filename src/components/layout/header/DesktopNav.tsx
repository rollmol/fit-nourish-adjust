import React from 'react';
import NavItem from './NavItem';
import UserMenu from './UserMenu';
import { NavigationItem } from './useNavigation';

interface DesktopNavProps {
  navigationItems: NavigationItem[];
  currentPath: string;
  isSignedIn: boolean;
  onAuthAction: () => void;
}

const DesktopNav: React.FC<DesktopNavProps> = ({
  navigationItems,
  currentPath,
  isSignedIn,
  onAuthAction
}) => {
  return (
    <nav className="hidden md:flex space-x-1">
      {navigationItems.map((item) => (
        <NavItem
          key={item.path}
          name={item.name}
          path={item.path}
          icon={item.icon}
          isActive={currentPath === item.path}
        />
      ))}
      
      <UserMenu isSignedIn={isSignedIn} onAuthAction={onAuthAction} />
    </nav>
  );
};

export default DesktopNav;


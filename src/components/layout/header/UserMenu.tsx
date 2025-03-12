import React from 'react';
import { LogIn } from 'lucide-react';
import { UserButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';

interface UserMenuProps {
  isSignedIn: boolean;
  onAuthAction: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ isSignedIn, onAuthAction }) => {
  return isSignedIn ? (
    <div className="ml-2">
      <UserButton afterSignOutUrl="/" />
    </div>
  ) : (
    <Button
      variant="outline"
      size="sm"
      className="ml-2 flex items-center"
      onClick={onAuthAction}
    >
      <LogIn className="w-4 h-4 mr-1" />
      Connexion
    </Button>
  );
};

export default UserMenu;


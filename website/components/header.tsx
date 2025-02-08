import React from 'react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogout }) => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Medical Monitoring System</h1>
        {isLoggedIn && (
          <Button onClick={onLogout} variant="outline">
            Logout
          </Button>
        )}
      </div>
    </header>
  );
};


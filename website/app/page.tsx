"use client"
import React, { useState } from 'react';
import { Login, Signup } from '../auth';
import { Dashboard } from '../components/dashboard';
import { Header } from '../components/header';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)} />
      <main className="flex-grow container mx-auto py-8 px-4">
        {isLoggedIn ? (
          <Dashboard />
        ) : (
          <div className="max-w-md mx-auto">
            {showLogin ? (
              <Login onSwitch={() => setShowLogin(false)} onLogin={handleLogin} />
            ) : (
              <Signup onSwitch={() => setShowLogin(true)} />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;


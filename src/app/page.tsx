'use client';
import React, { useState } from 'react';
import LoginPage from './component/LoginPage';
import VotingSystem from './component/VotingSystem';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  const handleLogin = (username: string) => {
    setIsLoggedIn(true);
    setCurrentUser(username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <VotingSystem 
      currentUser={currentUser} 
      onLogout={handleLogout} 
    />
  );
}
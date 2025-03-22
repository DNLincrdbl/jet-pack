'use client';

import { useEffect } from 'react';
import ThemeSwitcher from './ThemeSwitcher';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  useEffect(() => {
    // Check if theme is stored in localStorage on initial load
    const storedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', storedTheme);
  }, []);

  return (
    <>
      <div className="bg-light-spots" />
      {children}
      <ThemeSwitcher />
    </>
  );
};

export default ClientLayout; 
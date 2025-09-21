
import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';

const ThemeContext = createContext();

const navLinks = [
  { title: 'Home', id: 'home' },
  { title: 'About', id: 'about' },
  { title: 'Projects', id: 'projects' },
  { title: 'Resume', id: 'resume' },
  { title: 'Contact', id: 'contact' },
];

const projectLinks = [
    { title: 'Project 1 — Crypto Risk', url: 'https://drive.google.com/drive/folders/1cvIZ0nbRI022NNEHhLUcRlc6VFNQEGCo' },
    { title: 'Project 2 — E-Commerce', url: 'https://drive.google.com/drive/folders/1ujHD_MZVCvIBBHDwB72kwxqbdRDrXSyg' }
]

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    // Apply theme class to body for global CSS targeting
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);
  
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

const useTheme = () => useContext(ThemeContext);

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProjectDropdownOpen, setProjectDropdownOpen] = useState(false);

    useEffect(() => {
      const handleScroll = () => setIsScrolled(window.scrollY > 40);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

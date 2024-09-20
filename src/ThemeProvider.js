import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const ThemeContext = createContext();

// Define light and dark themes as objects
const lightTheme = {
  backgroundColor: '#ffffff',
  textColor: '#111827',
  buttonBgColor: '#3b82f6',
  buttonHoverBgColor: '#2563eb',
};

const darkTheme = {
  backgroundColor: '#1a202c',
  textColor: '#e2e8f0',
  buttonBgColor: '#2d3748',
  buttonHoverBgColor: '#4a5568',
};

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const themeStyles = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeStyles }}>
      {children}
    </ThemeContext.Provider>
  );
};

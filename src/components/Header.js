import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    
    setIsDark(shouldBeDark);
    document.documentElement.setAttribute('data-theme', shouldBeDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Theme Toggle - only show on non-home pages */}
      {location.pathname !== '/' && (
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          <span className="theme-icon">
            {isDark ? '☀️' : '🌙'}
          </span>
        </button>
      )}

      {/* Header - only show on non-home pages */}
      {location.pathname !== '/' && (
        <header className="header">
          <div className="header-container">
            <Link to="/" className="logo">
              <span className="logo-icon">📚</span>
              <span className="logo-text">DocGen</span>
            </Link>

            <nav className="nav">
              <Link 
                to="/" 
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
              >
                🏠 Home
              </Link>
              <Link 
                to="/docs" 
                className={`nav-link ${isActive('/docs') ? 'active' : ''}`}
              >
                📖 Docs
              </Link>
            </nav>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
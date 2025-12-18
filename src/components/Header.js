import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

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
  
  // Don't show header on public pages
  const publicPages = ['/', '/login', '/signup'];
  const isPublicPage = publicPages.includes(location.pathname);

  if (isPublicPage) {
    return null;
  }

  return (
    <>
      {/* Theme Toggle */}
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        <span className="theme-icon">
          {isDark ? '☀️' : '🌙'}
        </span>
      </button>

      {/* Header */}
      <header className="header">
        <div className="header-container">
          <Link to="/dashboard" className="logo">
            <span className="logo-icon">📚</span>
            <span className="logo-text">DocGen</span>
          </Link>

          <nav className="nav">
            <Link 
              to="/dashboard" 
              className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
            >
              🏠 Dashboard
            </Link>
            <Link 
              to="/docs" 
              className={`nav-link ${isActive('/docs') ? 'active' : ''}`}
            >
              📖 Docs
            </Link>
          </nav>
          
          <div className="nav-user">
            <span className="user-info">
              👋 {user?.username}
            </span>
            <button onClick={logout} className="logout-btn">
              🚪 Logout
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
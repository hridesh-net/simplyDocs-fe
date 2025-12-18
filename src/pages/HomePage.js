import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

  // Theme management
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!repoUrl.trim()) {
      setError('Please enter a GitHub repository URL');
      return;
    }

    // Basic GitHub URL validation
    const githubUrlPattern = /^https:\/\/github\.com\/[\w\-.]+\/[\w\-.]+\/?$/;
    if (!githubUrlPattern.test(repoUrl.trim())) {
      setError('Please enter a valid GitHub repository URL (e.g., https://github.com/user/repo)');
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Replace with actual API call to backend
      // const response = await fetch('/api/generate', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ repoUrl })
      // });
      
      await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate API call
      
      // Redirect to docs page after successful generation
      navigate('/docs');
      
    } catch (err) {
      setError('Failed to generate documentation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Background Decorations */}
      <div className="bg-decoration">
        <div className="grid-pattern"></div>
        <div className="bg-orb"></div>
        <div className="bg-orb"></div>
        <div className="bg-orb"></div>
      </div>

      {/* Theme Toggle - only on home page */}
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        <span className="theme-icon">
          {isDark ? '☀️' : '🌙'}
        </span>
      </button>

      <div className="container">
        <div className="hero">
          {/* Hero Badge */}
          <div className="hero-badge">
            <span>✨</span>
            AI-Powered Documentation Generator
          </div>

          <h1>Turn Your GitHub Repos Into Beautiful Docs</h1>
          <p>
            Generate comprehensive, searchable documentation from your code automatically. 
            Perfect for students, developers, and teams who want to focus on building, not documenting.
          </p>

          <form onSubmit={handleSubmit} className="input-group">
            <div className="input-container">
              <input
                type="url"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/username/repository"
                className="input-primary"
                disabled={isLoading}
              />
            </div>
            
            {error && (
              <p className="error">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
            >
              {isLoading ? (
                <div className="loading">
                  <div className="spinner"></div>
                  <span>Generating Documentation...</span>
                </div>
              ) : (
                '🚀 Generate Docs'
              )}
            </button>
          </form>

          <div className="features">
            <div className="feature-card">
              <span className="feature-icon">⚡</span>
              <h3>Lightning Fast</h3>
              <p>Generate comprehensive docs in minutes, not hours. Our AI analyzes your code structure and creates beautiful documentation automatically.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🔍</span>
              <h3>Smart & Searchable</h3>
              <p>Intelligent search across all your docs. Find functions, classes, and explanations instantly with our powerful search engine.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">👥</span>
              <h3>Team Friendly</h3>
              <p>Perfect for student projects and team collaborations. Share beautiful docs that help everyone understand your codebase.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
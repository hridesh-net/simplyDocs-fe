import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [isDark, setIsDark] = useState(false);

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

  return (
    <>
      {/* Background Decorations */}
      <div className="bg-decoration">
        <div className="grid-pattern"></div>
        <div className="bg-orb"></div>
        <div className="bg-orb"></div>
        <div className="bg-orb"></div>
      </div>

      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon">📚</span>
            <span className="logo-text">DocGen</span>
          </div>
          
          <div className="nav-actions">
            <button className="theme-toggle-nav" onClick={toggleTheme}>
              {isDark ? '☀️' : '🌙'}
            </button>
            <Link to="/login" className="nav-btn secondary">
              Login
            </Link>
            <Link to="/signup" className="nav-btn primary">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>✨</span>
              AI-Powered Documentation Generator
            </div>
            
            <h1 className="hero-title">
              Transform Your Code Into
              <span className="gradient-text"> Beautiful Documentation</span>
            </h1>
            
            <p className="hero-subtitle">
              Stop spending hours writing documentation. Our AI analyzes your GitHub repositories 
              and generates comprehensive, searchable docs automatically. Perfect for developers, 
              students, and teams who want to focus on building amazing software.
            </p>
            
            <div className="hero-actions">
              <Link to="/signup" className="btn-hero primary">
                🚀 Start Generating Docs
              </Link>
              <button className="btn-hero secondary" onClick={() => {
                document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' });
              }}>
                📖 See How It Works
              </button>
            </div>
            
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Repositories Processed</span>
              </div>
              <div className="stat">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Docs Generated</span>
              </div>
              <div className="stat">
                <span className="stat-number">99%</span>
                <span className="stat-label">Developer Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="landing-section">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Generate beautiful documentation in just 3 simple steps</p>
          </div>
          
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon">🔗</div>
              <h3>Connect Repository</h3>
              <p>Simply paste your GitHub repository URL. We support all major programming languages and frameworks.</p>
            </div>
            
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon">🤖</div>
              <h3>AI Analysis</h3>
              <p>Our AI analyzes your code structure, comments, and README files to understand your project deeply.</p>
            </div>
            
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon">📚</div>
              <h3>Beautiful Docs</h3>
              <p>Get comprehensive, searchable documentation with examples, API references, and setup guides.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Developers Love DocGen</h2>
            <p>Powerful features that make documentation effortless</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Lightning Fast</h3>
              <p>Generate comprehensive documentation in minutes, not hours. Our AI processes your entire codebase quickly.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Smart Search</h3>
              <p>Find anything instantly with intelligent search across functions, classes, and concepts.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Beautiful Design</h3>
              <p>Professional-looking docs with syntax highlighting, responsive design, and dark/light themes.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3>Auto-Updates</h3>
              <p>Documentation stays in sync with your code changes automatically.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Team Collaboration</h3>
              <p>Share docs with your team and collaborate on improving documentation quality.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🌐</div>
              <h3>Multi-Language</h3>
              <p>Supports Python, JavaScript, Java, Go, Rust, and many more programming languages.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="landing-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Documentation?</h2>
            <p>Join thousands of developers who've made documentation effortless with DocGen</p>
            <div className="cta-actions">
              <Link to="/signup" className="btn-cta primary">
                🚀 Get Started Free
              </Link>
              <Link to="/login" className="btn-cta secondary">
                Already have an account? Sign in
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <span className="logo-icon">📚</span>
              <span className="logo-text">DocGen</span>
            </div>
            <p>Making documentation beautiful, one repository at a time.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
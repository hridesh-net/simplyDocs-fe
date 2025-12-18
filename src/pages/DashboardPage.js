import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { docsAPI, ApiError } from '../utils/api';

const DashboardPage = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!repoUrl.trim()) {
      setError('Please enter a GitHub repository URL');
      return;
    }

    // Basic GitHub URL validation - updated to handle .git suffix
    const githubUrlPattern = /^https:\/\/github\.com\/[\w\-.]+\/[\w\-.]+(?:\.git)?\/?$/;
    if (!githubUrlPattern.test(repoUrl.trim())) {
      setError('Please enter a valid GitHub repository URL (e.g., https://github.com/user/repo or https://github.com/user/repo.git)');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await docsAPI.generateDocs({ repoUrl });
      
      if (response.success) {
        // Show success message
        setSuccess(response.message);
        
        // Redirect after showing success message
        setTimeout(() => {
          navigate('/docs');
        }, 2000);
      } else {
        setError('Documentation generation failed. Please try again.');
      }
      
    } catch (err) {
      console.error('Error generating docs:', err);
      
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to generate documentation. Please try again.');
      }
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

            {success && (
              <div className="success-message">
                ✅ {success}
                <br />
                <small>Redirecting to documentation...</small>
              </div>
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

export default DashboardPage;
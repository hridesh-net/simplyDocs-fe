import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DocsListPage = () => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    try {
      setLoading(true);
      setError('');
      
      // TODO: Replace with actual API endpoint
      // const response = await fetch('/api/docs');
      // const data = await response.json();
      
      // For now, use mock data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Mock data that matches your exact backend API response
      const mockData = [
        {
          "id": "introduction",
          "title": "Introduction to Data Engineering",
          "description": "High-level overview of what data engineering covers and key concepts.",
          "slug": "introduction",
          "last_updated": "2025-12-10T10:15:00Z"
        },
        {
          "id": "setup",
          "title": "Setup & Installation",
          "description": "How to clone the repo and install dependencies for the project.",
          "slug": "setup",
          "last_updated": "2025-12-10T10:20:00Z"
        }
      ];
      
      setDocs(mockData);
    } catch (err) {
      setError('Failed to fetch documentation. Please try again.');
      console.error('Error fetching docs:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="docs-page">
        <div className="bg-decoration">
          <div className="grid-pattern"></div>
          <div className="bg-orb"></div>
          <div className="bg-orb"></div>
          <div className="bg-orb"></div>
        </div>
        
        <div className="container">
          <div className="docs-header">
            <h1>📚 Documentation</h1>
            <p>Loading your generated documentation...</p>
          </div>
          
          <div className="loading-container">
            <div className="spinner large"></div>
            <p>Fetching documentation...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="docs-page">
        <div className="bg-decoration">
          <div className="grid-pattern"></div>
          <div className="bg-orb"></div>
          <div className="bg-orb"></div>
          <div className="bg-orb"></div>
        </div>
        
        <div className="container">
          <div className="docs-header">
            <h1>📚 Documentation</h1>
            <p>Browse through your generated documentation</p>
          </div>
          
          <div className="error-container">
            <div className="error-card">
              <span className="error-icon">⚠️</span>
              <h3>Error Loading Documentation</h3>
              <p>{error}</p>
              <button onClick={fetchDocs} className="btn-primary">
                🔄 Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (docs.length === 0) {
    return (
      <div className="docs-page">
        <div className="bg-decoration">
          <div className="grid-pattern"></div>
          <div className="bg-orb"></div>
          <div className="bg-orb"></div>
          <div className="bg-orb"></div>
        </div>
        
        <div className="container">
          <div className="docs-header">
            <h1>📚 Documentation</h1>
            <p>Browse through your generated documentation</p>
          </div>
          
          <div className="empty-state">
            <div className="empty-card">
              <span className="empty-icon">📄</span>
              <h3>No Documentation Found</h3>
              <p>Generate documentation from a GitHub repository to see it here.</p>
              <Link to="/" className="btn-primary">
                🚀 Generate Documentation
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="docs-page">
      <div className="bg-decoration">
        <div className="grid-pattern"></div>
        <div className="bg-orb"></div>
        <div className="bg-orb"></div>
        <div className="bg-orb"></div>
      </div>
      
      <div className="container">
        <div className="docs-header">
          <h1>📚 Documentation</h1>
          <p>Browse through your generated documentation ({docs.length} documents)</p>
        </div>
        
        <div className="docs-grid">
          {docs.map((doc, index) => (
            <Link 
              key={doc.id} 
              to={`/docs/${doc.slug}`} 
              className="doc-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="doc-card-header">
                <h3 className="doc-title">{doc.title}</h3>
                <span className="doc-arrow">→</span>
              </div>
              
              <p className="doc-description">{doc.description}</p>
              
              <div className="doc-meta">
                <span className="doc-id">#{doc.id}</span>
                <span className="doc-updated">
                  🕒 {formatDate(doc.last_updated)}
                </span>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="docs-footer">
          <p>
            Need to generate more documentation? 
            <Link to="/" className="footer-link">Go back to home</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DocsListPage;
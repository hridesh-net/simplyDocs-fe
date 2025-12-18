import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { docsAPI, ApiError } from '../utils/api';

const DocsListPage = () => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDocs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDocs = async () => {
    try {
      setLoading(true);
      setError('');
      
      const data = await docsAPI.getDocsList();
      
      // Transform backend data to match frontend expectations
      const transformedDocs = data.map(doc => ({
        id: doc.id,
        title: doc.title,
        description: doc.description,
        slug: doc.slug,
        last_updated: doc.created_at, // Backend uses created_at
        html_path: doc.html_path // Keep for potential future use
      }));
      
      setDocs(transformedDocs);
    } catch (err) {
      console.error('Error fetching docs:', err);
      
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to fetch documentation. Please try again.');
      }
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
          {docs.length > 0 && (
            <div className="docs-stats">
              <span className="stat-badge">
                📄 {docs.length} Documents
              </span>
              <span className="stat-badge">
                🕒 Last updated: {formatDate(docs[0]?.last_updated)}
              </span>
            </div>
          )}
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
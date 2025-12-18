import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { docsAPI, ApiError } from '../utils/api';

const DocViewerPage = () => {
  const { slug } = useParams();
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDoc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const fetchDoc = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Backend returns raw HTML content
      const htmlContent = await docsAPI.getDoc(slug);
      
      // Create doc object with the HTML content
      const doc = {
        id: slug,
        title: slug.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
        content: htmlContent, // Raw HTML from backend
        last_updated: new Date().toISOString()
      };
      
      setDoc(doc);
    } catch (err) {
      console.error('Error fetching doc:', err);
      
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to fetch documentation content.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="doc-viewer-page">
        <div className="bg-decoration">
          <div className="grid-pattern"></div>
          <div className="bg-orb"></div>
          <div className="bg-orb"></div>
          <div className="bg-orb"></div>
        </div>
        
        <div className="container">
          <div className="loading-container">
            <div className="spinner large"></div>
            <p>Loading documentation...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !doc) {
    return (
      <div className="doc-viewer-page">
        <div className="bg-decoration">
          <div className="grid-pattern"></div>
          <div className="bg-orb"></div>
          <div className="bg-orb"></div>
          <div className="bg-orb"></div>
        </div>
        
        <div className="container">
          <div className="error-container">
            <div className="error-card">
              <span className="error-icon">⚠️</span>
              <h3>Documentation Not Found</h3>
              <p>{error || 'The requested documentation could not be found.'}</p>
              <Link to="/docs" className="btn-primary">
                ← Back to Documentation
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="doc-viewer-page">
      <div className="bg-decoration">
        <div className="grid-pattern"></div>
        <div className="bg-orb"></div>
        <div className="bg-orb"></div>
        <div className="bg-orb"></div>
      </div>
      
      <div className="container">
        <div className="mb-6">
          <Link 
            to="/docs" 
            className="back-link"
          >
            ← Back to Documentation
          </Link>
        </div>
        
        <article className="doc-content bg-primary border rounded-2xl shadow-xl p-8 transition">
          <header className="border-b pb-6 mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">{doc.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-secondary">
              <span className="flex items-center gap-2">
                📄 <span className="font-medium">Document ID:</span> {doc.id}
              </span>
              <span className="flex items-center gap-2">
                🕒 <span className="font-medium">Last updated:</span> {new Date(doc.last_updated).toLocaleDateString()}
              </span>
            </div>
          </header>
          
          <div 
            className="doc-content-wrapper"
            dangerouslySetInnerHTML={{ __html: doc.content }}
          />
        </article>
      </div>
    </div>
  );
};

export default DocViewerPage;
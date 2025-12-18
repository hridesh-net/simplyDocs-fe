import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const DocViewerPage = () => {
  const { slug } = useParams();
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDoc();
  }, [slug]);

  const fetchDoc = async () => {
    try {
      setLoading(true);
      setError('');
      
      // TODO: Replace with actual API endpoint
      // const response = await fetch(`/api/docs/${slug}`);
      // if (!response.ok) throw new Error('Failed to fetch documentation');
      // const htmlContent = await response.text(); // Backend returns raw HTML
      
      // For now, use mock data that matches your backend format
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock HTML content that matches your backend response
      const mockHtmlContent = slug === 'setup' 
        ? `<h1>Setup & Installation</h1>
           <p>This document explains how to clone the repository and install dependencies.</p>
           <h2>Step 1: Clone</h2>
           <p>Run <code>git clone https://github.com/username/repository.git</code></p>
           <h2>Step 2: Install Dependencies</h2>
           <p>Navigate to the project directory and run:</p>
           <pre><code>npm install</code></pre>
           <h2>Step 3: Start Development Server</h2>
           <p>Run the following command to start the development server:</p>
           <pre><code>npm start</code></pre>`
        : `<h1>Introduction to Data Engineering</h1>
           <p>High-level overview of what data engineering covers and key concepts.</p>
           <h2>What is Data Engineering?</h2>
           <p>Data engineering is the practice of designing and building systems for collecting, storing, and analyzing data at scale.</p>
           <h2>Key Concepts</h2>
           <ul>
             <li><strong>Data Pipelines</strong> - Automated workflows for data processing</li>
             <li><strong>ETL/ELT</strong> - Extract, Transform, Load processes</li>
             <li><strong>Data Warehousing</strong> - Centralized data storage solutions</li>
             <li><strong>Stream Processing</strong> - Real-time data processing</li>
           </ul>`;
      
      // Create doc object with the HTML content
      const mockDoc = {
        id: slug,
        title: slug === 'setup' ? 'Setup & Installation' : 'Introduction to Data Engineering',
        content: mockHtmlContent, // Raw HTML from backend
        last_updated: new Date().toISOString()
      };
      
      setDoc(mockDoc);
    } catch (err) {
      setError('Failed to fetch documentation content.');
      console.error('Error fetching doc:', err);
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
        <div className="doc-nav">
          <Link to="/docs" className="back-link">
            ← Back to Documentation
          </Link>
        </div>
        
        <article className="doc-content">
          <header className="doc-header">
            <h1>{doc.title}</h1>
            <div className="doc-meta">
              <span>📄 {doc.id}</span>
              <span>🕒 Last updated: {new Date(doc.last_updated).toLocaleDateString()}</span>
            </div>
          </header>
          
          <div 
            className="doc-body"
            dangerouslySetInnerHTML={{ __html: doc.content }}
          />
        </article>
      </div>
    </div>
  );
};

export default DocViewerPage;
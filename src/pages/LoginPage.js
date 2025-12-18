import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    const result = await login(formData);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-page">
      {/* Background Decorations */}
      <div className="bg-decoration">
        <div className="grid-pattern"></div>
        <div className="bg-orb"></div>
        <div className="bg-orb"></div>
        <div className="bg-orb"></div>
      </div>

      <div className="auth-container">
        {/* Back to Home */}
        <Link to="/" className="auth-back">
          ← Back to Home
        </Link>

        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">
              <span className="logo-icon">📚</span>
              <span className="logo-text">DocGen</span>
            </div>
            <h1>Welcome Back</h1>
            <p>Sign in to your account to continue generating beautiful documentation</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="form-input"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="form-input"
                disabled={loading}
              />
            </div>

            {error && (
              <div className="auth-error">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="auth-submit"
            >
              {loading ? (
                <div className="loading">
                  <div className="spinner"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                '🚀 Sign In'
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="auth-link">
                Sign up for free
              </Link>
            </p>
          </div>

          {/* Backend Info */}
          <div className="demo-info">
            <p><strong>Backend:</strong> Connected to {process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000'}</p>
            <p>Create an account or use existing credentials to login.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
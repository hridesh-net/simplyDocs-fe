import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, ApiError } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app load
    const savedToken = localStorage.getItem('auth_token');
    if (savedToken) {
      setToken(savedToken);
      // Verify token and get user info
      getCurrentUser(savedToken);
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCurrentUser = async (authToken) => {
    try {
      // Store token temporarily for the API call
      const originalToken = localStorage.getItem('auth_token');
      if (authToken && authToken !== originalToken) {
        localStorage.setItem('auth_token', authToken);
      }
      
      const userData = await authAPI.getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Failed to get current user:', error);
      if (error instanceof ApiError && error.status === 401) {
        // Token is invalid, logout user
        logout();
      } else {
        // Other errors, still logout for safety
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const data = await authAPI.login(credentials);
      
      // Save token and get user info
      setToken(data.access_token);
      localStorage.setItem('auth_token', data.access_token);
      
      // Get user information
      await getCurrentUser(data.access_token);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      
      if (error instanceof ApiError) {
        return { success: false, error: error.message };
      }
      
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const signup = async (userData) => {
    try {
      const data = await authAPI.signup(userData);
      return { success: true, user: data };
    } catch (error) {
      console.error('Signup error:', error);
      
      if (error instanceof ApiError) {
        return { success: false, error: error.message };
      }
      
      return { success: false, error: 'Signup failed. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
  };

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
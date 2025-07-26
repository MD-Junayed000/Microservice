import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate login validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Simulate API call delay
    setTimeout(() => {
      // For demo purposes, accept any email/password
      const userData = {
        id: 'user123',
        name: email.split('@')[0], // Use email prefix as name
        email: email,
        role: 'student'
      };
      
      login(userData);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="card" style={{ maxWidth: 400, margin: '40px auto' }}>
      <h2>🔐 Welcome Back</h2>
      <p style={{ color: '#666', marginBottom: '24px', textAlign: 'center' }}>
        Sign in to your CUETxRIDES account
      </p>
      
      <form className="flex-col" onSubmit={handleSubmit}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2d6cdf' }}>
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2d6cdf' }}>
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        
        {error && (
          <div style={{ 
            padding: '12px', 
            borderRadius: '8px', 
            background: 'rgba(244, 67, 54, 0.1)',
            color: '#d32f2f',
            border: '1px solid #f44336',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}
        
        <button type="submit" disabled={loading} style={{ marginTop: '16px' }}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
        
        <p style={{ textAlign: 'center', marginTop: '16px', color: '#666', fontSize: '0.9rem' }}>
          Don't have an account?{' '}
          <a href="/register" style={{ color: '#2d6cdf', textDecoration: 'none', fontWeight: '600' }}>
            Sign up here
          </a>
        </p>
      </form>
    </div>
  );
} 
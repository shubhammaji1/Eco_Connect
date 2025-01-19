import React, { useState } from 'react';
import { User, Lock, Mail } from 'lucide-react';
import '../../public/css/vendorVault.css';
import { logIn, signUp } from '../api';
import VendorDashboard from './VenderDashboard';

function LoginForm({ onLogin, onToggleForm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await logIn({ email, password });
      onLogin(data.user);
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Login to VendorVault</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="input-group">
        <Mail className="input-icon" />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <Lock className="input-icon" />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="submit-btn">Login</button>
      <p className='vendorvault-signup'>
        Don't have an account?{' '}
        <button type="button" onClick={onToggleForm} className="toggle-form-btn">
          Sign up
        </button>
      </p>
    </form>
  );
}

function SignupForm({ onToggleForm }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      await signUp({ name, email, password });
      alert('Sign up successful! Please log in.');
      onToggleForm();
    } catch (error) {
      setError(error.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Sign up for VendorVault</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="input-group">
        <User className="input-icon" />
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <Mail className="input-icon" />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <Lock className="input-icon" />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <Lock className="input-icon" />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="submit-btn">Sign Up</button>
      <p className='vendorvault-signup'>
        Already have an account?{' '}
        <button type="button" onClick={onToggleForm} className="toggle-form-btn">
          Login
        </button>
      </p>
    </form>
  );
}

export function VendorVault() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="vendor-vault">
      <h1>VendorVault</h1>
      {user ? (
        <VendorDashboard user={user} />
      ) : isLogin ? (
        <LoginForm onLogin={handleLogin} onToggleForm={toggleForm} />
      ) : (
        <SignupForm onToggleForm={toggleForm} />
      )}
    </div>
  );
}

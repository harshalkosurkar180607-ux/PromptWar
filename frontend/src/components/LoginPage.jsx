import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Utensils, 
  Landmark, 
  ShieldCheck, 
  Star, 
  CloudSun, 
  MapPin, 
  Sparkles,
  CheckCircle2,
  AlertCircle,
  User
} from 'lucide-react';

export default function LoginPage({ onLoginSuccess, onExploreAsGuest }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState('explorer@cityvibe.com');
  const [password, setPassword] = useState('explore2026');
  const [fullName, setFullName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!identifier.trim()) {
      setErrorMsg('Please enter your email or phone number.');
      return;
    }
    if (!password || password.length < 4) {
      setErrorMsg('Password must be at least 4 characters.');
      return;
    }
    if (isSignUp && !fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    setIsLoading(true);

    // Simulate authentic verification delay
    setTimeout(() => {
      setIsLoading(false);
      const user = {
        name: isSignUp ? fullName.trim() : (identifier.split('@')[0] || 'Explorer'),
        email: identifier.includes('@') ? identifier : `${identifier}@cityvibe.user`,
        loggedInAt: new Date().toLocaleTimeString(),
        rememberMe
      };

      if (rememberMe) {
        localStorage.setItem('cityvibe_auth_user', JSON.stringify(user));
      } else {
        sessionStorage.setItem('cityvibe_auth_user', JSON.stringify(user));
      }

      onLoginSuccess(user);
    }, 700);
  };

  // Google Login Simulation
  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user = {
        name: 'Google Explorer',
        email: 'traveler.google@cityvibe.com',
        loggedInAt: new Date().toLocaleTimeString(),
        provider: 'google'
      };
      localStorage.setItem('cityvibe_auth_user', JSON.stringify(user));
      onLoginSuccess(user);
    }, 600);
  };

  // Demo auto-fill
  const fillDemoAccount = () => {
    setIdentifier('explorer@cityvibe.com');
    setPassword('explore2026');
    setErrorMsg('');
  };

  const handleSendReset = (e) => {
    e.preventDefault();
    if (!resetEmail.trim()) return;
    setResetSent(true);
    setTimeout(() => {
      setShowForgotModal(false);
      setResetSent(false);
      setResetEmail('');
    }, 2800);
  };

  return (
    <div className="login-page-container">
      {/* Background Layer with Photographic Cityscape */}
      <div className="login-bg-backdrop" />
      <div className="login-overlay-glow" />

      {/* Top Navigation Bar with Quick Actions */}
      <header className="login-top-bar">
        {/* Playful Top-Right Hand-Drawn Annotation */}
        <div className="explore-scribble" title="Explore CityPulse Dashboard">
          <span>Explore Your City</span>
          <svg width="34" height="26" viewBox="0 0 34 26" fill="none">
            <path d="M2 18C10 6 22 4 28 8M28 8L20 6M28 8L28 16" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <button 
          id="btn-guest-shortcut"
          className="btn-guest-link"
          onClick={onExploreAsGuest}
          title="Directly enter without logging in"
        >
          <span>Continue as Guest</span>
          <ArrowRight size={15} />
        </button>
      </header>

      {/* Main Split Grid */}
      <div className="login-main-wrapper">
        {/* ================= LEFT COLUMN: HERO & FEATURE HIGHLIGHTS ================= */}
        <div className="login-hero-col">
          {/* Brand Logo & Subtitle */}
          <div className="cityvibe-brand">
            <img 
              src="./cityvibe_logo.jpg" 
              alt="CityVibe Official Logo" 
              className="cityvibe-logo-img"
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                objectFit: 'cover',
                boxShadow: '0 0 24px rgba(250, 204, 21, 0.5), 0 4px 16px rgba(0, 0, 0, 0.7)',
                border: '2px solid rgba(250, 204, 21, 0.75)',
                flexShrink: 0
              }}
            />
            <div>
              <div className="cityvibe-title">
                <span className="brand-white">City</span>
                <span className="brand-gold">Vibe</span>
              </div>
              <div className="cityvibe-sub">Explore • Experience • Stay Safe</div>
            </div>
          </div>

          {/* Hero Headline */}
          <div className="hero-text-block">
            <h1 className="hero-heading-main">
              Your City,<br />
              <span className="hero-heading-script">Smartly Explored</span>
            </h1>
            <p className="hero-subtext">
              Discover hidden gems, explore rich history, stay safe, and get real-time city insights — all in one place.
            </p>
          </div>

          {/* 6 Category Feature Badges Grid */}
          <div className="features-badge-grid">
            {/* Badge 1: Food */}
            <div className="feature-pill-item">
              <div className="icon-cube cube-orange">
                <Utensils size={18} color="#ffffff" />
              </div>
              <span className="feature-pill-label">Food &amp; Hospitality</span>
            </div>

            {/* Badge 2: History */}
            <div className="feature-pill-item">
              <div className="icon-cube cube-purple">
                <Landmark size={18} color="#ffffff" />
              </div>
              <span className="feature-pill-label">History &amp; Culture</span>
            </div>

            {/* Badge 3: Safety */}
            <div className="feature-pill-item">
              <div className="icon-cube cube-green">
                <ShieldCheck size={18} color="#ffffff" />
              </div>
              <span className="feature-pill-label">Safety &amp; Security</span>
            </div>

            {/* Badge 4: Comparison */}
            <div className="feature-pill-item">
              <div className="icon-cube cube-blue">
                <Star size={18} color="#ffffff" />
              </div>
              <span className="feature-pill-label">Best vs Worst Places</span>
            </div>

            {/* Badge 5: Traffic & Weather */}
            <div className="feature-pill-item">
              <div className="icon-cube cube-cyan">
                <CloudSun size={18} color="#ffffff" />
              </div>
              <span className="feature-pill-label">Traffic &amp; Weather</span>
            </div>

            {/* Badge 6: Smart City */}
            <div className="feature-pill-item">
              <div className="icon-cube cube-coral">
                <MapPin size={18} color="#ffffff" />
              </div>
              <span className="feature-pill-label">Smart City Insights</span>
            </div>
          </div>

          {/* Handwritten Quote with Map Pin at bottom */}
          <div className="bottom-handwritten-quote">
            <div className="quote-pin-marker">
              <MapPin size={18} color="#facc15" fill="#facc15" />
            </div>
            <div className="quote-script-text">
              Same City... A Thousand Stories ♡
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: FROSTED GLASS LOGIN CARD ================= */}
        <div className="login-card-col">
          <div className="glass-login-card">
            {/* Card Header with Cursive Font & Curve Underline */}
            <div className="glass-card-header">
              <h2 className="glass-heading-script">
                {isSignUp ? 'Join CityVibe!' : 'Welcome Back!'}
              </h2>
              {/* Yellow brush stroke underline accent */}
              <svg className="brush-stroke-svg" width="120" height="12" viewBox="0 0 120 12" fill="none">
                <path d="M4 8C35 3 85 3 116 7" stroke="#facc15" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
              <p className="glass-sub-prompt">
                {isSignUp 
                  ? 'Create an account to start your personalized city journey' 
                  : 'Log in to continue your city journey'}
              </p>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="login-error-banner">
                <AlertCircle size={15} style={{ flexShrink: 0 }} />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="glass-form-body">
              {isSignUp && (
                <div className="glass-input-wrapper">
                  <User size={18} className="glass-input-icon" />
                  <input
                    id="input-fullname"
                    type="text"
                    className="glass-input-field"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              )}

              {/* Identifier */}
              <div className="glass-input-wrapper">
                <Mail size={18} className="glass-input-icon" />
                <input
                  id="input-identifier"
                  type="text"
                  className="glass-input-field"
                  placeholder="Email or Phone Number"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="glass-input-wrapper">
                <Lock size={18} className="glass-input-icon" />
                <input
                  id="input-password"
                  type={showPassword ? 'text' : 'password'}
                  className="glass-input-field"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Options Row: Remember Me & Forgot Password */}
              <div className="glass-options-row">
                <label className="remember-checkbox-label">
                  <input
                    id="check-remember"
                    type="checkbox"
                    className="custom-checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>

                {!isSignUp && (
                  <button
                    type="button"
                    className="forgot-password-link"
                    onClick={() => setShowForgotModal(true)}
                  >
                    Forgot Password?
                  </button>
                )}
              </div>

              {/* Main Glowing Gradient Login Button */}
              <button
                id="btn-login-submit"
                type="submit"
                className="btn-gradient-login"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="login-spinner" />
                ) : (
                  <>
                    <span>{isSignUp ? 'Create Account' : 'Login'}</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              {/* Demo Credentials Quick-Fill Pill */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  type="button"
                  className="btn-demo-autofill"
                  onClick={fillDemoAccount}
                  title="Auto-fill with test explorer credentials"
                >
                  <Sparkles size={13} color="#facc15" />
                  <span>Auto-fill Demo Credentials</span>
                </button>
              </div>

              {/* Divider: or */}
              <div className="social-divider-row">
                <span className="divider-line" />
                <span className="divider-label">or</span>
                <span className="divider-line" />
              </div>

              {/* Google Social Button */}
              <button
                id="btn-google-login"
                type="button"
                className="btn-google-social"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <svg className="google-icon-svg" width="18" height="18" viewBox="0 0 18 18">
                  <path fill="#4285F4" d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.49h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.91c1.7-1.57 2.69-3.88 2.69-6.62z"/>
                  <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.8.54-1.83.86-3.05.86-2.34 0-4.32-1.58-5.03-3.71H.96v2.33C2.44 15.88 5.48 18 9 18z"/>
                  <path fill="#FBBC05" d="M3.97 10.71a5.41 5.41 0 0 1 0-3.42V4.96H.96a9 9 0 0 0 0 8.08l3.01-2.33z"/>
                  <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0 5.48 0 2.44 2.12.96 5.96l3.01 2.33c.71-2.13 2.69-3.71 5.03-3.71z"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Switch to Sign Up / Log In */}
              <div className="switch-auth-mode-row">
                <span>{isSignUp ? 'Already have an account?' : "Don't have an account?"}</span>{' '}
                <button
                  id="btn-toggle-auth-mode"
                  type="button"
                  className="switch-auth-link"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setErrorMsg('');
                  }}
                >
                  {isSignUp ? 'Log In' : 'Sign Up'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ================= FORGOT PASSWORD MODAL ================= */}
      {showForgotModal && (
        <div className="modal-overlay" onClick={() => setShowForgotModal(false)}>
          <div className="modal-content" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-body" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.25rem' }}>Reset Your Password</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                Enter your registered email address to receive password recovery OTP instructions.
              </p>

              {resetSent ? (
                <div style={{
                  background: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: '#059669',
                  marginTop: '1rem'
                }}>
                  <CheckCircle2 size={20} />
                  <span>Recovery link sent to your email. Check inbox.</span>
                </div>
              ) : (
                <form onSubmit={handleSendReset} style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="Enter email address"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                  />
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowForgotModal(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Send Reset Instructions
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

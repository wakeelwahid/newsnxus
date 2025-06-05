
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Phone, Shield, User, Send } from 'lucide-react';

function Signup() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  
  const { signup, sendOTP } = useAuth();
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    if (!name || !mobile) {
      setError('Please fill in all fields');
      return;
    }

    if (mobile.length !== 10) {
      setError('Please enter valid 10-digit mobile number');
      return;
    }

    setOtpLoading(true);
    setError('');

    try {
      await sendOTP(mobile);
      setOtpSent(true);
      setError('');
    } catch (error) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !mobile || !otp) {
      setError('Please fill in all fields');
      return;
    }

    if (otp.length !== 4) {
      setError('Please enter valid 4-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signup(name, mobile, otp);
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join NewsNexus with mobile verification</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={otpSent ? handleSubmit : handleSendOTP} className="auth-form">
          <div className="input-group">
            <div className="input-wrapper">
              <User className="input-icon" size={20} />
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="auth-input"
                disabled={otpSent}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-wrapper">
              <Phone className="input-icon" size={20} />
              <input
                type="tel"
                placeholder="Mobile number (10 digits)"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="auth-input"
                disabled={otpSent}
                required
              />
            </div>
          </div>

          {otpSent && (
            <div className="input-group">
              <div className="input-wrapper">
                <Shield className="input-icon" size={20} />
                <input
                  type="text"
                  placeholder="Enter 4-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="auth-input"
                  required
                />
              </div>
            </div>
          )}

          {!otpSent ? (
            <button 
              type="submit" 
              className="auth-button"
              disabled={otpLoading}
            >
              <Send size={20} />
              {otpLoading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          ) : (
            <>
              <button 
                type="submit" 
                className="auth-button"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Verify & Create Account'}
              </button>
              
              <button 
                type="button" 
                onClick={() => {
                  setOtpSent(false);
                  setOtp('');
                  setError('');
                }}
                className="auth-button auth-button-secondary"
              >
                Change Details
              </button>
            </>
          )}
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Sign in here</Link></p>
          {otpSent && (
            <p className="otp-info">
              OTP sent to +91{mobile}. Check console for demo OTP.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;


import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const sendOTP = (mobile) => {
    // Simulate OTP sending - in production, integrate with SMS service
    const otp = Math.floor(1000 + Math.random() * 9000);
    localStorage.setItem('generatedOTP', otp.toString());
    localStorage.setItem('otpMobile', mobile);
    console.log(`OTP sent to ${mobile}: ${otp}`); // For testing
    return Promise.resolve({ success: true, message: 'OTP sent successfully' });
  };

  const verifyOTP = (mobile, otp, name = null) => {
    const storedOTP = localStorage.getItem('generatedOTP');
    const storedMobile = localStorage.getItem('otpMobile');
    
    if (storedOTP === otp && storedMobile === mobile) {
      const userData = { 
        mobile, 
        name: name || `User${mobile.slice(-4)}`,
        id: Date.now().toString()
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.removeItem('generatedOTP');
      localStorage.removeItem('otpMobile');
      return Promise.resolve(userData);
    } else {
      return Promise.reject(new Error('Invalid OTP'));
    }
  };

  const login = (mobile, otp) => {
    return verifyOTP(mobile, otp);
  };

  const signup = (name, mobile, otp) => {
    return verifyOTP(mobile, otp, name);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    sendOTP,
    verifyOTP
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

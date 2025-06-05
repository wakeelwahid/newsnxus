
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, Home, BarChart3 } from 'lucide-react';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          NewsNexus
        </Link>
        
        <div className="nav-menu">
          <Link to="/" className="nav-link">
            <Home size={20} />
            Home
          </Link>
          
          {user ? (
            <>
              <Link to="/dashboard" className="nav-link">
                <BarChart3 size={20} />
                Dashboard
              </Link>
              <div className="user-menu">
                <span className="user-name">
                  <User size={20} />
                  {user.name}
                </span>
                <button onClick={handleLogout} className="logout-btn">
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link signup-link">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

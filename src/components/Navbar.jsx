
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Home, PlusCircle } from 'lucide-react';

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
        
        <div className="nav-links">
          <Link to="/" className="nav-link">
            <Home size={20} />
            Home
          </Link>
          
          {user ? (
            <>
              <Link to="/dashboard" className="nav-link">
                <User size={20} />
                Dashboard
              </Link>
              <button onClick={handleLogout} className="nav-link logout-btn">
                <LogOut size={20} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="nav-link signup-btn">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

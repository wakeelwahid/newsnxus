
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { BarChart3, User, Heart, MessageSquare, TrendingUp } from 'lucide-react';

function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalArticlesRead: 0,
    totalLikes: 0,
    totalComments: 0,
    favoriteCategory: 'Technology'
  });

  useEffect(() => {
    // Simulate loading user stats
    setStats({
      totalArticlesRead: Math.floor(Math.random() * 50) + 10,
      totalLikes: Math.floor(Math.random() * 200) + 50,
      totalComments: Math.floor(Math.random() * 30) + 5,
      favoriteCategory: 'Technology'
    });
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.name}!</h1>
          <p>Here's your activity summary</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <BarChart3 size={24} />
            </div>
            <div className="stat-content">
              <h3>{stats.totalArticlesRead}</h3>
              <p>Articles Read</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Heart size={24} />
            </div>
            <div className="stat-content">
              <h3>{stats.totalLikes}</h3>
              <p>Total Likes</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <MessageSquare size={24} />
            </div>
            <div className="stat-content">
              <h3>{stats.totalComments}</h3>
              <p>Comments Made</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <TrendingUp size={24} />
            </div>
            <div className="stat-content">
              <h3>{stats.favoriteCategory}</h3>
              <p>Favorite Category</p>
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="activity-section">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              <div className="activity-item">
                <User size={20} />
                <span>Liked article "Breaking News Update"</span>
                <span className="activity-time">2 hours ago</span>
              </div>
              <div className="activity-item">
                <User size={20} />
                <span>Read article "Technology Trends 2024"</span>
                <span className="activity-time">5 hours ago</span>
              </div>
              <div className="activity-item">
                <User size={20} />
                <span>Commented on "Global Market Analysis"</span>
                <span className="activity-time">1 day ago</span>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2>Profile Information</h2>
            <div className="profile-info">
              <div className="profile-item">
                <strong>Name:</strong> {user?.name}
              </div>
              <div className="profile-item">
                <strong>Email:</strong> {user?.email}
              </div>
              <div className="profile-item">
                <strong>Member Since:</strong> {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

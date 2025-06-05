import React from 'react';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Users, TrendingUp, Calendar } from 'lucide-react';

function Dashboard() {
  const { user } = useAuth();

  const stats = [
    {
      title: "Total Posts",
      value: "48",
      icon: BookOpen,
      color: "#667eea"
    },
    {
      title: "Total Likes",
      value: "156",
      icon: Users,
      color: "#48bb78"
    },
    {
      title: "Total Dislikes",
      value: "12",
      icon: TrendingUp,
      color: "#f56565"
    },
    {
      title: "Days Active",
      value: "15",
      icon: Calendar,
      color: "#f093fb"
    }
  ];

  const recentActivity = [
    { action: "Liked article: 'Technology Breakthrough'", time: "2 hours ago", type: "like" },
    { action: "Disliked article: 'Climate Summit Agreement'", time: "4 hours ago", type: "dislike" },
    { action: "Liked article: 'Economic Recovery'", time: "1 day ago", type: "like" },
    { action: "Liked article: 'Sports News Update'", time: "2 days ago", type: "like" },
    { action: "Disliked article: 'Weather Report'", time: "3 days ago", type: "dislike" }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.name}!</h1>
          <p>Here's your news activity overview</p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon" style={{ background: stat.color }}>
                <stat.icon size={24} />
              </div>
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-content">
          <div className="activity-section">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              {recentActivity.map((activity, index) => (
                <div key={index} className={`activity-item ${activity.type}`}>
                  <span>{activity.action}</span>
                  <span className="activity-time">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="profile-section">
            <h2>Post Analytics</h2>
            <div className="analytics-grid">
              <div className="analytics-card">
                <h3>Engagement Rate</h3>
                <div className="analytics-value">92.8%</div>
                <p>Likes vs Total Interactions</p>
              </div>
              <div className="analytics-card">
                <h3>Most Liked Post</h3>
                <div className="analytics-value">45 likes</div>
                <p>"Technology Breakthrough"</p>
              </div>
              <div className="analytics-card">
                <h3>Weekly Growth</h3>
                <div className="analytics-value">+12%</div>
                <p>Compared to last week</p>
              </div>
            </div>
            
            <h2 className="profile-title">Profile Information</h2>
            <div className="profile-info">
              <div className="profile-item">
                <strong>Name:</strong> {user?.name}
              </div>
              <div className="profile-item">
                <strong>Email:</strong> {user?.email}
              </div>
              <div className="profile-item">
                <strong>Member Since:</strong> January 2024
              </div>
              <div className="profile-item">
                <strong>Subscription:</strong> Free Plan
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
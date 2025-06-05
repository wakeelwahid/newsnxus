import React from 'react';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Users, TrendingUp, Calendar } from 'lucide-react';

function Dashboard() {
  const { user } = useAuth();

  const stats = [
    {
      title: "Articles Read",
      value: "24",
      icon: BookOpen,
      color: "#667eea"
    },
    {
      title: "Following",
      value: "12",
      icon: Users,
      color: "#764ba2"
    },
    {
      title: "Engagement",
      value: "89%",
      icon: TrendingUp,
      color: "#f093fb"
    },
    {
      title: "Days Active",
      value: "15",
      icon: Calendar,
      color: "#f5576c"
    }
  ];

  const recentActivity = [
    { action: "Read article: 'Technology Breakthrough'", time: "2 hours ago" },
    { action: "Liked article: 'Climate Summit Agreement'", time: "4 hours ago" },
    { action: "Followed Tech Reporter", time: "1 day ago" },
    { action: "Commented on 'Economic Recovery'", time: "2 days ago" }
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
                <div key={index} className="activity-item">
                  <span>{activity.action}</span>
                  <span className="activity-time">{activity.time}</span>
                </div>
              ))}
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

import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, Calendar, User } from 'lucide-react';

const mockArticles = [
  {
    id: 1,
    title: "Breaking: Major Technology Breakthrough Announced",
    author: "Tech Reporter",
    date: "2024-01-15",
    content: "Scientists have announced a groundbreaking discovery that could revolutionize the way we think about renewable energy...",
    likes: 24,
    dislikes: 3,
    category: "Technology"
  },
  {
    id: 2,
    title: "Global Climate Summit Reaches Historic Agreement",
    author: "Environmental Correspondent",
    date: "2024-01-14",
    content: "World leaders have come together to sign the most comprehensive climate agreement in history...",
    likes: 45,
    dislikes: 8,
    category: "Environment"
  },
  {
    id: 3,
    title: "Economic Markets Show Strong Recovery Signs",
    author: "Financial Analyst",
    date: "2024-01-13",
    content: "Recent data indicates that global markets are showing positive trends after months of uncertainty...",
    likes: 18,
    dislikes: 2,
    category: "Economics"
  }
];

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setArticles(mockArticles);
      setLoading(false);
    }, 1000);
  }, []);

  const handleLike = (id) => {
    setArticles(articles.map(article => 
      article.id === id 
        ? { ...article, likes: article.likes + 1 }
        : article
    ));
  };

  const handleDislike = (id) => {
    setArticles(articles.map(article => 
      article.id === id 
        ? { ...article, dislikes: article.dislikes + 1 }
        : article
    ));
  };

  if (loading) {
    return <div className="loading">Loading latest news...</div>;
  }

  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to NewsNexus</h1>
          <p>Your trusted source for the latest news and updates from around the world</p>
        </div>
      </div>
      
      <div className="container">
        <div className="articles-section">
          <h2>Latest News</h2>
          <div className="articles-grid">
            {articles.map(article => (
              <div key={article.id} className="article-card">
                <div className="article-header">
                  <span className="article-category">{article.category}</span>
                </div>
                <h3 className="article-title">{article.title}</h3>
                <p className="article-content">{article.content}</p>
                
                <div className="article-meta">
                  <div className="article-author">
                    <User size={16} />
                    <span>{article.author}</span>
                  </div>
                  <div className="article-date">
                    <Calendar size={16} />
                    <span>{article.date}</span>
                  </div>
                </div>
                
                <div className="article-actions">
                  <button 
                    className="like-btn"
                    onClick={() => handleLike(article.id)}
                  >
                    <ThumbsUp size={16} />
                    <span>{article.likes}</span>
                  </button>
                  <button 
                    className="dislike-btn"
                    onClick={() => handleDislike(article.id)}
                  >
                    <ThumbsDown size={16} />
                    <span>{article.dislikes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

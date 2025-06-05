
import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, Calendar, User } from 'lucide-react';

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      // Using JSONPlaceholder as demo API
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
      const posts = await response.json();
      
      // Transform posts to news articles with like/dislike counts
      const newsArticles = posts.map(post => ({
        id: post.id,
        title: post.title,
        body: post.body,
        author: `User ${post.userId}`,
        date: new Date().toLocaleDateString(),
        likes: Math.floor(Math.random() * 100),
        dislikes: Math.floor(Math.random() * 20),
        image: `https://picsum.photos/400/200?random=${post.id}`
      }));
      
      setArticles(newsArticles);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

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
    return <div className="loading">Loading news...</div>;
  }

  return (
    <div className="home">
      <div className="hero-section">
        <h1>Welcome to NewsNexus</h1>
        <p>Your trusted source for the latest news and updates</p>
      </div>
      
      <div className="news-container">
        <h2>Latest Articles</h2>
        <div className="articles-grid">
          {articles.map(article => (
            <div key={article.id} className="article-card">
              <img src={article.image} alt={article.title} className="article-image" />
              <div className="article-content">
                <h3 className="article-title">{article.title}</h3>
                <p className="article-body">{article.body.substring(0, 150)}...</p>
                
                <div className="article-meta">
                  <span className="article-author">
                    <User size={16} />
                    {article.author}
                  </span>
                  <span className="article-date">
                    <Calendar size={16} />
                    {article.date}
                  </span>
                </div>
                
                <div className="article-actions">
                  <button 
                    className="like-btn"
                    onClick={() => handleLike(article.id)}
                  >
                    <ThumbsUp size={18} />
                    {article.likes}
                  </button>
                  <button 
                    className="dislike-btn"
                    onClick={() => handleDislike(article.id)}
                  >
                    <ThumbsDown size={18} />
                    {article.dislikes}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

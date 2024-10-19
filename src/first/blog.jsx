import React, { useState, useEffect } from 'react';
import './blog.css';

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/articles')
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error('Error fetching articles:', error));
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => console.error('Error submitting inquiry:', error));
  };

  return (
    <div className="blog-container">
      <div className="articles-section">
        <h2>Latest Articles</h2>
        {articles.length > 0 ? (
          articles.map((article) => (
            <div key={article.id} className="article">
              <h3>{article.title}</h3>
              <p>{article.content}</p>
            </div>
          ))
        ) : (
          <p>Loading articles...</p>
        )}
      </div>

      <div className="contact-form">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Blog;

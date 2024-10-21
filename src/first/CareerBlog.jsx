import React, { useState, useEffect } from 'react';
import './CareerBlog.css';

const CareerBlog = () => {
    const [articles, setArticles] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        // Fetch articles from API
        fetch('http://localhost:5000/api/articles')
            .then((response) => response.json())
            .then((data) => setArticles(data))
            .catch((error) => console.error('Error fetching articles:', error));
    }, []);

    const handleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index); // Toggle expansion
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Prepare the data to send to the backend
        const formData = { name, email, message };

        // Send the data to the backend
        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitted(true);
                setName('');
                setEmail('');
                setMessage('');
            } else {
                console.error('Error submitting contact form');
            }
        } catch (error) {
            console.error('Error submitting contact form:', error);
        }
    };

    return (
        <div className="career-blog-container">
            <h1>Career Guidance Blog</h1>

            <div className="articles-container">
                {articles.map((article, index) => (
                    <div
                        key={index}
                        className={`article-card ${index % 2 === 0 ? 'striped' : ''}`}
                        onClick={() => handleExpand(index)}
                    >
                        <h2>{article.title}</h2>
                        {expandedIndex === index && (
                            <p className="article-content">{article.content}</p>
                        )}
                    </div>
                ))}
            </div>

            <h2>Contact Us</h2>
            {!submitted ? (
                <form onSubmit={handleSubmit} className="contact-form">
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Your Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                    <button type="submit">Send Message</button>
                </form>
            ) : (
                <p>Thank you for reaching out! We'll get back to you soon.</p>
            )}
        </div>
    );
};

export default CareerBlog;

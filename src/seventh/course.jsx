// src/seventh/course.jsx
import React, { useEffect, useState } from 'react';
import './course.css';

const CourseCatalog = () => {
    const [courses, setCourses] = useState([]);
    const [inquiry, setInquiry] = useState({ name: '', email: '', message: '' });
    const [responseMessage, setResponseMessage] = useState('');

    // Fetch courses from the backend
    useEffect(() => {
        fetch('http://localhost:5001/api/courses')
            .then((response) => response.json())
            .then((data) => setCourses(data))
            .catch((error) => console.error('Error fetching courses:', error));
    }, []);

    // Handle inquiry form change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInquiry((prev) => ({ ...prev, [name]: value }));
    };

    // Handle inquiry form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5001/api/inquiries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inquiry),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setResponseMessage(data.message);
                setInquiry({ name: '', email: '', message: '' }); // Clear form
            })
            .catch((error) => {
                console.error('Error submitting inquiry:', error);
                setResponseMessage('Failed to send inquiry. Please try again.');
            });
    };

    return (
        <div className="course-catalog-container">
            <h1>Online Course Catalog</h1>

            <div className="courses">
                {courses.map((course) => (
                    <div key={course.id} className="course">
                        <h2>{course.title}</h2>
                        <p>{course.description}</p>
                        <p><strong>Duration:</strong> {course.duration}</p>
                        <p><strong>Instructor:</strong> {course.instructor}</p>
                    </div>
                ))}
            </div>

            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit} className="contact-form">
                <input
                    type="text"
                    name="name"
                    value={inquiry.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={inquiry.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                />
                <textarea
                    name="message"
                    value={inquiry.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    required
                />
                <button type="submit">Send Inquiry</button>
            </form>

            {responseMessage && <p className="response-message">{responseMessage}</p>}
        </div>
    );
};

export default CourseCatalog;

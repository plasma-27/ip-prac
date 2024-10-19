import React, { useState, useEffect } from 'react';
import './quiz.css';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);

    // Fetch quiz questions from the backend
    useEffect(() => {
        fetch('http://localhost:5001/api/quiz')
            .then((response) => response.json())
            .then((data) => setQuestions(data))
            .catch((error) => console.error('Error fetching quiz questions:', error));
    }, []);

    // Handle answer selection
    const handleAnswerChange = (questionId, answer) => {
        setAnswers({
            ...answers,
            [questionId]: answer, // Store the answer for the question ID
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Submit answers to backend and get the score
        fetch('http://localhost:5001/api/quiz/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answers }), // Sending user answers
        })
            .then((response) => response.json())
            .then((data) => setScore(data.score)) // Set score based on response
            .catch((error) => console.error('Error submitting quiz:', error));
    };

    return (
        <div className="quiz-container">
            <h1>Quick Quiz Challenge</h1>

            {score !== null ? (
                <div className="result">
                    <h2>Your Score: {score}/{questions.length}</h2>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    {questions.map((question) => (
                        <div key={question.id} className="question-block">
                            <h3>{question.question}</h3>
                            <div className="options">
                                {question.options.map((option) => (
                                    <label key={option}>
                                        <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            value={option}
                                            onChange={() => handleAnswerChange(question.id, option)} // Set answer for the selected question
                                            required
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button type="submit" className="submit-btn">Submit</button>
                </form>
            )}
        </div>
    );
};

export default Quiz;

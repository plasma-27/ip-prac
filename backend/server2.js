const express = require('express');
const cors = require('cors');

const app = express();
const port = 5001;

// Enable CORS for cross-origin requests
app.use(cors());
app.use(express.json());

// Dummy quiz questions
const quizQuestions = [
    {
        id: 1,
        question: 'What is the capital of France?',
        options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
        correctAnswer: 'Paris'
    },
    {
        id: 2,
        question: 'Which planet is known as the Red Planet?',
        options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
        correctAnswer: 'Mars'
    },
    {
        id: 3,
        question: 'What is the largest ocean on Earth?',
        options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
        correctAnswer: 'Pacific Ocean'
    },
    {
        id: 4,
        question: 'Who wrote "Hamlet"?',
        options: ['Mark Twain', 'William Shakespeare', 'Charles Dickens', 'J.K. Rowling'],
        correctAnswer: 'William Shakespeare'
    },
    {
        id: 5,
        question: 'Which element has the chemical symbol "O"?',
        options: ['Oxygen', 'Gold', 'Osmium', 'Oganesson'],
        correctAnswer: 'Oxygen'
    }
];

// API route to fetch quiz questions
app.get('/api/quiz', (req, res) => {
    res.json(quizQuestions);
});

// API route to submit answers and calculate score
app.post('/api/quiz/submit', (req, res) => {
    const userAnswers = req.body.answers; // This will be an object
    let score = 0;

    // Calculate score
    quizQuestions.forEach((question) => {
        // Check if the user answer for this question ID matches the correct answer
        if (question.correctAnswer === userAnswers[question.id]) {
            score += 1; // Increment score for each correct answer
        }
    });

    res.json({ score });
});

// Start server
app.listen(port, () => {
    console.log(`Quiz server running on http://localhost:${port}`);
});
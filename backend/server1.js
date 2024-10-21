const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const articles = [
    {
        title: 'Choosing the Right Career Path',
        content: 'This article will help you choose the right career path based on your strengths and interests...',
    },
    {
        title: 'How to Ace a Job Interview',
        content: 'Learn tips and strategies to perform well in job interviews...',
    },
    {
        title: 'Balancing Work and Life',
        content: 'Find out how to maintain a healthy work-life balance in today’s fast-paced world...',
    },
];

// Get articles
app.get('/api/articles', (req, res) => {
    res.json(articles);
});

// Post inquiries
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    // Capture inquiry and send response
    console.log(`Inquiry received: ${name}, ${email}, ${message}`);
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

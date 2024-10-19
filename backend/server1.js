const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Dummy articles
const articles = [
  { id: 1, title: 'Choosing the Right Career Path', content: 'Exploring career paths...' },
  { id: 2, title: 'Skills for Success in 2024', content: 'Top skills for a successful career...' },
  { id: 3, title: 'Career Change Tips', content: 'How to navigate a career change...' }
];

// API route to get articles
app.get('/api/articles', (req, res) => {
  res.json(articles);
});

// API route to handle inquiries
app.post('/api/inquiries', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  console.log('Inquiry received:', { name, email, message });
  res.status(200).json({ message: 'Inquiry submitted successfully!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

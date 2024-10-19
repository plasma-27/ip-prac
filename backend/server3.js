// backend/server3.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5001;

// Enable CORS for cross-origin requests
app.use(cors());
app.use(express.json());

// API route to calculate BMI
app.post('/api/bmi', (req, res) => {
    const { weight, height } = req.body;

    if (!weight || !height) {
        return res.status(400).json({ error: 'Weight and height are required.' });
    }

    // Calculate BMI
    const bmi = weight / (height * height);
    let category = '';

    // Determine health category based on BMI value
    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi < 24.9) {
        category = 'Normal weight';
    } else if (bmi < 29.9) {
        category = 'Overweight';
    } else {
        category = 'Obesity';
    }

    res.json({ bmi, category });
});

// Start server
app.listen(port, () => {
    console.log(`BMI Calculator server running on http://localhost:${port}`);
});

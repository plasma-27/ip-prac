// server10.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5004;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Calculate interest based on investment data
app.post('/api/calculate-interest', (req, res) => {
    const { principal, rate, time } = req.body; // Expecting principal, rate, and time

    // Simple Interest Calculation: Interest = (Principal * Rate * Time) / 100
    const interest = (principal * rate * time) / 100;

    res.json({ interest });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

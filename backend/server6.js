// backend/server6.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5001;

// Enable CORS for cross-origin requests
app.use(cors());
app.use(express.json()); // For parsing application/json

// API route to calculate net salary
app.post('/api/salary/calculate', (req, res) => {
    const { basicSalary } = req.body; // Expecting { basicSalary: number }

    if (typeof basicSalary !== 'number' || basicSalary < 0) {
        return res.status(400).json({ error: 'Invalid salary amount' });
    }

    // Simple deduction calculation (e.g., 20% deduction)
    const deduction = basicSalary * 0.2; // 20% deduction
    const netSalary = basicSalary - deduction;

    res.json({ netSalary });
});

// Start server
app.listen(port, () => {
    console.log(`Salary Estimator server running on http://localhost:${port}`);
});

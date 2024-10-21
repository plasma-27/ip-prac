// server9.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5003;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // To parse JSON request bodies

// Calculate total cost based on item data
app.post('/api/calculate', (req, res) => {
    const items = req.body.items; // Expecting an array of { name, quantity, price }
    let totalCost = 0;

    items.forEach(item => {
        // Use the price provided by the user
        const price = parseFloat(item.price) || 0; // Default to 0 if price is not provided
        totalCost += price * item.quantity;
    });

    res.json({ totalCost });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// server9.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5003;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // To parse JSON request bodies

// Sample prices for items
const itemPrices = {
    apple: 1.0,
    banana: 0.5,
    orange: 0.75,
    milk: 1.5,
    bread: 2.0,
};

// Calculate total cost based on item data
app.post('/api/calculate', (req, res) => {
    const items = req.body.items; // Expecting an array of { name, quantity }
    let totalCost = 0;

    items.forEach(item => {
        const price = itemPrices[item.name.toLowerCase()] || 0; // Default to 0 if item is not found
        totalCost += price * item.quantity;
    });

    res.json({ totalCost });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// backend/server5.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5001;

// Enable CORS for cross-origin requests
app.use(cors());
app.use(express.json()); // For parsing application/json

// Dummy contact data
let contacts = [];

// API route to fetch the list of contacts
app.get('/api/contacts', (req, res) => {
    res.json(contacts);
});

// API route to add a new contact
app.post('/api/contacts', (req, res) => {
    const newContact = req.body; // Expecting { name: '', phone: '' }
    contacts.push(newContact);
    res.status(201).json(newContact); // Respond with the created contact
});

// Start server
app.listen(port, () => {
    console.log(`Phone Directory server running on http://localhost:${port}`);
});

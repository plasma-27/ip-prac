// backend/server4.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5001;

// Enable CORS for cross-origin requests
app.use(cors());

// Static movie data
const movies = [
    {
        id: 1,
        title: 'Inception',
        year: 2010,
        genre: 'Sci-Fi',
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.'
    },
    {
        id: 2,
        title: 'The Godfather',
        year: 1972,
        genre: 'Crime',
        description: 'An organized crime dynasty\'s aging patriarch transfers control of his clandestine empire to his reluctant son.'
    },
    {
        id: 3,
        title: 'The Dark Knight',
        year: 2008,
        genre: 'Action',
        description: 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.'
    },
    {
        id: 4,
        title: 'Pulp Fiction',
        year: 1994,
        genre: 'Crime',
        description: 'The lives of two mob hitmen, a boxer, a gangster\'s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.'
    },
    {
        id: 5,
        title: 'The Shawshank Redemption',
        year: 1994,
        genre: 'Drama',
        description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'
    }
];

// API route to fetch the list of movies
app.get('/api/movies', (req, res) => {
    res.json(movies);
});

// Start server
app.listen(port, () => {
    console.log(`Movie Database server running on http://localhost:${port}`);
});

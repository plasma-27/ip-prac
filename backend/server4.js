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
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
        rating: 8.8
    },
    {
        id: 2,
        title: 'Blade Runner 2049',
        year: 2017,
        genre: 'Sci-Fi',
        description: 'A young blade runner\'s discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who has been missing for thirty years.',
        rating: 8.0
    },
    {
        id: 3,
        title: 'The Matrix',
        year: 1999,
        genre: 'Sci-Fi',
        description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
        rating: 8.7
    },
    {
        id: 4,
        title: 'Interstellar',
        year: 2014,
        genre: 'Sci-Fi',
        description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
        rating: 8.6
    },
    {
        id: 5,
        title: '2001: A Space Odyssey',
        year: 1968,
        genre: 'Sci-Fi',
        description: 'After discovering a mysterious artifact buried beneath the lunar surface, mankind sets off on a journey to find its origins with help from intelligent supercomputer HAL 9000.',
        rating: 8.3
    },
    {
        id: 6,
        title: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
        genre: 'Sci-Fi',
        description: 'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee, and two droids to save the galaxy from the Empire\'s world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.',
        rating: 8.6
    },
    {
        id: 7,
        title: 'The Terminator',
        year: 1984,
        genre: 'Sci-Fi',
        description: 'A cyborg is sent from the future on a deadly mission. He has to kill Sarah Connor, a young woman whose life will have a great significance in years to come.',
        rating: 8.0
    },
    {
        id: 8,
        title: 'Back to the Future',
        year: 1985,
        genre: 'Sci-Fi',
        description: 'Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, eccentric scientist Doc Brown.',
        rating: 8.5
    },
    {
        id: 9,
        title: 'Gravity',
        year: 2013,
        genre: 'Sci-Fi',
        description: 'Two astronauts work together to survive after an accident leaves them stranded in space.',
        rating: 7.7
    },
    {
        id: 10,
        title: 'E.T. the Extra-Terrestrial',
        year: 1982,
        genre: 'Sci-Fi',
        description: 'A troubled child summons the courage to help a friendly alien escape Earth and return to his home world.',
        rating: 7.9
    }
];


// API route to fetch the list of movies
app.get('/api/movies', (req, res) => {
    console.log(movies); // Log the movie array to check if ratings exist
    res.json(movies); // Send the response
});
// Start server
app.listen(port, () => {
    console.log(`Movie Database server running on http://localhost:${port}`);
});

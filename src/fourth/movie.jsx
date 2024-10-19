// src/fourth/movie.jsx
import React, { useEffect, useState } from 'react';
import './movie.css';

const MovieDatabase = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    // Fetch movie data from the backend
    useEffect(() => {
        fetch('http://localhost:5001/api/movies')
            .then((response) => response.json())
            .then((data) => setMovies(data))
            .catch((error) => console.error('Error fetching movie data:', error));
    }, []);

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
    };

    const handleCloseDetails = () => {
        setSelectedMovie(null);
    };

    return (
        <div className="movie-database-container">
            <h1>Static Movie Database</h1>
            <div className="movie-list">
                {movies.map((movie) => (
                    <div key={movie.id} className="movie-item" onClick={() => handleMovieClick(movie)}>
                        <h3>{movie.title} ({movie.year})</h3>
                        <p>Genre: {movie.genre}</p>
                    </div>
                ))}
            </div>

            {selectedMovie && (
                <div className="movie-details">
                    <h2>{selectedMovie.title}</h2>
                    <p><strong>Year:</strong> {selectedMovie.year}</p>
                    <p><strong>Genre:</strong> {selectedMovie.genre}</p>
                    <p><strong>Description:</strong> {selectedMovie.description}</p>
                    <button onClick={handleCloseDetails}>Close</button>
                </div>
            )}
        </div>
    );
};

export default MovieDatabase;

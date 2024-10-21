// src/fourth/movie.jsx
import React, { useEffect, useState } from 'react';
import './movie.css';

const MovieDatabase = () => {
    const [movies, setMovies] = useState([]);
    const [expandedMovieId, setExpandedMovieId] = useState(null);
    console.log(movies)


    // Fetch movie data from the backend
    useEffect(() => {
        fetch('http://localhost:5001/api/movies')
            .then((response) => response.json())
            .then((data) => {
                console.log(data); // Log the fetched data
                setMovies(data); // Set the movies state
            })
            .catch((error) => console.error('Error fetching movie data:', error));
    }, []);

    
    const handleMovieClick = (movieId) => {
        setExpandedMovieId(expandedMovieId === movieId ? null : movieId);
    };

    return (
        <div className="movie-database-container">
            <h1>Static Movie Database</h1>
            <div className="movie-list">
                {movies.map((movie) => (
                    <div
                        key={movie.id}
                        className="movie-item"
                        onClick={() => handleMovieClick(movie.id)}
                    >
                        <h3>{movie.title} ({movie.year})</h3>
                        <p>Genre: {movie.genre}</p>
                        <p>Rating: {movie.rating}</p>
                        
                        {/* Conditionally render the description if the movie is expanded */}
                        {expandedMovieId === movie.id && (
                            <div className="movie-description">
                                <p><strong>Description:</strong> {movie.description}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieDatabase;

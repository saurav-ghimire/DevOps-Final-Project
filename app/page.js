'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import './style.css'; // Import custom CSS

const OMDB_API_URL = 'http://www.omdbapi.com/';
const API_KEY = '8a7263fb';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsClient(true);

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${OMDB_API_URL}?apikey=${API_KEY}&s=marvel&type=movie`);
        if (!response.ok) throw new Error('Failed to fetch movies');

        const data = await response.json();
        if (data.Search) {
          setMovies(data.Search);
          setFilteredMovies(data.Search);
        } else {
          setError('No movies found');
        }
      } catch (err) {
        setError(err.message || 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = movies.filter((movie) =>
      movie.Title.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredMovies(filtered);
  };

  if (!isClient) return null;
  if (isLoading) return <div className="loading">Loading movies...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="container">
      <main>
        {movies.length > 0 && (
          <div className="featured-movie">
            <Link href={`/movie/${movies[0].imdbID}`}>
              <div className="featured-banner">
                <img
                  src={movies[0].Poster || 'https://via.placeholder.com/300x450?text=No+Image'}
                  alt={movies[0].Title}
                  className="featured-poster"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                  }}
                />
                <div className="featured-details">
                  <h3 className="featured-title">{movies[0].Title}</h3>
                  <p className="featured-year">Year: {movies[0].Year}</p>
                </div>
              </div>
            </Link>
          </div>
        )}

        <div className="search-bar">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search for movies..."
          />
        </div>

        <div className="movie-grid">
          {filteredMovies.map((movie) => (
            <Link href={`/movie/${movie.imdbID}`} key={movie.imdbID}>
              <div className="movie-card">
                <img
                  src={movie.Poster || 'https://via.placeholder.com/300x450?text=No+Image'}
                  alt={movie.Title}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                  }}
                />
                <div className="movie-info">
                  <h3>{movie.Title}</h3>
                  <p>Year: {movie.Year}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

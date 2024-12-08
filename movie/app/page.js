'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

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

        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }

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

  // Prevent rendering on server
  if (!isClient) {
    return null;
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen text-2xl">Loading movies...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-8">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <main>
        {movies.length > 0 && (
          <Link
            href={`/movie/${movies[0].imdbID}`}
            className="block mb-8 hover:opacity-80 transition"
          >
            <h2 className="text-2xl font-bold mb-4">Featured Movie</h2>
            <div className="flex items-center">
              <img
                src={movies[0].Poster || 'https://via.placeholder.com/300x450?text=No+Image'}
                alt={movies[0].Title}
                className="w-64 h-96 object-cover mr-4"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                }}
              />
              <div>
                <h3 className="text-xl font-semibold">{movies[0].Title}</h3>
                <p className="text-gray-600">Year: {movies[0].Year}</p>
              </div>
            </div>
          </Link>
        )}

        <div className="mb-8">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search for movies..."
            className="w-full p-2 border rounded mb-4"
          />
        </div>

        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredMovies.map((movie) => (
              <Link
                href={`/movie/${movie.imdbID}`}
                key={movie.imdbID}
                className="hover:opacity-80 transition"
              >
                <div className="border rounded overflow-hidden shadow-lg">
                  <img
                    src={movie.Poster || 'https://via.placeholder.com/300x450?text=No+Image'}
                    alt={movie.Title}
                    className="w-full h-96 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                    }}
                  />
                  <div className="p-4">
                    <h3 className="font-bold">{movie.Title}</h3>
                    <p className="text-gray-600">Year: {movie.Year}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
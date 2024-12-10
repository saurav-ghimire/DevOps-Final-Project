'use client';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const OMDB_API_URL = 'http://www.omdbapi.com/';
const API_KEY = '8a7263fb';

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${OMDB_API_URL}?apikey=${API_KEY}&i=${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }

        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err.message || 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-medium text-gray-800">
        Loading movie details...
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 text-center mt-8 text-lg">
        Error: {error}
      </div>
    );

  if (!movie)
    return (
      <div className="text-center mt-8 text-lg text-gray-600">
        No movie found
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="mb-4 inline-block text-blue-600 hover:underline text-lg"
      >
        ← Back to Movies
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={movie.Poster || 'https://via.placeholder.com/300x450?text=No+Image'}
          alt={movie.Title}
          className="w-full md:w-72 h-auto object-cover rounded-lg shadow-lg"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
          }}
        />

        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">{movie.Title}</h1>
          <div className="space-y-4 text-gray-700">
            <p><strong>Year:</strong> {movie.Year}</p>
            <p><strong>Rated:</strong> {movie.Rated}</p>
            <p><strong>Released:</strong> {movie.Released}</p>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p className="mt-4"><strong>Plot:</strong> {movie.Plot}</p>
          </div>

          {movie.Ratings && movie.Ratings.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Ratings:</h2>
              <ul className="space-y-2">
                {movie.Ratings.map((rating, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-100 rounded-md shadow-sm"
                  >
                    <span className="font-medium">{rating.Source}:</span>
                    <span className="text-gray-600">{rating.Value}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

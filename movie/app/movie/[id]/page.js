'use client'
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

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen text-2xl">
      Loading movie details...
    </div>
  );

  if (error) return (
    <div className="text-red-500 text-center mt-8">
      Error: {error}
    </div>
  );

  if (!movie) return (
    <div className="text-center mt-8">No movie found</div>
  );

  return (
    <div className="container mx-auto p-4">
      <Link
        href="/"
        className="mb-4 inline-block text-blue-600 hover:underline"
      >
        ← Back to Movies
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={movie.Poster || 'https://via.placeholder.com/300x450?text=No+Image'}
          alt={movie.Title}
          className="w-full md:w-64 h-auto object-cover rounded-lg"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
          }}
        />

        <div>
          <h1 className="text-3xl font-bold mb-4">{movie.Title}</h1>
          <div className="space-y-2">
            <p><strong>Year:</strong> {movie.Year}</p>
            <p><strong>Rated:</strong> {movie.Rated}</p>
            <p><strong>Released:</strong> {movie.Released}</p>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p className="mt-4"><strong>Plot:</strong> {movie.Plot}</p>

            <div className="mt-4">
              <strong>Ratings:</strong>
              {movie.Ratings.map((rating, index) => (
                <p key={index} className="text-sm">
                  {rating.Source}: {rating.Value}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
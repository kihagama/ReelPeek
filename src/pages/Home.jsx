import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import logo from '../assets/logo.jpg'
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';

const API_KEY = import.meta.env.VITE_key;

console.log(API_KEY);

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const cache = useRef({}); // Use ref for cache (prevents unnecessary re-renders)
  const cancelTokenRef = useRef(null); // Store cancel tokens

  // Fetch movies (optimized with cache & cancellation)
  const fetchMovies = useCallback(async (query) => {
    if (query.trim() === '') {
      query = 'popular'; // Default to popular movies if empty
    }

    // Use cache if available
    if (cache.current[query]) {
      setMovies(cache.current[query]);
      return;
    }

    // Cancel previous request if still pending
    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel();
    }

    setIsLoading(true);
    cancelTokenRef.current = axios.CancelToken.source();

    try {
      const url =
        query === 'popular'
          ? `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
          : `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;

      const response = await axios.get(url, { cancelToken: cancelTokenRef.current.token });

      setMovies(response.data.results);
      cache.current[query] = response.data.results; // Store in cache
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {
        console.error('Error fetching movies:', error);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch popular movies on first load
  useEffect(() => {
    fetchMovies('');
  }, [fetchMovies]);

  // Handle search input changes (optimized)
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    fetchMovies(query);
  }, [fetchMovies]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}> <img style={styles.image} src={logo} alt="" /> ReelPeeks movies</h1>
      <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      {isLoading ? (
        <div style={styles.loading}>Loading movies...</div>
      ) : (
        <div style={styles.movieList}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#0A192F',
    color: '#FFFFFF',
    padding: '2rem',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    marginBottom: '2rem',
    fontWeight: 'bold',
    color: 'orange'
  },
  movieList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '1rem',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.5rem',
    color: 'orange',
  },
  image: {
    width: '40px',  
    height: '40px',
    marginRight: '2px',
    verticalAlign: 'middle',
    borderRadius: '100px'
  }
  
};

export default Home;

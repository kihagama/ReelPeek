import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import logo from '../assets/logo.jpg'
const Latest = () => {
  const [movies, setMovies] = useState([]);

  const fetchLatestMovies = async () => {
    const API_KEY = import.meta.env.VITE_key;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
    );
    setMovies(response.data.results);
  };

  useEffect(() => {
    fetchLatestMovies();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}> <img style={styles.image} src={logo} alt="" />Latest Movies</h1>
      <div style={styles.movieList}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#0A192F', // Dark blue
    color: '#FFFFFF', // White text
    padding: '2rem',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    marginBottom: '2rem',
    color:"orange"
  },
  movieList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '1rem',
  },
  image: {
    width: '40px',  
    height: '40px',
    marginRight: '2px',
    verticalAlign: 'middle',
    borderRadius: '100px'
  }
};

export default Latest;
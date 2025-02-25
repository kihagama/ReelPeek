import React, { useState } from 'react';
import Modal from './Modal'; // We'll create this next

const MovieCard = ({ movie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={styles.card}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        style={styles.image}
      />
      <h3 style={styles.title}>{movie.title}</h3>
      <button onClick={openModal} style={styles.button}>
        Watch Trailer
      </button>
      {isModalOpen && <Modal movieId={movie.id} onClose={closeModal} />}
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#112240', // Darker blue
    borderRadius: '8px',
    padding: '1rem',
    width: '200px',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    borderRadius: '8px',
  },
  title: {
    color: '#FFFFFF',
    margin: '1rem 0',
  },
  button: {
    backgroundColor: 'orange', // orange
    color: '#FFFFFF',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default MovieCard;
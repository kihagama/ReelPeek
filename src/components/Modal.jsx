import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Modal = ({ movieId, onClose }) => {
  const [trailerKey, setTrailerKey] = useState('');
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchTrailer = async () => {
      const API_KEY = import.meta.env.VITE_key;
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
        );
        const trailer = response.data.results.find((video) => video.type === 'Trailer');

        setTimeout(() => {
          if (trailer) {
            setTrailerKey(trailer.key);
          }
          setLoading(false); // Stop loading after delay
        }, 1000); // 1-second delay
      } catch (error) {
        console.error('Error fetching trailer:', error);
        setLoading(false);
      }
    };

    fetchTrailer();
  }, [movieId]);

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <button onClick={onClose} style={styles.closeButton}>
          &times;
        </button>

        {loading ? (
          <p style={styles.loadingText}>Loading trailer...</p>
        ) : trailerKey ? (
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Movie Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={styles.iframe}
          />
        ) : (
          <p style={styles.noTrailerText}>No trailer available.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#0A192F', // Dark blue
    padding: '2rem',
    borderRadius: '8px',
    position: 'relative',
    width: '80%',
    maxWidth: '800px',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  closeButton: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'red',
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
  iframe: {
    width: '100%',
    height: '315px',
    border: 'none',
    borderRadius: '8px',
  },
  loadingText: {
    fontSize: '1.2rem',
    color: 'orange', // orange color for loading message
  },
  noTrailerText: {
    fontSize: '1.2rem',
    color: '#FF4C4C', // Red color for no trailer message
  },
};

export default Modal;

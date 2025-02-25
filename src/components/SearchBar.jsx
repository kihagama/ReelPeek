import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  // Debounce search input (prevents rapid re-renders)
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query);
    }, 600);

    return () => clearTimeout(handler);
  }, [query, onSearch]);

  return (
    <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={styles.input}
      />
      {isLoading && <span style={styles.loadingText}>Searching...</span>}
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2rem',
  },
  input: {
    padding: '0.5rem',
    width: '300px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  loadingText: {
    marginLeft: '1rem',
    color: '#00BFA6',
    fontSize: '1rem',
  },
};

export default SearchBar;

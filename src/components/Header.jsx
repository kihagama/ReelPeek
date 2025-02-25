import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={styles.header}>
      <nav>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/trending" style={styles.link}>Trending</Link>
        <Link to="/latest" style={styles.link}>Latest</Link>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#0A192F', // Dark blue
    padding: '1rem',
    color: '#FFFFFF', // White text
    textAlign: 'center',
  },
  link: {
    color: '#FFFFFF',
    margin: '0 1rem',
    textDecoration: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    fontWeight: 'bold',
   
  },
  

 
};

export default Header;
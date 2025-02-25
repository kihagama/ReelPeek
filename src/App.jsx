import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Trending from './pages/Trending';
import Latest from './pages/Latest';


function App() {
  return (
  <BrowserRouter>
<Header/>
  <Routes>
  <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/latest" element={<Latest />} />
  </Routes>
  </BrowserRouter>
  );
}

export default App;

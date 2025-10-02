import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Artists from './pages/Artists';
import Songs from './pages/Songs';
import Albums from './pages/Albums';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/songs" element={<Songs />} />
        <Route path="/albums" element={<Albums />} />
      </Routes>
    </Router>
  );
}

export default App;
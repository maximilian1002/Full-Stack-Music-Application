import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1> Music App Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="/artists">Artists</Link></li>
          <li><Link to="/songs">Songs</Link></li>
          <li><Link to="/albums">Albums</Link></li>
        </ul>
      </nav>
      <p>Select a section to manage your music database.</p>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Songs() {
  const [song, setSong] = useState({ name: '', releaseYear: '', albumId: '' });
  const [songs, setSongs] = useState([]);
  const [songId, setSongId] = useState('');
  const [response, setResponse] = useState('');

  const api = 'http://localhost:5500/songs';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSong({ ...song, [name]: value });
  };

  const createSong = async () => {
    try {
      const res = await axios.post(api, song);
      setResponse(res.data);
    } catch (err) {
      setResponse(err.message);
    }
  };

  const getSongs = async () => {
    try {
      const res = await axios.get(api);
      setSongs(res.data);
    } catch (err) {
      setResponse(err.message);
    }
  };

  const updateSong = async () => {
    try {
      const res = await axios.put(`${api}/${songId}`, song);
      setResponse(res.data);
    } catch (err) {
      setResponse(err.message);
    }
  };

  const deleteSong = async () => {
    try {
      const res = await axios.delete(`${api}/${songId}`);
      setResponse(res.data);
    } catch (err) {
      setResponse(err.message);
    }
  };

  useEffect(() => {
    getSongs();
  }, []);

  return (
    <div>
      <h2>Song Manager</h2>
      <input name="name" placeholder="Song Name" onChange={handleChange} /><br />
      <input name="releaseYear" placeholder="Release Year" onChange={handleChange} /><br />
      <input name="albumId" placeholder="Album ID" onChange={handleChange} /><br />
      <input placeholder="Song ID (for update/delete)" onChange={(e) => setSongId(e.target.value)} /><br />

      <button onClick={createSong}>Create</button>
      <button onClick={getSongs}>Retrieve</button>
      <button onClick={updateSong}>Update</button>
      <button onClick={deleteSong}>Delete</button>

      <div>
        <h3>Server Response:</h3>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </div>

      <div>
        <h3>Songs:</h3>
        <ul>
          {songs.map((s) => (
            <li key={s.id}>{s.name} — {s.releaseYear} (Album ID: {s.albumId})</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

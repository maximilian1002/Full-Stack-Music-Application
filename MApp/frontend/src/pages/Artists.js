import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Artists() {
  const [artist, setArtist] = useState({
    name: '',
    monthlyListeners: '',
    genre: '',
  });
  const [artists, setArtists] = useState([]);
  const [artistId, setArtistId] = useState('');
  const [response, setResponse] = useState('');

  const api = 'http://localhost:5500/artists';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArtist({ ...artist, [name]: value });
  };

  const createArtist = async () => {
    try {
      const res = await axios.post(api, artist);
      setResponse(res.data);
    } catch (err) {
      setResponse(err.message);
    }
  };

  const getArtists = async () => {
    try {
      const res = await axios.get(api);
      setArtists(res.data);
    } catch (err) {
      setResponse(err.message);
    }
  };

  const updateArtist = async () => {
    try {
      const res = await axios.put(`${api}/${artistId}`, artist);
      setResponse(res.data);
    } catch (err) {
      setResponse(err.message);
    }
  };

  const deleteArtist = async () => {
    try {
      const res = await axios.delete(`${api}/${artistId}`);
      setResponse(res.data);
    } catch (err) {
      setResponse(err.message);
    }
  };

  useEffect(() => {
    getArtists();
  }, []);

  return (
    <div>
      <h2>Artist Manager</h2>
      <input name="name" placeholder="Artist Name" onChange={handleChange} /><br />
      <input name="monthlyListeners" placeholder="Monthly Listeners" onChange={handleChange} /><br />
      <input name="genre" placeholder="Genre" onChange={handleChange} /><br />

      <input placeholder="Artist ID (for update/delete)" onChange={(e) => setArtistId(e.target.value)} /><br />

      <button onClick={createArtist}>Create</button>
      <button onClick={getArtists}>Retrieve</button>
      <button onClick={updateArtist}>Update</button>
      <button onClick={deleteArtist}>Delete</button>

      <div>
        <h3>Server Response:</h3>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </div>

      <div>
        <h3>Artists:</h3>
        <ul>
          {artists.map((a) => (
            <li key={a.id}>{a.name} — {a.genre} — {a.monthlyListeners} listeners</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
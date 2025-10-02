import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Albums() {
  const [album, setAlbum] = useState({
    name: '',
    artistId: '',
    releaseYear: '',
    listens: '',
    songs: '' // comma-separated string
  });
  const [albums, setAlbums] = useState([]);
  const [albumId, setAlbumId] = useState('');
  const [response, setResponse] = useState('');

  const api = 'http://localhost:5500/albums';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlbum({ ...album, [name]: value });
  };

  const createAlbum = async () => {
    try {
      const res = await axios.post(api, {
        ...album,
        songs: album.songs.split(',').map(s => parseInt(s.trim()))
      });
      setResponse(res.data);
    } catch (err) {
      setResponse(err.message);
    }
  };

  const getAlbums = async () => {
    try {
      const res = await axios.get(api);
      setAlbums(res.data);
    } catch (err) {
      setResponse(err.message);
    }
  };

  const updateAlbum = async () => {
    try {
      const res = await axios.put(`${api}/${albumId}`, {
        ...album,
        songs: album.songs.split(',').map(s => parseInt(s.trim()))
      });
      setResponse(res.data);
    } catch (err) {
      setResponse(err.message);
    }
  };

  const deleteAlbum = async () => {
    try {
      const res = await axios.delete(`${api}/${albumId}`);
      setResponse(res.data);
    } catch (err) {
      setResponse(err.message);
    }
  };

  useEffect(() => {
    getAlbums();
  }, []);

  return (
    <div>
      <h2>Album Manager</h2>
      <input name="name" placeholder="Album Name" onChange={handleChange} /><br />
      <input name="artistId" placeholder="Artist ID" onChange={handleChange} /><br />
      <input name="releaseYear" placeholder="Release Year" onChange={handleChange} /><br />
      <input name="listens" placeholder="Number of Listens" onChange={handleChange} /><br />
      <input name="songs" placeholder="Songs (comma-separated IDs)" onChange={handleChange} /><br />
      <input placeholder="Album ID (for update/delete)" onChange={(e) => setAlbumId(e.target.value)} /><br />

      <button onClick={createAlbum}>Create</button>
      <button onClick={getAlbums}>Retrieve</button>
      <button onClick={updateAlbum}>Update</button>
      <button onClick={deleteAlbum}>Delete</button>

      <div>
        <h3>Server Response:</h3>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </div>

      <div>
        <h3>Albums:</h3>
        <ul>
          {albums.map((a) => (
            <li key={a.id}>{a.name} — Artist ID: {a.artistId} — {a.releaseYear} — {a.listens} listens — Songs: {a.songs}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const db = require('../db');

exports.getAllAlbums = (req, res) => {
  db.query('SELECT * FROM albums', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.createAlbum = (req, res) => {
  const { name, artistId, releaseYear, listens, songs } = req.body;
  db.query(
    'INSERT INTO albums (name, artistId, releaseYear, listens, songs) VALUES (?, ?, ?, ?, ?)',
    [name, artistId, releaseYear, listens, JSON.stringify(songs)],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send('💿 Album created');
    }
  );
};

exports.updateAlbum = (req, res) => {
  const { id } = req.params;
  const { name, artistId, releaseYear, listens, songs } = req.body;
  db.query(
    'UPDATE albums SET name = ?, artistId = ?, releaseYear = ?, listens = ?, songs = ? WHERE id = ?',
    [name, artistId, releaseYear, listens, JSON.stringify(songs), id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send('✏️ Album updated');
    }
  );
};

exports.deleteAlbum = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM albums WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('🗑️ Album deleted');
  });
};
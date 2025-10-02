const db = require('../db');

exports.getAllSongs = (req, res) => {
  db.query('SELECT * FROM songs', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.createSong = (req, res) => {
  const { name, releaseYear, albumId } = req.body;
  db.query(
    'INSERT INTO songs (name, releaseYear, albumId) VALUES (?, ?, ?)',
    [name, releaseYear, albumId],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send('🎵 Song created');
    }
  );
};

exports.updateSong = (req, res) => {
  const { id } = req.params;
  const { name, releaseYear, albumId } = req.body;
  db.query(
    'UPDATE songs SET name = ?, releaseYear = ?, albumId = ? WHERE id = ?',
    [name, releaseYear, albumId, id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send('✏️ Song updated');
    }
  );
};

exports.deleteSong = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM songs WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('🗑️ Song deleted');
  });
};
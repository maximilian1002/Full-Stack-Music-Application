const db = require('../db');

exports.getAllArtists = (req, res) => {
  db.query('SELECT * FROM artists', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.createArtist = (req, res) => {
  const { name, monthlyListeners, genre } = req.body;
  db.query(
    'INSERT INTO artists (name, monthlyListeners, genre) VALUES (?, ?, ?)',
    [name, monthlyListeners, genre],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send('🎵 Artist created');
    }
  );
};

exports.updateArtist = (req, res) => {
  const { id } = req.params;
  const { name, monthlyListeners, genre } = req.body;
  db.query(
    'UPDATE artists SET name = ?, monthlyListeners = ?, genre = ? WHERE id = ?',
    [name, monthlyListeners, genre, id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send('✏️ Artist updated');
    }
  );
};

exports.deleteArtist = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM artists WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('🗑️ Artist deleted');
  });
};
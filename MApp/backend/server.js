const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const artistRoutes = require('./routes/artistRoutes');
const songRoutes = require('./routes/songRoutes');
const albumRoutes = require('./routes/albumRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/artists', artistRoutes);
app.use('/songs', songRoutes);
app.use('/albums', albumRoutes);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
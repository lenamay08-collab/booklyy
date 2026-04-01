const express = require('express');
const cors = require('cors');
require('dotenv').config();
const booksRoutes = require('./routes/books');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bookly API is running');
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
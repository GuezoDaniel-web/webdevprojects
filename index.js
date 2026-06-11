require('dotenv').config();
const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/', apiRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).render('error', {
    errorCode: 404,
    errorMessage: 'Page not found',
    errorDescription: 'The page you are looking for does not exist.'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).render('error', {
    errorCode: 500,
    errorMessage: 'Server error',
    errorDescription: 'Something went wrong. Please try again later.'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎵 Spotify Music Discovery App running on http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop the server');
});

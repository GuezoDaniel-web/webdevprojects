const express = require('express');
const axios = require('axios');
const router = express.Router();

// Spotify API configuration
const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';
let accessToken = null;
let tokenExpiry = null;

// Function to get or refresh access token
async function getAccessToken() {
  const now = Date.now();
  
  // Return existing token if still valid
  if (accessToken && tokenExpiry && now < tokenExpiry) {
    return accessToken;
  }

  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    
    if (!clientId || !clientSecret) {
      throw new Error('Missing Spotify credentials in .env file');
    }

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    
    const response = await axios.post('https://accounts.spotify.com/api/token', 
      'grant_type=client_credentials',
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    accessToken = response.data.access_token;
    tokenExpiry = now + (response.data.expires_in * 1000) - 60000; // Refresh 1 minute before expiry
    
    return accessToken;
  } catch (error) {
    console.error('Error getting Spotify token:', error.message);
    throw new Error('Failed to authenticate with Spotify API');
  }
}

// Home page route
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Spotify Music Discovery',
    searchQuery: '',
    results: null,
    error: null
  });
});

// Search route
router.post('/search', async (req, res) => {
  const { query, type = 'track' } = req.body;

  // Validate input
  if (!query || query.trim() === '') {
    return res.render('index', {
      title: 'Spotify Music Discovery',
      searchQuery: '',
      results: null,
      error: 'Please enter a search query'
    });
  }

  try {
    const token = await getAccessToken();
    
    // Build search parameters
    const searchTypes = type === 'all' ? 'track,artist,album' : type;
    const params = {
      q: query.trim(),
      type: searchTypes,
      limit: 20
    };

    // Make API request
    const response = await axios.get(`${SPOTIFY_API_BASE}/search`, {
      params,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const results = {
      tracks: response.data.tracks?.items || [],
      artists: response.data.artists?.items || [],
      albums: response.data.albums?.items || []
    };

    // Check if any results were found
    const hasResults = results.tracks.length > 0 || 
                       results.artists.length > 0 || 
                       results.albums.length > 0;

    res.render('results', {
      title: `Search Results for "${query}"`,
      searchQuery: query,
      results: hasResults ? results : null,
      type,
      error: !hasResults ? 'No results found. Try searching with different keywords.' : null
    });

  } catch (error) {
    console.error('Search error:', error.message);
    const errorMessage = error.message === 'Missing Spotify credentials in .env file'
      ? 'Application is not properly configured. Please add Spotify credentials to .env file.'
      : 'Unable to search. Please try again later.';

    res.render('index', {
      title: 'Spotify Music Discovery',
      searchQuery: query,
      results: null,
      error: errorMessage
    });
  }
});

// Get artist details route
router.get('/artist/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const token = await getAccessToken();

    // Fetch artist details and top tracks
    const [artistResponse, topTracksResponse] = await Promise.all([
      axios.get(`${SPOTIFY_API_BASE}/artists/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      }),
      axios.get(`${SPOTIFY_API_BASE}/artists/${id}/top-tracks`, {
        params: { market: 'US' },
        headers: { 'Authorization': `Bearer ${token}` }
      })
    ]);

    const artist = artistResponse.data;
    const topTracks = topTracksResponse.data.tracks;

    res.render('artist', {
      title: `${artist.name} - Artist Details`,
      artist,
      topTracks,
      error: null
    });

  } catch (error) {
    console.error('Artist fetch error:', error.message);
    res.status(404).render('error', {
      errorCode: 404,
      errorMessage: 'Artist not found',
      errorDescription: 'We could not find the artist you are looking for.'
    });
  }
});

module.exports = router;

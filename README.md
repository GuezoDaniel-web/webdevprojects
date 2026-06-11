# 🎵 Spotify Music Discovery Application

A modern, production-ready web application for discovering and searching music using the **Spotify API**. Built with **Node.js**, **Express.js**, **Axios**, and **EJS**, this application demonstrates professional full-stack development practices.

## ✨ Features

- **🔍 Smart Search**: Search for tracks, artists, and albums in real-time
- **🎤 Artist Details**: View detailed artist information including top tracks and genres
- **🎵 Track Information**: Access track metadata, album info, and audio previews
- **📱 Responsive Design**: Mobile-first design that works on all devices
- **🎨 Modern UI**: Spotify-inspired dark theme with smooth animations
- **⚡ Fast Performance**: Optimized API calls with token caching
- **🛡️ Error Handling**: Comprehensive error handling and user feedback
- **🔐 Secure**: Environment-based configuration for API credentials

## 🚀 Live Demo

This application is designed to be deployed on platforms like Heroku, Vercel, or any Node.js hosting service.

## 📋 Requirements

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Spotify Developer Account** (free tier works fine)

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/spotify-music-discovery.git
cd spotify-music-discovery
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Get Spotify API Credentials

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in or create a free account
3. Create a new application
4. Accept the terms and create the app
5. Copy your **Client ID** and **Client Secret**

### 4. Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Edit the .env file and add your Spotify credentials
```

**`.env` file:**
```
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
PORT=3000
NODE_ENV=development
```

### 5. Start the Application

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
spotify-music-discovery/
│
├── public/
│   ├── css/
│   │   └── styles.css          # All styling (responsive, modern UI)
│   ├── js/
│   │   └── app.js              # Client-side JavaScript
│   └── images/                 # Static images
│
├── views/
│   ├── partials/
│   │   ├── header.ejs          # Navigation and header
│   │   └── footer.ejs          # Footer content
│   ├── index.ejs               # Home page with search
│   ├── results.ejs             # Search results display
│   ├── error.ejs               # Error pages (404, 500)
│   └── artist.ejs              # Artist detail page
│
├── routes/
│   └── apiRoutes.js            # All API endpoints and Spotify integration
│
├── index.js                    # Main Express application file
├── package.json                # Project dependencies and scripts
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── README.md                   # This file
└── .env                        # Your local environment (not in git)
```

## 🛣️ API Endpoints

### GET `/`
- **Description**: Home page with search interface
- **Response**: Renders the home page with search form

### POST `/search`
- **Description**: Search for tracks, artists, or albums
- **Parameters**:
  - `query` (string, required): Search term
  - `type` (string, optional): 'track', 'artist', 'album', or 'all'
- **Response**: Results page with matching content

### GET `/artist/:id`
- **Description**: Get detailed information about an artist
- **Parameters**:
  - `id` (string, required): Spotify artist ID
- **Response**: Artist detail page with top tracks

### Error Handlers
- **404**: Page not found
- **500**: Server error

## 🎯 How It Works

### 1. **User Initiates Search**
   - User enters search query and selects content type on home page

### 2. **Server Receives Request**
   - Express receives POST request to `/search` endpoint

### 3. **API Authentication**
   - Server gets or refreshes Spotify access token using Client Credentials flow
   - Token is cached to minimize API calls

### 4. **API Call**
   - Axios sends request to Spotify `/search` endpoint
   - Parameters: query, type (track/artist/album), limit

### 5. **Response Processing**
   - Server receives JSON response from Spotify
   - Data is organized and filtered
   - Results passed to EJS template

### 6. **Dynamic Rendering**
   - EJS renders results with dynamic data
   - Images, metadata, and links are populated
   - HTML is sent to client browser

### 7. **User Interaction**
   - User can click artist names to view details
   - Audio previews available (if provided by Spotify)
   - Direct links to Spotify for full experience

## 🔐 Authentication

This application uses **Spotify OAuth 2.0 Client Credentials Flow**:

- No user login required
- Application-level authentication only
- Perfect for public data access
- Access tokens cached for 1 hour (refreshed 1 minute before expiry)

## 📡 API Rate Limiting

Spotify API has the following limits:
- **Rate Limit**: 429,000 requests per second per user
- **Practical Limit**: ~180 requests per minute for the Client Credentials flow

The application handles rate limiting by:
- Caching tokens (reduces authentication calls)
- Implementing proper error handling
- Providing user-friendly error messages

## 🎨 Styling Features

- **Spotify Color Scheme**: Green (#1DB954) primary, dark theme
- **Responsive Grid Layout**: Auto-adjusts from 1 column (mobile) to 4 columns (desktop)
- **Hover Effects**: Smooth transforms and shadows
- **Dark Theme**: Easy on the eyes, modern aesthetic
- **Mobile-First Design**: Optimized for all screen sizes

## 🚨 Error Handling

The application handles various error scenarios:

### User-Facing Errors
- Empty search queries
- No results found
- API authentication failures
- Network timeouts
- Invalid artist IDs

### Error Messages
- Friendly, non-technical messages
- Suggestions for next steps
- Links to recover (return to search)

### Logging
- Console logs for debugging
- Stack traces in development
- Error details logged for troubleshooting

## 📊 Key Technologies

| Technology | Purpose |
|-----------|---------|
| **Node.js** | JavaScript runtime for server |
| **Express.js** | Web framework for routing |
| **Axios** | HTTP client for API requests |
| **EJS** | Templating engine for dynamic HTML |
| **CSS3** | Styling and responsive design |
| **Spotify API** | Music data source |

## 🧪 Testing

### Manual Testing Checklist

```bash
# 1. Start the server
npm run dev

# 2. Test home page
- Navigate to http://localhost:3000
- Verify page loads without errors
- Check navbar and footer

# 3. Test search functionality
- Search for "Taylor Swift" (track)
- Search for "The Weeknd" (artist)
- Search for "Thriller" (album)
- Search for something with no results

# 4. Test artist page
- Click on an artist from search results
- Verify artist details load
- Check top tracks display

# 5. Test error handling
- Try invalid URLs (404)
- Check error messages display properly

# 6. Test responsive design
- View on desktop (1920px)
- View on tablet (768px)
- View on mobile (375px)
```

## 📝 Git Workflow

This project follows best practices:

```bash
# Initial setup
git init
git add .
git commit -m "Initial project setup"

# Feature branches
git checkout -b feature/search-improvement
# Make changes
git add .
git commit -m "Improved search filters"
git push origin feature/search-improvement

# Code review and merge
# Create pull request on GitHub
# After approval, merge to main
```

## 🚀 Deployment

### Heroku Deployment

```bash
# 1. Create Heroku app
heroku create your-app-name

# 2. Set environment variables
heroku config:set SPOTIFY_CLIENT_ID=your_id
heroku config:set SPOTIFY_CLIENT_SECRET=your_secret

# 3. Deploy
git push heroku main
```

### Vercel Deployment

This is a Node.js application and can be deployed to Vercel using serverless functions.

### Docker Deployment

```dockerfile
FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔮 Future Improvements

- [ ] User authentication (save favorite searches)
- [ ] Playlist creation
- [ ] Recommendations based on search
- [ ] Advanced filtering (year, genre, popularity)
- [ ] Dark/Light theme toggle
- [ ] Keyboard shortcuts
- [ ] Infinite scroll pagination
- [ ] Export search results
- [ ] Social sharing features
- [ ] Browser history
- [ ] Caching strategies with Redis
- [ ] WebSocket for real-time updates

## 📚 Learning Resources

- [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api)
- [Express.js Guide](https://expressjs.com/)
- [EJS Documentation](https://ejs.co/)
- [Axios Documentation](https://axios-http.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

## ⚠️ Disclaimer

This is an **unofficial** application that uses the Spotify API. It is not endorsed by or affiliated with Spotify AB. All Spotify trademarks and branding are the property of Spotify AB.

## 💬 Support

For questions or issues:
- Open an issue on GitHub
- Check existing documentation
- Review Spotify API docs for API-related questions

## 👨‍💻 Author

Built by a Senior Full-Stack Developer as a demonstration of production-ready web development practices.

---

**Happy coding! 🎉**

If you find this project helpful, please consider giving it a ⭐ on GitHub!

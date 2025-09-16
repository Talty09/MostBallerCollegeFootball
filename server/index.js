const express = require('express');
const axios = require('axios');
const cors = require('cors');
const https = require('https');

const app = express();

// Configure CORS to allow Angular frontend
app.use(cors({
  origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Configure axios to handle SSL certificates properly
const httpsAgent = new https.Agent({
  rejectUnauthorized: false // For development only - allows self-signed certificates
});

// Configure axios defaults
axios.defaults.httpsAgent = httpsAgent;
axios.defaults.timeout = 10000; // 10 second timeout

// ESPN College Football API endpoint with week override
const getEspnApiUrl = (week = 3, year = new Date().getFullYear()) => {
  return `https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?year=${year}&week=${week}`;
};

app.get('/api/scoreboard', async (req, res) => {
  try {
    // Accept week and year as query params, default to week 3 and 2025
    const week = parseInt(req.query.week) || 3;
    const year = parseInt(req.query.year) || 2025;
    const url = getEspnApiUrl(week, year);
    console.log('Fetching from ESPN:', url);
    
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
      },
      httpsAgent: httpsAgent,
      timeout: 10000
    });
    
    console.log('ESPN API response status:', response.status);
    console.log('Number of events found:', response.data.events?.length || 0);
    res.json(response.data);
  } catch (error) {
    console.error('ESPN API error:', error.message);
    if (error.response) {
      console.error('Error status:', error.response.status, error.response.statusText);
      console.error('Error data:', error.response.data);
    }
    res.status(500).json({ 
      error: 'Failed to fetch data from ESPN API', 
      details: error.message,
      status: error.response?.status || 'Network Error'
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

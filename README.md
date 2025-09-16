# College Football Scoreboard 🏈

A modern web application that displays real-time college football scores and game information using the ESPN API. Built with Angular and Material Design for a responsive, beautiful user interface.

## 🎯 Features

- **Real-time Game Data**: Fetches live college football scores from ESPN API
- **2025 Season**: Specifically configured for the 2025 college football season
- **Week Selection**: Dropdown to view games for any week (1-17)
- **Material Design**: Modern, responsive UI with Google Material Design
- **Team Information**: Displays team names, scores, records, and winner highlighting
- **Game Details**: Shows venue information, game status, and broadcast details
- **Loading States**: Smooth loading animations and error handling
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🛠️ Tech Stack

- **Frontend**: Angular 18+ (Standalone Components)
- **UI Library**: Angular Material
- **Backend**: Node.js with Express
- **API**: ESPN College Football API
- **Styling**: SCSS with Material Design theme
- **HTTP Client**: Axios (backend), Angular HttpClient (frontend)

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/college-football-scoreboard.git
   cd college-football-scoreboard
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   node index.js
   ```
   Server will run on `http://localhost:3000`

2. **Start the Angular development server**
   ```bash
   cd client
   ng serve --port 4200
   ```
   Frontend will run on `http://localhost:4200`

3. **Open your browser**
   Navigate to `http://localhost:4200` to view the application

## 📁 Project Structure

```
college-football-scoreboard/
├── client/                 # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.ts      # Main component
│   │   │   ├── app.scss    # Component styles
│   │   │   ├── espn.service.ts # API service
│   │   │   └── ...
│   │   ├── index.html      # Main HTML file
│   │   └── styles.scss     # Global styles
│   ├── package.json
│   └── angular.json
├── server/                 # Node.js backend
│   ├── index.js           # Express server
│   └── package.json
├── .gitignore
└── README.md
```

## 🎮 Usage

1. **Select a Week**: Use the dropdown in the top-right to select any week (1-17)
2. **View Games**: Game cards display team matchups, scores, and status
3. **Game Details**: Each card shows venue, broadcast info, and winner highlighting
4. **Responsive**: Resize your window to see the responsive grid layout

## 🔧 Configuration

### Backend Configuration (server/index.js)
- **Port**: Server runs on port 3000 (configurable)
- **CORS**: Configured to allow Angular frontend access
- **API Endpoint**: `/api/scoreboard?week={week}&year={year}`

### Frontend Configuration (client/src/app/app.ts)
- **Default Week**: Set to week 3 (current week in season)
- **Season Year**: Hard-coded to 2025
- **Week Range**: 1-17 weeks available

## 🌐 API Endpoints

### Backend Endpoints
- `GET /api/scoreboard?week={week}&year={year}` - Get games for specific week

### ESPN API Integration
- Uses ESPN's public college football API
- Endpoint: `https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard`
- No API key required

## 🎨 Customization

### Changing the Theme
Edit `client/src/styles.scss` to change the Material Design theme:
```scss
@import '@angular/material/prebuilt-themes/indigo-pink.css'; // Different theme
```

### Modifying the Season
Update the year in `client/src/app/app.ts`:
```typescript
year = 2026; // Change to desired year
```

## 🚀 Deployment

### GitHub Pages (Frontend Only)
1. Build the Angular app: `ng build --base-href="/repository-name/"`
2. Deploy the `dist/` folder to GitHub Pages

### Full Stack Deployment
- **Frontend**: Deploy to Vercel, Netlify, or GitHub Pages
- **Backend**: Deploy to Heroku, Railway, or DigitalOcean
- Update API URLs in the frontend service

## 🐛 Troubleshooting

### Common Issues
- **CORS Errors**: Ensure backend CORS is configured for your frontend URL
- **API Failures**: Check if ESPN API is accessible and season/week is valid
- **Build Errors**: Ensure all dependencies are installed with correct versions

### Debug Mode
Enable console logging in the browser to see API responses and error details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- ESPN for providing the college football API
- Angular team for the excellent framework
- Material Design team for the beautiful components

## 📞 Support

If you have questions or need help:
1. Check the [Issues](https://github.com/yourusername/college-football-scoreboard/issues) page
2. Create a new issue with detailed information
3. Include browser console errors and steps to reproduce

---

**Note**: This application is for educational purposes. ESPN API usage should comply with their terms of service.

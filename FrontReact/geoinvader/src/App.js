import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GeoInvaderMenu from './GeoInvaderMenu';
import PlayPage from './PlayPage';
import HighScoresPage from './HighScoresPage';
import SettingsPage from './SettingsPage';
import AboutPage from './AboutPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<GeoInvaderMenu />} />
                <Route path="/play" element={<PlayPage />} />
                <Route path="/high-scores" element={<HighScoresPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/about" element={<AboutPage />} />
            </Routes>
        </Router>
    );
}

export default App;

import React, { useState, useEffect } from 'react';
import Game from './CanvasComponent';
import { Button, Card as MuiCard, CardActionArea, CardContent, Typography, Grid, Container, styled } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import './App.css';
import backgroundImage from './assets/backgroundGeoinvader1.png';

const NeonButton = styled(Button)({
    color: '#a2ff00',
    '&:hover': {
        backgroundColor: 'rgba(162, 255, 0, 0.2)',
        boxShadow: '0 0 8px #fff, 0 0 20px #fff, 0 0 30px #08f',
    },
    margin: '20px 0',
    marginLeft:'10px'
});
const NeonTypography = styled(Typography)({
    textShadow: '0 0 8px #fff, 0 0 20px #fff, 0 0 30px #08f, 0 0 40px #08f, 0 0 50px #08f, 0 0 60px #08f, 0 0 70px #08f',
    color: '#a2ff00', // Bright neon color
});
const NeonCard = styled(MuiCard)({
    backgroundColor: '#000', // Black background
    color: '#a2ff00', // Neon green text
    border: '1px solid #a2ff00', // Neon green border
    '&:hover': {
        boxShadow: '0 0 8px #a2ff00, 0 0 20px #a2ff00, 0 0 30px #a2ff00',
    },
});
const PlayPage = () => {
    const [games, setGames] = useState([]);
    const [selectedGameId, setSelectedGameId] = useState(null);
    const navigate = useNavigate();
    const handleBackToMenu = () => {
        navigate('/');
    };

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch('/Game');
                const data = await response.json();
                setGames(data.sort((a, b) => a.difficultyLevel - b.difficultyLevel));
            } catch (error) {
                console.error('Failed to fetch games:', error);
            }
        };

        fetchGames();
    }, []);

    return (
        <Grid style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh'}}>
            {selectedGameId ? (
                <div className="canvas-container">
                    <Game gameId={selectedGameId} />
                    <NeonButton onClick={() => setSelectedGameId(null)} startIcon={<ExitToAppIcon />}>
                        Back to game selection
                    </NeonButton>
                </div>
            ) : (
                <>
                    <NeonButton onClick={handleBackToMenu} startIcon={<ExitToAppIcon />}>
                        Back to Menu
                    </NeonButton>
                    <NeonTypography variant="h4" gutterBottom style={{ color: '#a2ff00' , textAlign:'center' , marginBottom:'40px' }}>
                        Select a level to play
                    </NeonTypography>
                    <Grid container spacing={3}>
                        {games.map((game) => (
                            <Grid item key={game.gameID} xs={12} sm={6} md={4}>
                                <NeonCard style={{ textAlign:'center' }}>
                                    <CardActionArea onClick={() => setSelectedGameId(game.gameID)}>
                                        <CardContent>
                                            <NeonTypography gutterBottom variant="h4" component="h2">
                                                {game.name}
                                            </NeonTypography>
                                            <NeonTypography gutterBottom variant="body2" component="h2">
                                                Difficulty level {game.difficultyLevel}
                                            </NeonTypography>
                                            {/*<NeonTypography variant="body2" component="p">*/}
                                            {/*    Game ID: {game.gameID}*/}
                                            {/*</NeonTypography>*/}
                                            <NeonTypography variant="body3" component="p">
                                                High Score to beat : {game.highScore}
                                            </NeonTypography>
                                        </CardContent>
                                    </CardActionArea>
                                </NeonCard>
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </Grid>
    );
};

export default PlayPage;

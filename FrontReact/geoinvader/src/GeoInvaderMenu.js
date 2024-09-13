import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, styled } from '@mui/material';
import logoImage from './assets/GeoInvaderLogoV1-bgtrans.png';


const StyledToolbar = styled(Toolbar)({
    justifyContent: 'center',
    height: '100vh',
    flexDirection: 'column',
    margin : 0,
});

const NeonTypography = styled(Typography)({
    textShadow: '0 0 8px #fff, 0 0 20px #fff, 0 0 30px #08f, 0 0 40px #08f, 0 0 50px #08f, 0 0 60px #08f, 0 0 70px #08f',
    color: '#a2ff00', // Bright neon color
});

const NeonButton = styled(Button)({
    color: '#a2ff00',
    '&:hover': {
        backgroundColor: 'rgba(162, 255, 0, 0.2)',
        boxShadow: '0 0 8px #fff, 0 0 20px #fff, 0 0 30px #08f',
    },
    margin: '100px 25px',
});

const GeoInvaderMenu = () => {
    const navigate = useNavigate();

    return (
        <>
            <StyledToolbar>
                <img src={logoImage} alt="Geo Invader Logo" style={{ width: '500px' }} />

                <div style={{ textAlign: 'center' }}>
                    <NeonButton onClick={() => navigate('/play')}>Play</NeonButton>
                    <NeonButton onClick={() => navigate('/high-scores')}>High Scores</NeonButton>
                    <NeonButton onClick={() => navigate('/settings')}>Settings</NeonButton>
                    <NeonButton onClick={() => navigate('/about')}>About</NeonButton>
                </div>
            </StyledToolbar>
        </>
    );
};

export default GeoInvaderMenu;


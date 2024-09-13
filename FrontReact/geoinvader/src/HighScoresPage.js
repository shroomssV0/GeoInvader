import React, { useEffect, useState } from 'react';
import {
    Table,
    styled,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const NeonButton = styled(Button)({
    color: '#a2ff00',
    '&:hover': {
        backgroundColor: 'rgba(162, 255, 0, 0.2)',
        boxShadow: '0 0 8px #fff, 0 0 20px #fff, 0 0 30px #08f',
    },
    margin: '20px 0',
    marginLeft:'10px'
});
const StyledTableContainer = styled(TableContainer)({
    maxWidth: 650,
    margin: 'auto',
    marginTop: '50px',
    backgroundColor: '#121212',
    border: '1px solid #08f', // Neon-like glow border
});

const NeonTypography = styled(Typography)({
    textShadow: '0 0 8px #fff, 0 0 20px #fff, 0 0 30px #08f, 0 0 40px #08f, 0 0 50px #08f, 0 0 60px #08f, 0 0 70px #08f',
    color: '#a2ff00',
    textAlign: 'center',
    margin: '0 0 20px 0', // Remove top margin
});

const NeonTableCell = styled(TableCell)({
    color: '#a2ff00',
    borderColor: '#a2ff00',
});

const HighScorePage = () => {
    const [scores, setScores] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/Game')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => setScores(data))
            .catch(error => console.error("There was a problem with your fetch operation:", error));
    }, []);

    return (
        <div style={{backgroundColor: '#000', color: '#fff', minHeight: '100vh', margin: 0 }}>
            <NeonButton onClick={() => navigate('/')} startIcon={<ExitToAppIcon />}>
                Back to Menu
            </NeonButton>
            <NeonTypography variant="h4">High Scores</NeonTypography>
            <StyledTableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <NeonTableCell align="center">Game ID</NeonTableCell>
                            <NeonTableCell align="center">Difficulty Level</NeonTableCell>
                            <NeonTableCell align="center">High Score</NeonTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {scores.map((row) => (
                            <TableRow key={row.gameID}>
                                <NeonTableCell align="center">{row.gameID}</NeonTableCell>
                                <NeonTableCell align="center">{row.difficultyLevel}</NeonTableCell>
                                <NeonTableCell align="center">{row.highScore}</NeonTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>
        </div>
    );
};

export default HighScorePage;

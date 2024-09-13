import React, { useState, useEffect, useRef } from 'react';
import {
    Button,
    Container,
    Typography,
    Grid,
    TextField,
    Card,
    CardContent,
    CardActions,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    styled
} from '@mui/material';
import CreateGameStepper from './CreateGameStepper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const AdminPage = () => {
    const [games, setGames] = useState([]);
    const [selectedGameId, setSelectedGameId] = useState(null);
    const [gameDetails, setGameDetails] = useState({
        difficultyLevel: '',
        currentScore: 0,
        highScore: 0,
    });
    const [shapesData, setShapesData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const canvasRefs = useRef([]);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [showCreateGameModal, setShowCreateGameModal] = useState(false);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [gameIdToDelete, setGameIdToDelete] = useState(null);
    const navigate = useNavigate();

    const NeonButton = styled(Button)({
        color: '#a2ff00',
        '&:hover': {
            backgroundColor: 'rgba(162, 255, 0, 0.2)',
            boxShadow: '0 0 8px #fff, 0 0 20px #fff, 0 0 30px #08f',
        },
        margin: '20px 0',
        marginLeft:'5px'
    });
    const NeonTypography = styled(Typography)({
        textShadow: '0 0 8px #fff, 0 0 20px #fff, 0 0 30px #08f, 0 0 40px #08f, 0 0 50px #08f, 0 0 60px #08f, 0 0 70px #08f',
        color: '#a2ff00', // Bright neon color
    });

    const openDeleteConfirmation = (gameId) => {
        setGameIdToDelete(gameId);
        setDeleteConfirmationOpen(true);
    };

    const closeDeleteConfirmation = () => {
        setDeleteConfirmationOpen(false);
        setGameIdToDelete(null);
    };
    const toggleCreateGameModal = () => {
        setShowCreateGameModal(!showCreateGameModal);
    };

    const showModal = (message) => {
        setConfirmationMessage(message);
        setShowConfirmationModal(true);
    };

    const fetchAllGames = async () => {
        try {
            const response = await fetch('/Game');
            if (!response.ok) throw new Error('Failed to fetch games.');
            const data = await response.json();
            setGames(data);
        } catch (error) {
            showModal(`Error fetching games: ${error.message}`);
        }
    };
    useEffect(() => {
        fetchAllGames();
    }, []);

    useEffect(() => {
        if (selectedGameId) {
            fetchGameById(selectedGameId);
        }
    }, [selectedGameId]);

    const fetchGameById = async (gameId) => {
        try {
            const response = await fetch(`/Game/${gameId}`);
            const data = await response.json();
            setGameDetails(data);
            setShapesData(data.forms || []);
        } catch (error) {
            showModal(`Erreur lors du fetch du Game avec id : ${gameId}`, error);
        }
    };
    const deleteGame = async () => {
        try {
            const response = await fetch(`/Game/${gameIdToDelete}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete the game.');

            showModal('Game deleted successfully.');
            closeDeleteConfirmation();
            await fetchAllGames();
        } catch (error) {
            showModal(`Error deleting game: ${error.message}`);
            closeDeleteConfirmation();
        }
    };

    const handleInputChange = (index, field, value) => {
        const updatedShapesData = [...shapesData];
        updatedShapesData[index] = { ...updatedShapesData[index], [field]: value };
        setShapesData(updatedShapesData);
        drawShapeOnCanvas(canvasRefs.current[index], updatedShapesData[index]);
    };

    const drawShapeOnCanvas = (canvas, shape) => {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let fillColor = '#000000'; // Default fill color

        // Determine fill color based on role
        switch (shape.role) {
            case 0:
                fillColor = '#FFCC00';
                break;
            case 1:
                fillColor = '#00ffe1';
                break;
            case 2:
                fillColor = '#ff0059';
                if (shape.formType === 'Cercle') {
                    fillColor = '#9900ff';
                } else if (shape.formType === 'Triangle') {
                    fillColor = '#66ff00';
                }
                break;
            default:
                console.log('Unknown Role');
        }

        ctx.beginPath();
        ctx.strokeStyle = '#000000';

        switch (shape.formType) {
            case 'Cercle':
                ctx.arc(125, 150, shape.radius, 0, 2 * Math.PI);
                ctx.fillStyle = fillColor;
                break;
            case 'Rectangle':
                ctx.rect(100, 125, shape.width, shape.length);
                ctx.fillStyle = fillColor;
                break;
            case 'Triangle':
                ctx.moveTo(100, 175);
                ctx.lineTo(100 + shape.base / 2, 175 - shape.height);
                ctx.lineTo(100 + shape.base, 175);
                ctx.closePath();
                ctx.fillStyle = fillColor;
                break;
            default:
                console.log('Unknown Shape Type');
        }

        ctx.fill();
        ctx.stroke();
    };

    useEffect(() => {
        // Redraw all shapes when shapesData or the modal opens
        if (openModal && shapesData.length) {
            shapesData.forEach((shape, index) => {
                drawShapeOnCanvas(canvasRefs.current[index], shape);
            });
        }
    }, [openModal, shapesData]);

    const handleModalOpen = () => {
        setSelectedGameId(null); // Reset selected game ID if necessary
        setOpenModal(true);
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };
    const selectGame = (gameId) => {
        setSelectedGameId(gameId); // Correctly set the game ID
        fetchGameById(gameId); // Fetch and set game details
        setOpenModal(true); // Open the modal for editing
    };
    const getRoleLabel = (role) => {
        switch (role) {
            case 0: return "Player";
            case 1: return "Projectile";
            case 2: return "Target";
            default: return "Unknown";
        }
    };
    const saveGameDetails = async () => {
        if (!selectedGameId) {
            showModal("No game selected for saving.");
            return;
        }

        try {
            const response = await fetch(`/Game/${selectedGameId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(gameDetails),
            });

            if (!response.ok) throw new Error('Failed to save game details.');
            showModal('Game details saved successfully.');
            await fetchAllGames();
        } catch (error) {
            showModal(`Error saving game details: ${error.message}`);
        }
    };
    const saveShapeDetails = async (shape, index) => {
        try {
            const response = await fetch(`/form/${shape.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(shape),
            });
            if (!response.ok) throw new Error('Failed to save shape details.');
            showModal(`Shape ${index + 1} (${getRoleLabel(shape.role)}) saved successfully.`);
            await fetchAllGames();
        } catch (error) {
            showModal(`Error saving shape ${index + 1}: ${error.message}`);
        }
    };


    return (
        <Grid style={{ backgroundColor: '#000', color:'#a2ff00', minHeight: '100vh'}}>
            <NeonButton onClick={() => navigate('/')} startIcon={<ExitToAppIcon />}>
                Back to Menu
            </NeonButton>
            <NeonTypography variant="h2" style={{ textAlign:'center' }} gutterBottom>Game Dashboard</NeonTypography>
            <Grid container alignItems="center" justifyContent="center" spacing={2}>
                <Grid item>
                    <NeonButton variant="outlined" onClick={toggleCreateGameModal} startIcon={<AddIcon />}>
                        Create Game
                    </NeonButton>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                {games.map((game) => (
                    <Grid item xs={12} sm={6} md={4} key={game.gameID}>
                        <Card variant="outlined" style={{ backgroundColor: '#000' , color:'white' , borderColor:'white', textAlign:'center'}}>
                            <CardContent>
                                <NeonTypography variant="h4" component="div">{game.name}</NeonTypography>
                                <NeonTypography variant="h7" component="div">Game ID: {game.gameID} Difficuly Level : {game.difficultyLevel} </NeonTypography>
                            </CardContent>
                            <CardActions style={{ justifyContent: 'space-between' }}>
                                <Button
                                    size="small"
                                    onClick={() => selectGame(game.gameID)} // Example gameID
                                    startIcon={<EditIcon />}
                                >
                                    Edit Game & Form
                                </Button>
                                <Button
                                    size="small"
                                    color="error"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => openDeleteConfirmation(game.gameID)} // Example gameID
                                >
                                    Delete Game
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={openModal} onClose={handleModalClose} maxWidth="xl" fullWidth>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>Game {gameDetails.gameID} Details</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                margin="dense"
                                id="name"
                                label="Name"
                                type="text"
                                size="small"
                                InputProps={{ inputProps: { maxLength: 20 } }} // Limits input length
                                fullWidth
                                variant="outlined"
                                value={gameDetails.name || ''}
                                onChange={(e) => setGameDetails({ ...gameDetails, name: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                margin="dense"
                                id="difficultyLevel"
                                label="Difficulty"
                                type="text"
                                size="small"
                                InputProps={{ inputProps: { maxLength: 10 } }} // Limits input length
                                fullWidth
                                variant="outlined"
                                value={gameDetails.difficultyLevel || ''}
                                onChange={(e) => setGameDetails({ ...gameDetails, difficultyLevel: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                margin="dense"
                                id="currentScore"
                                label="Current Score"
                                type="number"
                                size="small"
                                InputProps={{ inputProps: { max: 9999 } }} // Limits input to 4 numbers
                                fullWidth
                                variant="outlined"
                                value={gameDetails.currentScore || ''}
                                onChange={(e) => setGameDetails({ ...gameDetails, currentScore: parseInt(e.target.value, 10) })}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                margin="dense"
                                id="highScore"
                                label="High Score"
                                type="number"
                                size="small"
                                InputProps={{ inputProps: { max: 9999 } }} // Limits input to 4 numbers
                                fullWidth
                                variant="outlined"
                                value={gameDetails.highScore || ''}
                                onChange={(e) => setGameDetails({ ...gameDetails, highScore: parseInt(e.target.value, 10) })}
                            />
                        </Grid>
                        <Grid item xs={1} style={{ textAlign: 'right' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                id = {gameDetails.gameID}
                                onClick={saveGameDetails}
                                size="small"
                                startIcon={<SaveIcon />}>
                                Save Game
                            </Button>
                        </Grid>
                        {shapesData.map((shape, index) => (
                            <React.Fragment key={index}>
                                <Grid item xs={12} sm={4} lg={2}>
                                    <Typography variant="caption">{getRoleLabel(shape.role)} Details</Typography>
                                    <canvas width="200" height="200" ref={el => canvasRefs.current[index] = el}></canvas>
                                </Grid>
                                <Grid item xs={12} sm={8} lg={2}>
                                    <TextField
                                        margin="dense"
                                        id={`x-${index}`}
                                        label="X"
                                        type="number"
                                        size="small"
                                        InputProps={{ inputProps: { max: 1920 } }}
                                        fullWidth
                                        variant="outlined"
                                        value={shape.x || ''}
                                        onChange={(e) => handleInputChange(index, 'x', parseFloat(e.target.value))}
                                    />
                                    <TextField
                                        margin="dense"
                                        id={`y-${index}`}
                                        label="Y"
                                        type="number"
                                        size="small"
                                        InputProps={{ inputProps: { max: 1080 } }}
                                        fullWidth
                                        variant="outlined"
                                        value={shape.y || ''}
                                        onChange={(e) => handleInputChange(index, 'y', parseFloat(e.target.value))}
                                    />
                                    <TextField
                                        margin="dense"
                                        id={`radius-${index}`}
                                        label="Radius"
                                        type="number"
                                        size="small"
                                        InputProps={{ inputProps: { max: 1000 } }}
                                        fullWidth
                                        variant="outlined"
                                        value={shape.radius || ''}
                                        onChange={(e) => handleInputChange(index, 'radius', parseFloat(e.target.value))}
                                    />
                                    <TextField
                                        margin="dense"
                                        id={`length-${index}`}
                                        label="Length"
                                        type="number"
                                        size="small"
                                        InputProps={{ inputProps: { max: 1000 } }}
                                        fullWidth
                                        variant="outlined"
                                        value={shape.length || ''}
                                        onChange={(e) => handleInputChange(index, 'length', parseFloat(e.target.value))}
                                    />
                                    <TextField
                                        margin="dense"
                                        id={`width-${index}`}
                                        label="Width"
                                        type="number"
                                        size="small"
                                        InputProps={{ inputProps: { max: 1000 } }}
                                        fullWidth
                                        variant="outlined"
                                        value={shape.width || ''}
                                        onChange={(e) => handleInputChange(index, 'width', parseFloat(e.target.value))}
                                    />
                                    <TextField
                                        margin="dense"
                                        id={`base-${index}`}
                                        label="Base"
                                        type="number"
                                        size="small"
                                        InputProps={{ inputProps: { max: 1000 } }}
                                        fullWidth
                                        variant="outlined"
                                        value={shape.base || ''}
                                        onChange={(e) => handleInputChange(index, 'base', parseFloat(e.target.value))}
                                    />
                                    <TextField
                                        margin="dense"
                                        id={`height-${index}`}
                                        label="Height"
                                        type="number"
                                        size="small"
                                        InputProps={{ inputProps: { max: 1000 } }}
                                        fullWidth
                                        variant="outlined"
                                        value={shape.height || ''}
                                        onChange={(e) => handleInputChange(index, 'height', parseFloat(e.target.value))}
                                    />
                                    <Grid item xs={12} style={{ textAlign: 'left' }}>
                                        <Button variant="contained" color="primary" onClick={() => saveShapeDetails(shape, index)} size="small" startIcon={<SaveIcon />}>
                                            Save {getRoleLabel(shape.role)}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        ))}

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalClose} color="primary" autoFocus startIcon={<CloseIcon />}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={showConfirmationModal}
                onClose={() => setShowConfirmationModal(false)}
                aria-labelledby="confirmation-dialog-title"
                aria-describedby="confirmation-dialog-description"
            >
                <DialogTitle id="confirmation-dialog-title">{"Confirmation"}</DialogTitle>
                <DialogContent>
                    <Typography>
                        {confirmationMessage}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowConfirmationModal(false)} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={showCreateGameModal} onClose={toggleCreateGameModal} maxWidth="lg" fullWidth>
                <DialogContent>
                    <CreateGameStepper onClose={toggleCreateGameModal} refreshGames={fetchAllGames} />
                </DialogContent>
            </Dialog>
            <Dialog open={deleteConfirmationOpen} onClose={closeDeleteConfirmation} maxWidth="lg">
                <DialogTitle>{"Confirmation Game Deletion"}</DialogTitle>
                <DialogContent>
                    <Typography>Wooohoooo tu est sur de vouloir delete se game? Cette action ne peut être reverser.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteConfirmation} color="primary" startIcon={<CloseIcon />}>
                        Cancel
                    </Button>
                    <Button onClick={deleteGame} color="error" startIcon={<DeleteIcon />}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>

    );
};

export { AdminPage };

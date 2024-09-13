import React, { useState, useEffect, useRef } from 'react';
import {
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
    TextField,
    Container,
    Grid,
    Box,
    Paper,
    MenuItem
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const steps = ['Choose Difficulty', 'Create Target(s)', 'Create Projectile', 'Create Player', 'Recap'];

const CreateGameStepper = ({ onClose, refreshGames }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [gameDifficulty, setGameDifficulty] = useState('');
    const [targetDetails, setTargetDetails] = useState([{ type: 'Rectangle', width: '', length: '', x: 20, y: 20, radius: '', base: '', height: '' }]);
    const [projectileDetails, setProjectileDetails] = useState({ radius: '', x: 960, y: 700 });
    const [playerDetails, setPlayerDetails] = useState({ base: '', height: '', x: 960, y: 700 });
    const targetCanvasRef = useRef(null);
    const projectileCanvasRef = useRef(null);
    const playerCanvasRef = useRef(null);
    const [gameName, setGameName] = useState('');

    const handleAddTarget = () => {
        const newTarget = { type: 'Rectangle', width: '', length: '', x: 20, y: 20, radius: '', base: '', height: '' };
        setTargetDetails([...targetDetails, newTarget]);
    };
    const handleRemoveTarget = (index) => {
        const newDetails = [...targetDetails];
        newDetails.splice(index, 1);
        setTargetDetails(newDetails);
    };

    useEffect(() => {
        drawTarget();
        drawProjectile();
        drawPlayer();
    }, [targetDetails, projectileDetails, playerDetails]);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleFinish = async () => {
        try {
            // Create the game
            const gameResponse = await fetch('/Game', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: gameName,
                    difficultyLevel: gameDifficulty,
                    currentScore: 0,
                    highScore: 0
                })
            });
            if (!gameResponse.ok) throw new Error('Failed to create game.');
            const gameData = await gameResponse.json();
            const gameID = gameData.gameID;

            for (const target of targetDetails) {
                const { type, width, length, x, y, radius, base, height } = target;
                const formData = {
                    ...(type === 'Rectangle' && { width, length }),
                    ...(type === 'Cercle' && { radius }),
                    ...(type === 'Triangle' && { base, height }),
                    x,
                    y,
                    gameID: gameID,
                    role: 2,
                    formType: type
                };

                await fetch('/form', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            }

            // Post the projectile with its details
            await fetch('/form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...projectileDetails,
                    gameID: gameID,
                    role: 1,
                    formType: 'Cercle'
                })
            });


            await fetch('/form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...playerDetails,
                    gameID: gameID,
                    role: 0,
                    formType: 'Triangle'
                })
            });

            await refreshGames();
            onClose();
        } catch (error) {
            console.error('Error during game creation:', error.message);
        }
    };
    useEffect(() => {
        drawShapes();
    }, [targetDetails, projectileDetails, playerDetails]);

    const drawShapes = () => {
        drawTarget(targetCanvasRef.current, targetDetails);
        drawProjectile(projectileCanvasRef.current, projectileDetails);
        drawPlayer(playerCanvasRef.current, playerDetails);
    };
    const drawTarget = () => {
        const canvas = targetCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        targetDetails.forEach((target) => {
            switch (target.type) {
                case 'Rectangle':
                    ctx.beginPath();
                    ctx.rect(target.x, target.y, target.width, target.length);
                    ctx.fillStyle = '#ff0059';
                    ctx.fill();
                    ctx.closePath();
                    break;
                case 'Cercle':
                    ctx.beginPath();
                    ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
                    ctx.fillStyle = '#9900ff';
                    ctx.fill();
                    ctx.closePath();
                    break;
                case 'Triangle':
                    ctx.beginPath();
                    ctx.moveTo(target.x, target.y);
                    ctx.lineTo(target.x - target.base / 2, target.y - target.height);
                    ctx.lineTo(target.x + target.base / 2, target.y - target.height);
                    ctx.closePath();
                    ctx.fillStyle = '#66ff00';
                    ctx.fill();
                    break;
                default:
                    break;
            }
        });
    };

    const drawProjectile = () => {
        const canvas = projectileCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(100, 100, projectileDetails.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#00ffe1';
        ctx.fill();
        ctx.closePath();
    };

    const drawPlayer = () => {
        const canvas = playerCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(75, 125);
        ctx.lineTo(75 + playerDetails.base / 2, 125 - playerDetails.height);
        ctx.lineTo(75 + playerDetails.base, 125);
        ctx.fillStyle = '#FFCC00';
        ctx.fill();
        ctx.closePath();
    };
    useEffect(() => {
        if (activeStep === 4) {
            drawTarget(targetCanvasRef.current, targetDetails);
            drawProjectile(projectileCanvasRef.current, projectileDetails);
            drawPlayer(playerCanvasRef.current, playerDetails);
        }
    }, [activeStep, targetDetails, projectileDetails, playerDetails]);
    const getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return (
                    <>
                    <TextField
                        select
                        label="Difficulty Level"
                        value={gameDifficulty}
                        onChange={(e) => setGameDifficulty(e.target.value)}
                        fullWidth
                        style={{ width: '150px' , textAlign:'center' }}
                    >
                        <MenuItem value="1" >Level 1</MenuItem>
                        <MenuItem value="2">Level 2</MenuItem>
                        <MenuItem value="3">Level 3</MenuItem>
                        <MenuItem value="4">Level 4</MenuItem>
                    </TextField>
                        <TextField
                            label="New Game Name"
                            type="string"
                            value={gameName}
                            onChange={(e) => setGameName(e.target.value)}
                            fullWidth
                            style={{ width: '200px' , textAlign:'center' , marginLeft:'10px' }}
                        />
                    </>
                );
            case 1:
                return (
                    <>
                        <Typography variant="h6">Create Targets</Typography>
                        {targetDetails.map((target, index) => (
                            <div key={index}>
                                <TextField
                                    select
                                    label="Type"
                                    value={target.type}
                                    onChange={(e) => {
                                        const newTargets = [...targetDetails];
                                        newTargets[index].type = e.target.value;
                                        setTargetDetails(newTargets);
                                    }}
                                    margin="normal"
                                    fullWidth
                                >
                                    <MenuItem value="Rectangle">Rectangle</MenuItem>
                                    <MenuItem value="Cercle">Circle</MenuItem>
                                    <MenuItem value="Triangle">Triangle</MenuItem>
                                </TextField>

                                {target.type === 'Rectangle' && (
                                    <>
                                        <TextField
                                            label="Width"
                                            type="number"
                                            value={target.width}
                                            onChange={(e) => {
                                                const newTargets = [...targetDetails];
                                                newTargets[index].width = Number(e.target.value);
                                                setTargetDetails(newTargets);
                                            }}
                                            margin="normal"
                                        />
                                        <TextField
                                            label="Length"
                                            type="number"
                                            value={target.length}
                                            onChange={(e) => {
                                                const newTargets = [...targetDetails];
                                                newTargets[index].length = Number(e.target.value);
                                                setTargetDetails(newTargets);
                                            }}
                                            margin="normal"
                                        />
                                        <TextField
                                            label="x"
                                            type="number"
                                            value={target.x}
                                            onChange={(e) => {
                                                const newTargets = [...targetDetails];
                                                newTargets[index].x = Number(e.target.value);
                                                setTargetDetails(newTargets);
                                            }}
                                            margin="normal"
                                        />
                                        <TextField
                                            label="y"
                                            type="number"
                                            value={target.y}
                                            onChange={(e) => {
                                                const newTargets = [...targetDetails];
                                                newTargets[index].y = Number(e.target.value);
                                                setTargetDetails(newTargets);
                                            }}
                                            margin="normal"
                                        />
                                    </>
                                )}
                                {target.type === 'Triangle' && (
                                    <>
                                        <TextField
                                            label="base"
                                            type="number"
                                            value={target.base}
                                            onChange={(e) => {
                                                const newTargets = [...targetDetails];
                                                newTargets[index].base = Number(e.target.value);
                                                setTargetDetails(newTargets);
                                            }}
                                            margin="normal"
                                        />
                                        <TextField
                                            label="height"
                                            type="number"
                                            value={target.height}
                                            onChange={(e) => {
                                                const newTargets = [...targetDetails];
                                                newTargets[index].height = Number(e.target.value);
                                                setTargetDetails(newTargets);
                                            }}
                                            margin="normal"
                                        />
                                        <TextField
                                            label="x"
                                            type="number"
                                            value={target.x}
                                            onChange={(e) => {
                                                const newTargets = [...targetDetails];
                                                newTargets[index].x = Number(e.target.value);
                                                setTargetDetails(newTargets);
                                            }}
                                            margin="normal"
                                        />
                                        <TextField
                                            label="y"
                                            type="number"
                                            value={target.y}
                                            onChange={(e) => {
                                                const newTargets = [...targetDetails];
                                                newTargets[index].y = Number(e.target.value);
                                                setTargetDetails(newTargets);
                                            }}
                                            margin="normal"
                                        />
                                    </>
                                )}
                                {target.type === 'Cercle' && (
                                    <>
                                        <TextField
                                            label="radius"
                                            type="number"
                                            value={target.radius}
                                            onChange={(e) => {
                                                const newTargets = [...targetDetails];
                                                newTargets[index].radius = Number(e.target.value);
                                                setTargetDetails(newTargets);
                                            }}
                                            margin="normal"
                                        />
                                        <TextField
                                            label="x"
                                            type="number"
                                            value={target.x}
                                            onChange={(e) => {
                                                const newTargets = [...targetDetails];
                                                newTargets[index].x = Number(e.target.value);
                                                setTargetDetails(newTargets);
                                            }}
                                            margin="normal"
                                        />
                                        <TextField
                                            label="y"
                                            type="number"
                                            value={target.y}
                                            onChange={(e) => {
                                                const newTargets = [...targetDetails];
                                                newTargets[index].y = Number(e.target.value);
                                                setTargetDetails(newTargets);
                                            }}
                                            margin="normal"
                                        />
                                    </>
                                )}
                                <Button variant="outlined" size="small" color="error" onClick={() => handleRemoveTarget(index)} style={{ marginTop: '27px' , marginLeft: '5px' }}>
                                    Remove Target
                                </Button>
                            </div>
                        ))}
                        <Box style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <canvas ref={targetCanvasRef} width="200" height="200" style={{ border: '1px solid black', margin: '10px' }}></canvas>
                        </Box>
                        <Button variant="contained" onClick={handleAddTarget} style={{ marginTop: '20px' }}>
                            Add Target
                        </Button>
                    </>
                );
            case 2:
                return (
                    <>
                        <Typography variant="h6">Create Projectile (Circle)</Typography>
                        <TextField
                            label="Radius"
                            type="number"
                            value={projectileDetails.radius}
                            onChange={(e) => setProjectileDetails({ ...projectileDetails, radius: Number(e.target.value) })}
                            InputProps={{ inputProps: { min: 0 } }}
                        />
                        <TextField
                            label="x"
                            type="number"
                            value={projectileDetails.x}
                            onChange={(e) => setProjectileDetails({ ...projectileDetails, x: Number(e.target.value) })}
                            InputProps={{ inputProps: { min: 0 } }}
                        />
                        <TextField
                            label="y"
                            type="number"
                            value={projectileDetails.y}
                            onChange={(e) => setProjectileDetails({ ...projectileDetails, y: Number(e.target.value) })}
                            InputProps={{ inputProps: { min: 0 } }}
                        />
                        <Paper elevation={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 10, marginTop: 10 }}>
                            <Typography>Projectile Preview:</Typography>
                            <canvas ref={projectileCanvasRef} width="200" height="200" style={{ border: '1px solid black' }}></canvas>
                        </Paper>
                    </>
                );
            case 3:
                return (
                    <>
                        <Typography variant="h6">Create Player (Triangle)</Typography>
                        <TextField
                            label="Base"
                            type="number"
                            value={playerDetails.base}
                            onChange={(e) => setPlayerDetails({ ...playerDetails, base: Number(e.target.value) })}
                            InputProps={{ inputProps: { min: 0 } }}
                        />
                        <TextField
                            label="Height"
                            type="number"
                            value={playerDetails.height}
                            onChange={(e) => setPlayerDetails({ ...playerDetails, height: Number(e.target.value) })}
                            InputProps={{ inputProps: { min: 0 } }}
                        />
                        <TextField
                            label="x"
                            type="number"
                            value={playerDetails.x}
                            onChange={(e) => setPlayerDetails({ ...playerDetails, x: Number(e.target.value) })}
                            InputProps={{ inputProps: { min: 0 } }}
                        />
                        <TextField
                            label="y"
                            type="number"
                            value={playerDetails.y}
                            onChange={(e) => setPlayerDetails({ ...playerDetails, y: Number(e.target.value) })}
                            InputProps={{ inputProps: { min: 0 } }}
                        />
                        <Paper elevation={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 10, marginTop: 10 }}>
                            <Typography>Player Preview:</Typography>
                            <canvas ref={playerCanvasRef} width="200" height="200" style={{ border: '1px solid black' ,  }}></canvas>
                        </Paper>
                    </>
                );
            case 4:
                return (

                    <Box>
                        <Typography variant="h6" gutterBottom>Recap of Game Creation</Typography>
                        <Typography>Difficulty Level: {gameDifficulty}</Typography>
                        <Paper elevation={3} style={{ display: 'flex', flexDirection: 'row'}}>
                        <Paper elevation={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 10 }}>
                            <Typography>Target — Width: {targetDetails.width}, Length: {targetDetails.length}, X: {targetDetails.x}, Y: {targetDetails.y}</Typography>
                            <Box style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                <canvas ref={targetCanvasRef} width="200" height="200" style={{ border: '1px solid black', margin: '10px' }}></canvas>
                            </Box>
                        </Paper>

                        <Paper elevation={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 10}}>
                            <Typography>Projectile — Radius: {projectileDetails.radius}, X: {projectileDetails.x}, Y: {projectileDetails.y}</Typography>
                            <Box style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                <canvas ref={projectileCanvasRef} width="200" height="200" style={{ border: '1px solid black', margin: '10px' }}></canvas>
                            </Box>
                        </Paper>

                        <Paper elevation={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 10}}>
                            <Typography>Player — Base: {playerDetails.base}, Height: {playerDetails.height}, X: {playerDetails.x}, Y: {playerDetails.y}</Typography>
                            <Box style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                <canvas ref={playerCanvasRef} width="200" height="200" style={{ border: '1px solid black', margin: '10px' }}></canvas>
                            </Box>
                        </Paper>
                        </Paper>
                    </Box>
                );
            default:
                return 'Unknown step';
        }
    };
    return (
        <Container>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
                {activeStep === steps.length ? (
                    <Typography>All steps completed - You're finished</Typography>
                ) : (
                    <>
                        <Typography>{getStepContent(activeStep)}</Typography>
                        <Box mt={2}>
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item>
                                    <Button disabled={activeStep === 0} onClick={handleBack}>
                                        Back
                                    </Button>
                                </Grid>
                                <Grid item>
                                    {activeStep === steps.length - 1 ? (
                                        <Button variant="contained" color="primary" onClick={handleFinish}>
                                            Finish
                                        </Button>
                                    ) : (
                                        <Button variant="contained" color="primary" onClick={handleNext}>
                                            Next
                                        </Button>
                                    )}
                                </Grid>
                            </Grid>
                        </Box>
                    </>
                )}
                <Box mt={2}>
                    <Button onClick={onClose} startIcon={<CloseIcon />}>Close</Button>
                </Box>
            </Box>
        </Container>
    );
};

export default CreateGameStepper;
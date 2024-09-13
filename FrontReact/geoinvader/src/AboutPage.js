import React, {useState} from 'react';
import {
    Container,
    Typography,
    Grid,
    styled,
    Box,
    Button,
    Card,
    CardContent
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import gamePlayGif from './assets/gameplayMouv.gif';
import gamePlayGifBonus from './assets/gameplayBonus.gif';
import createGame from './assets/createGame.png';
import createTarget from './assets/createTarget.png';
import createProjectile from './assets/createProjectile.png';
import createPlayer from './assets/createPlayer.png';

const NeonTypography = styled(Typography)({
    textShadow: '0 0 8px #fff, 0 0 20px #fff, 0 0 30px #08f, 0 0 40px #08f, 0 0 50px #08f, 0 0 60px #08f, 0 0 70px #08f',
    color: '#a2ff00',
});

const NeonButton = styled(Button)({
    color: '#a2ff00',
    '&:hover': {
        backgroundColor: 'rgba(162, 255, 0, 0.2)',
        boxShadow: '0 0 8px #fff, 0 0 20px #fff, 0 0 30px #08f',
    },
    margin: '20px 0',
    marginLeft: '5px'
});

const ControlIcon = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
        fontSize: '2rem',
        color: '#a2ff00',
    }
});
const NeonCard = styled(Card)({
    backgroundColor: '#02203c',
    color: '#a2ff00',
    boxShadow: '0 0 20px #08f, 0 0 40px #08f',
    marginBottom: '20px',
});

const EnglishContent = ({ navigate }) => (
    <>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <NeonButton onClick={() => navigate('/')} startIcon={<HomeIcon />}>
                    Back to Home
                </NeonButton>
            </Grid>
            <Grid item xs={12}>
                <NeonTypography variant="h2" gutterBottom>How to Play & Create a Level</NeonTypography>
            </Grid>
            <Grid item xs={12}>
                <NeonTypography variant="body1">
                    Welcome to GeoInvader, the goal is to collect points in the game by destroying shapes moving towards you.
                </NeonTypography>
            </Grid>
            <Grid item xs={12}>
                <NeonTypography variant="h4" gutterBottom>How to Play?</NeonTypography>
                <NeonTypography variant="body1">
                    When you press the "Play" button, you'll see an interface allowing you to choose the level you wish to play. Click on a level to start it.
                </NeonTypography>
            </Grid>
            <Grid container item spacing={2} xs={12}>
                <Grid item xs={12} md={6}>
                    <NeonCard>
                        <CardContent>
                            <img src={gamePlayGif} alt="Gameplay" style={{ maxWidth: '100%', height: 'auto' }} />
                            <NeonTypography variant="body2" style={{ textAlign: 'center' }}>
                                <ControlIcon>
                                    <ArrowBackIcon /><ArrowForwardIcon />
                                </ControlIcon>
                                Use the arrow keys to move
                            </NeonTypography>
                        </CardContent>
                    </NeonCard>
                </Grid>
                <Grid item xs={12} md={6}>
                    <NeonCard>
                        <CardContent>
                            <img src={gamePlayGifBonus} alt="Gameplay Bonus" style={{ maxWidth: '100%', height: 'auto' }} />
                            <NeonTypography variant="body1">
                                Bonuses appear randomly in the game; the yellow one boosts your player's speed, the blue one multiplies your player's ball into three that shoot in a cone shape.
                            </NeonTypography>
                        </CardContent>
                    </NeonCard>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <NeonTypography variant="h4" gutterBottom>How to Create a Game?</NeonTypography>
            </Grid>
            <Grid container item spacing={2} xs={12}>
                <Grid item xs={12} md={6}>
                    <NeonCard>
                        <CardContent>
                            <Grid item xs={12}>
                                <NeonTypography variant="h4" style={{ textAlign: 'center' }} gutterBottom>1 - Choose your Name and Difficulty</NeonTypography>
                            </Grid>
                            <img src={createGame} alt="Create Game" style={{ maxWidth: '100%', height: 'auto' }} />
                            <NeonTypography variant="body1" style={{ textAlign: 'center' }}>
                                When you click on "Create a game", you'll see an interface ,
                            </NeonTypography>
                            <NeonTypography variant="body1" style={{ textAlign: 'center' }}>
                                it will allows you to choose the difficulty you desire and the name of the game you want to create.
                            </NeonTypography>
                        </CardContent>
                    </NeonCard>
                </Grid>
                <Grid item xs={12} md={6}>
                    <NeonCard>
                        <CardContent>
                            <Grid item xs={12}>
                                <NeonTypography variant="h4" style={{ textAlign: 'center' }} gutterBottom>2 - Create a target blueprint</NeonTypography>
                            </Grid>
                            <img src={createTarget} alt="Create Target" style={{ maxWidth: '100%', height: 'auto' }} />
                            <NeonTypography variant="body1" style={{ textAlign: 'center' }}>
                                Next, you'll need to create a target. A target represents shapes that move towards you.
                            </NeonTypography>
                            <NeonTypography variant="body1" style={{ textAlign: 'center' }}>
                                 The preview of the target is the blueprint that will be used to populate the page with copies.
                            </NeonTypography>
                        </CardContent>
                    </NeonCard>
                </Grid>
                <Grid item xs={12} md={6}>
                    <NeonCard>
                        <CardContent>
                            <Grid item xs={12}>
                                <NeonTypography variant="h4" style={{ textAlign: 'center' }} gutterBottom>3 - Creating the projectile blueprint</NeonTypography>
                            </Grid>
                            <img src={createProjectile} alt="Create Projectile" style={{ maxWidth: '100%', height: 'auto' }} />
                            <NeonTypography variant="body1" style={{ textAlign: 'center' }}>
                                Creating a projectile is crucial and this will be the next step , the position does not matter.
                            </NeonTypography>
                            <NeonTypography variant="body1" style={{ textAlign: 'center' }}>
                              (do not make it too small as it could significantly increase the difficulty. A minimum size of 5 is recommended).
                            </NeonTypography>
                        </CardContent>
                    </NeonCard>
                </Grid>
                <Grid item xs={12} md={6}>
                    <NeonCard>
                        <CardContent>
                            <Grid item xs={12}>
                                <NeonTypography variant="h4" style={{ textAlign: 'center' }} gutterBottom>4 - Create the player blueprint</NeonTypography>
                            </Grid>
                            <img src={createPlayer} alt="Create Player" style={{ maxWidth: '100%', height: 'auto' }} />
                            <NeonTypography variant="body1" style={{ textAlign: 'center' }}>
                                Finally, you need to create the player
                            </NeonTypography>
                            <NeonTypography variant="body1" style={{ textAlign: 'center' }}>
                               which will be the shape of the triangle from which the projectiles are fired.
                            </NeonTypography>
                        </CardContent>
                    </NeonCard>
                </Grid>
            </Grid>
        </Grid>
    </>
);

const FrenchContent = ({ navigate }) => (
    <>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <NeonButton onClick={() => navigate('/')} startIcon={<HomeIcon />}>
                    Retour à l'accueil
                </NeonButton>
            </Grid>
            <Grid item xs={12}>
                <NeonTypography variant="h2" gutterBottom>Comment Jouer & créer un niveau</NeonTypography>
            </Grid>
            <Grid item xs={12}>
                <NeonTypography variant="body1">
                    Bienvenue dans GéoInvader, le but est de collecter des points dans le jeu en détruisant des formes qui bougent vers vous.
                </NeonTypography>
            </Grid>
            <Grid item xs={12}>
                <NeonTypography variant="h4" gutterBottom>Comment jouer ?</NeonTypography>
                <NeonTypography variant="body1">
                    Lorsque vous appuyez sur le bouton "Jouer", vous verrez une interface qui vous permettra de choisir le niveau que vous souhaitez.
                    Cliquer sur un niveau pour le commencer.
                </NeonTypography>
            </Grid>
            <Grid container item spacing={2} xs={12}>
                <Grid item xs={12} md={6}>
                    <NeonCard>
                        <CardContent>
                            <img src={gamePlayGif} alt="Gameplay" style={{ maxWidth: '100%', height: 'auto' }} />
                            <NeonTypography variant="body2" style={{ textAlign: 'center' }}>
                                <ControlIcon>
                                    <ArrowBackIcon /><ArrowForwardIcon />
                                </ControlIcon>
                                Utilisez les touches fléchées pour vous déplacer
                            </NeonTypography>
                        </CardContent>
                    </NeonCard>
                </Grid>
                <Grid item xs={12} md={6}>
                    <NeonCard>
                        <CardContent>
                            <img src={gamePlayGifBonus} alt="Gameplay Bonus" style={{ maxWidth: '100%', height: 'auto' }} />
                            <NeonTypography variant="body1">
                                Des bonus apparaissent aléatoirement dans le jeu, le jaune booste la vitesse de votre joueur, le bleu multiplie la balle de votre joueur en trois qui tirent en forme de cône.
                            </NeonTypography>
                        </CardContent>
                    </NeonCard>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <NeonTypography variant="h4" gutterBottom>Comment créer un jeu ?</NeonTypography>
            </Grid>
            <Grid container item spacing={2} xs={12}>
                <Grid item xs={12} md={6}>
                    <NeonCard>
                        <CardContent>
                            <Grid item xs={12}>
                                <NeonTypography variant="h4" style={{ textAlign: 'center' }} gutterBottom>1 - Choisir un Nom et une difficulté</NeonTypography>
                            </Grid>
                            <img src={createGame} alt="Create Game" style={{ maxWidth: '100%', height: 'auto' }} />
                            <NeonTypography variant="body1" style={{ textAlign: 'center' }}>
                                Lorsque vous cliquez sur "Créer un jeu"  vous verrez une interface
                            </NeonTypography>
                            <NeonTypography variant="body1" style={{ textAlign: 'center' }}>
                                qui vous permettra de choisir la difficulté que vous souhaitez et le nom.
                            </NeonTypography>
                        </CardContent>
                    </NeonCard>
                </Grid>
                <Grid item xs={12} md={6}>
                    <NeonCard>
                        <CardContent>
                            <Grid item xs={12}>
                                <NeonTypography variant="h4" style={{ textAlign: 'center' }} gutterBottom>2 - Créer le patron d'une cible</NeonTypography>
                            </Grid>
                            <img src={createTarget} alt="Create Target" style={{ maxWidth: '100%', height: 'auto' }} />
                            <NeonTypography variant="body1" style={{ textAlign: 'center' }}>
                                Il faudra ensuite créer une cible.Une cible représente des formes qui bougent vers vous.
                            </NeonTypography>
                            <NeonTypography variant="body1" style={{ textAlign: 'center' }}>
                                 La prévision de la cible est le modèle qui sera utilisé pour peupler la page avec des copies.
                            </NeonTypography>
                        </CardContent>
                    </NeonCard>
                </Grid>
                <Grid item xs={12} md={6}>
                    <NeonCard>
                        <CardContent>
                            <Grid item xs={12}>
                                <NeonTypography variant="h4" style={{ textAlign: 'center' }} gutterBottom>3 - Créer le patron d'un projectile</NeonTypography>
                            </Grid>
                            <img src={createProjectile} alt="Create Projectile" style={{ maxWidth: '100%', height: 'auto' }} />
                            <NeonTypography variant="body1" style={{ textAlign: 'center' }}>
                                La création d'un projectile est cruciale
                            </NeonTypography>
                            <NeonTypography variant="body1" style={{ textAlign: 'center' }}>
                                (ne le faites pas trop petit, cela pourrait grandement augmenter la difficulté. Taille minimum conseillée : 5).
                            </NeonTypography>
                        </CardContent>
                    </NeonCard>
                </Grid>
                <Grid item xs={12} md={6}>
                    <NeonCard>
                        <CardContent>
                            <Grid item xs={12}>
                                <NeonTypography variant="h4" style={{ textAlign: 'center' }} gutterBottom>4 - Créer le patron du joueur</NeonTypography>
                            </Grid>
                            <img src={createPlayer} alt="Create Player" style={{ maxWidth: '100%', height: 'auto' }} />
                            <NeonTypography variant="body1" style={{ textAlign: 'center' }}>
                                La dernière étape est de créer le joueur ,
                            </NeonTypography>
                            <NeonTypography variant="body1" style={{ textAlign: 'center' }}>
                                 il sera la forme du triangle d'où les projectiles seront tirés.
                            </NeonTypography>
                        </CardContent>
                    </NeonCard>
                </Grid>
            </Grid>
        </Grid>
    </>
);

const AboutPage = () => {
    const navigate = useNavigate();
    const [language, setLanguage] = useState('fr');

    const toggleLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'fr' : 'en'));
    };

    return (
        <Container maxWidth="md" style={{ backgroundColor: '#000', color: '#a2ff00', minWidth: '100%' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} style={{ textAlign: 'right' }}>
                    <Button onClick={toggleLanguage} style={{ color: '#a2ff00', marginBottom: '20px' }}>
                        {language === 'en' ? 'Français' : 'English'}
                    </Button>
                </Grid>
                {language === 'en' ?
                    <EnglishContent navigate={navigate} gamePlayGif={gamePlayGif} gamePlayGifBonus={gamePlayGifBonus} createGame={createGame} createTarget={createTarget} createProjectile={createProjectile} createPlayer={createPlayer}/> :
                    <FrenchContent navigate={navigate} gamePlayGif={gamePlayGif} gamePlayGifBonus={gamePlayGifBonus} createGame={createGame} createTarget={createTarget} createProjectile={createProjectile} createPlayer={createPlayer}/>
                }
            </Grid>
        </Container>
    );
};

export default AboutPage;

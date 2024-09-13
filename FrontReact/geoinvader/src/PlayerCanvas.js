// import React, { useEffect, useRef, useState } from 'react';
// import {Button, styled} from "@mui/material";
// import { useNavigate } from 'react-router-dom';
// import RefreshIcon from '@mui/icons-material/Refresh';
// import CloseIcon from "@mui/icons-material/Close";
//
// // Défini un composant pour afficher le jeu sur un canevas
// const GameCanvas = ({ gameId }) => {
//     const canvasRef = useRef(null); // Référence au canvas pour le dessin
//     const [bullets, setBullets] = useState([]); // État pour les balles tirées par le joueur
//     const playerPosition = useRef({x: 0, y: 0}); // Position actuelle du joueur
//     const [targets, setTargets] = useState([]); // État pour les cibles à atteindre
//     const [triangle, setTriangle] = useState(null); // État pour le triangle (joueur)
//     const [bulletData, setBulletData] = useState({radius: 10}); // Détails de la balle (rayon)
//     const requestRef = useRef(); // Référence pour l'animation frame
//     const keysPressed = useRef({}); // État des touches pressées
//     const lastFireTimeRef = useRef(0); // Dernier temps de tir pour le contrôle du débit de tir
//     const fireRate = 400; // Taux de tir (millisecondes entre les tirs)
//     const [score, setScore] = useState(0); // Score du joueur
//     const [highScore, setHighScore] = useState(0); // Meilleur score atteint
//     const [currentWave, setCurrentWave] = useState(1); // Vague actuelle d'ennemis
//     const [targetBlueprint, setTargetBlueprint] = useState(null); // Blueprint pour générer les cibles
//     const [isGameOver, setIsGameOver] = useState(false); // État pour contrôler si le jeu est terminé
//     const [regenerateTargets, setRegenerateTargets] = useState(false); // Contrôle la régénération des cibles
//     const navigate = useNavigate(); // Pour naviguer entre les routes
//     const [difficultyLevel, setDifficultyLevel] = useState(1); // Niveau de difficulté du jeu
//     const [name, setName] = useState(1); // Nom du joueur
//     const [bonuses, setBonuses] = useState([]); // État pour les bonus collectés
//     const BonusType = {
//         BULLET: 'BULLET', // Type de bonus : balle supplémentaire
//         SPEED: 'SPEED', // Type de bonus : vitesse supplémentaire
//     };
//     const [extraBullets, setExtraBullets] = useState(false); // Contrôle l'activation du bonus de balle supplémentaire
//     const [speedBonusActive, setSpeedBonusActive] = useState(false); // Contrôle l'activation du bonus de vitesse
//     const offScreenCanvasRef = useRef(null);
//
//     useEffect(() => {
//         offScreenCanvasRef.current = document.createElement('canvas');
//     }, []);
//     useEffect(() => {
//         const canvas = canvasRef.current;
//         const offScreenCanvas = document.createElement('canvas');
//         offScreenCanvas.width = canvas.width;
//         offScreenCanvas.height = canvas.height;
//         offScreenCanvasRef.current = offScreenCanvas;
//     }, []);
//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (canvas) {
//             const offScreenCanvas = offScreenCanvasRef.current;
//             offScreenCanvas.width = canvas.width;
//             offScreenCanvas.height = canvas.height;
//         }
//     }, []);
//
//     // Style personnalisé pour le bouton avec effet néon
//     const NeonButton = styled(Button)({
//         color: '#a2ff00',
//         '&:hover': {
//             backgroundColor: 'rgba(162, 255, 0, 0.2)',
//             boxShadow: '0 0 8px #fff, 0 0 20px #fff, 0 0 30px #08f',
//         },
//         margin: '100px 25px',
//     });
//
//     // Fonction pour tirer des balles
//     const fireBullets = () => {
//         const newBullet = {
//             x: playerPosition.current.x,
//             y: playerPosition.current.y,
//             direction: 'straight', // Direction de la balle
//             radius: bulletData.radius, // Rayon de la balle
//         };
//         const bulletsToAdd = [newBullet];
//
//         // Ajoute des balles diagonales si le bonus est actif
//         if (extraBullets) {
//             const diagonalLeft = {
//                 ...newBullet,
//                 direction: 'diagonalLeft',
//             };
//             const diagonalRight = {
//                 ...newBullet,
//                 direction: 'diagonalRight',
//             };
//             bulletsToAdd.push(diagonalLeft, diagonalRight);
//         }
//         setBullets(bullets => [...bullets, ...bulletsToAdd]);
//     };
//
//     // Met à jour la position des balles à chaque frame
//     const updateBullets = () => {
//         setBullets(bullets =>
//             bullets.map(bullet => {
//                 let dx = 0;
//                 let dy = -10; // Déplacement vertical par défaut
//
//                 // Ajuste la direction pour les balles diagonales
//                 if (bullet.direction === 'diagonalLeft') {
//                     dx = -5; // Déplacement vers la gauche
//                 } else if (bullet.direction === 'diagonalRight') {
//                     dx = 5; // Déplacement vers la droite
//                 }
//                 return {
//                     ...bullet,
//                     x: bullet.x + dx,
//                     y: bullet.y + dy,
//                 };
//             })
//                 .filter(bullet => bullet.y > 0 && bullet.x > 0 && bullet.x < canvasRef.current.width) // Filtre les balles hors de l'écran
//         );
//     };
//
//     // Génère un bonus spécifique sur le canevas
//     const generateSpecificBonus = (bonusType) => {
//         const minX = 100;
//         const minY = 0;
//         const maxX = canvasRef.current.width - 100;
//         const maxY = 50;
//         const x = Math.random() * (maxX - minX) + minX; // Position aléatoire en X
//         const y = Math.random() * (maxY - minY) + minY; // Position aléatoire en Y
//         const newBonus = {
//             x,
//             y,
//             type: bonusType, // Type de bonus
//             radius: 25 // Rayon pour l'affichage
//         };
//         setBonuses(bonuses => [...bonuses, newBonus]); // Ajoute le bonus à l'état
//     };
//
//     // Crée des intervalles pour générer des bonus de manière aléatoire
//     // Utilisation d'un effet pour gérer la création périodique de bonus spécifiques avec des intervalles aléatoires.
//     useEffect(() => {
//         // Création d'un intervalle pour générer des bonus de type "bullet" à des intervalles aléatoires compris entre 10 et 30 secondes.
//         const bulletBonusInterval = setInterval(() => generateSpecificBonus(BonusType.BULLET), (Math.random() * (30000 - 10000) + 20000));
//         // Création d'un intervalle similaire pour les bonus de type "speed".
//         const speedBonusInterval = setInterval(() => generateSpecificBonus(BonusType.SPEED), (Math.random() * (30000 - 10000) + 20000));
//         // Nettoyage: annulation des intervalles lors du démontage du composant pour éviter les fuites de mémoire.
//         return () => {
//             clearInterval(bulletBonusInterval);
//             clearInterval(speedBonusInterval);
//         };
//     }, []);
//
// // Fonction pour générer des cibles basées sur un schéma et le numéro de la vague actuelle.
//     const generateTargets = (targetBlueprints, waveNumber) => {
//         const newTargets = [];
//         // Vérifie si les schémas de cible sont valides.
//         if (!targetBlueprints || targetBlueprints.length === 0) return [];
//
//         // Création de nouvelles cibles basées sur les schémas fournis et l'ajustement en fonction du numéro de la vague.
//         targetBlueprints.forEach((blueprint) => {
//             let xPosition = blueprint.x;
//             let yPosition = blueprint.y;
//             // Le nombre de cibles augmente avec le numéro de la vague.
//             const targetCount = 5 + waveNumber * 2;
//
//             for (let i = 0; i < targetCount; i++) {
//                 // Réinitialisation de la position x si la cible dépasse la largeur du canvas.
//                 if (xPosition + blueprint.width > canvasRef.current.width) {
//                     xPosition = blueprint.x + 125;
//                     yPosition += 150; // Déplacement vers le bas pour la prochaine rangée de cibles.
//                 }
//                 // Ajout de la nouvelle cible avec la position et la visibilité définies.
//                 newTargets.push({
//                     ...blueprint,
//                     x: xPosition,
//                     y: yPosition,
//                     isVisible: true,
//                     direction: 'right',
//                 });
//                 xPosition += 225; // Espacement entre les cibles.
//             }
//         });
//
//         return newTargets;
//     };
//
// // Utilisation d'un effet pour gérer les événements du clavier pour le contrôle du jeu.
//     useEffect(() => {
//         // Fonction pour enregistrer une touche pressée.
//         const handleKeyDown = (e) => keysPressed.current[e.key] = true;
//         // Fonction pour enregistrer le relâchement d'une touche.
//         const handleKeyUp = (e) => keysPressed.current[e.key] = false;
//
//         // Ajout des écouteurs d'événements pour le clavier.
//         window.addEventListener('keydown', handleKeyDown);
//         window.addEventListener('keyup', handleKeyUp);
//
//         // Nettoyage: suppression des écouteurs d'événements pour éviter les fuites de mémoire.
//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//             window.removeEventListener('keyup', handleKeyUp);
//         };
//     }, []);
//
// // Utilisation d'un effet pour régénérer les cibles lorsque les dépendances changent.
//     useEffect(() => {
//         // Mise à jour des cibles basée sur le schéma de cible actuel et le numéro de la vague.
//         if (targetBlueprint) {
//             setTargets(generateTargets(targetBlueprint, currentWave));
//         }
//     }, [targetBlueprint, currentWave, regenerateTargets]);
//
// // Fonction asynchrone pour récupérer les données du jeu depuis le serveur.
//     const fetchData = async () => {
//         try {
//             const gameResponse = await fetch(`/Game/${gameId}`);
//             const gameData = await gameResponse.json();
//             // Traitement des données reçues et mise à jour de l'état du jeu.
//             const forms = gameData.forms;
//
//             // Sélection des formes spécifiques pour le joueur, les balles et les cibles.
//             const triangle = forms.find(form => form.role === 0);
//             const bullet = forms.find(form => form.role === 1);
//             const targets = forms.filter(form => form.role === 2);
//
//             // Mise à jour de l'état du jeu avec les données récupérées.
//             setName(gameData.name)
//             setTriangle(triangle);
//             setBulletData(bullet);
//             setTargetBlueprint(targets);
//             setDifficultyLevel(gameData.difficultyLevel);
//             setHighScore(gameData.highScore);
//
//             // Initialisation de la position du joueur si disponible.
//             if (triangle) {
//                 playerPosition.current = { x: triangle.x, y: triangle.y };
//             }
//         } catch (error) {
//             console.error('Failed to fetch data:', error);
//         }
//     };
//
// // Utilisation d'un effet pour charger les données du jeu au montage du composant.
//     useEffect(() => {
//         fetchData();
//     }, []);
//
// // Fonction pour réinitialiser le jeu et charger de nouvelles données du jeu.
//     const resetGame = () => {
//         fetchData(); // Rechargement des données du jeu.
//         // Réinitialisation de l'état du jeu et de la position du joueur.
//         playerPosition.current = { x: triangle?.x ?? 0, y: triangle?.y ?? 0 };
//         setBullets([]);
//         setRegenerateTargets(prev => !prev);
//         setScore(0);
//         setIsGameOver(false);
//         setCurrentWave(1);
//     };
//
//     // useEffect déclenché par des changements dans targetBlueprint ou currentWave.
//     useEffect(() => {
//         // Si targetBlueprint est défini, on génère des cibles pour la vague actuelle.
//         if (targetBlueprint) {
//             setTargets(generateTargets(targetBlueprint, currentWave));
//         }
//     }, [targetBlueprint, currentWave]);
//
// // useEffect qui vérifie si toutes les cibles ont été touchées pour passer à la vague suivante.
//     useEffect(() => {
//         // Vérification que toutes les cibles sont invisibles, indiquant qu'elles ont été touchées.
//         const allTargetsHit = targets.every(target => !target.isVisible);
//
//         // Si toutes les cibles de la vague actuelle ont été touchées, on passe à la vague suivante.
//         if (allTargetsHit && targets.length > 0 && targetBlueprint) {
//             setCurrentWave(currentWave => {
//                 const newWave = currentWave + 1; // Incrémentation du numéro de vague.
//                 const newTargets = generateTargets(targetBlueprint, newWave); // Génération de nouvelles cibles pour la nouvelle vague.
//                 setTargets(newTargets);
//
//                 return newWave;
//             });
//         }
//     }, [targets]);
//
// // Ce useEffect s'occupe de la configuration initiale du canvas et de la détection des collisions.
//     useEffect(() => {
//         const canvas = canvasRef.current;
//         // Réglage de la taille du canvas pour couvrir toute la fenêtre.
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;
//
//         // Fonction de détection de collision entre une balle et une cible.
//         const detectCollision = (bullet, target) => {
//             switch (target.formType) {
//                 case 'Cercle':
//                     const distance = Math.sqrt((bullet.x - target.x) ** 2 + (bullet.y - target.y) ** 2);
//                     return distance < bullet.radius + target.radius;
//
//                 case 'Rectangle':
//                     const rectCenterX = target.x + target.width / 2;
//                     const rectCenterY = target.y + target.length / 2;
//                     const distanceX = Math.abs(bullet.x - rectCenterX);
//                     const distanceY = Math.abs(bullet.y - rectCenterY);
//
//                     if (distanceX > (target.width / 2 + bullet.radius) || distanceY > (target.length / 2 + bullet.radius)) {
//                         return false;
//                     }
//
//                     if (distanceX <= (target.width / 2) || distanceY <= (target.length / 2)) {
//                         return true;
//                     }
//
//                     // Additional calculation for corners
//                     const dx = distanceX - target.width / 2;
//                     const dy = distanceY - target.length / 2;
//                     return (dx * dx + dy * dy <= (bullet.radius * bullet.radius));
//
//                 case 'Triangle':
//                     return detectCollisionWithTriangle(bullet, target);
//
//                 default:
//                     return false;
//             }
//         };
//
//         // Fonction spécifique pour détecter la collision avec un triangle.
//         const detectCollisionWithTriangle = (bullet, target) => {
//             // Définition des limites du triangle pour vérifier si la balle se trouve à l'intérieur.
//             const minX = target.x - target.base / 2;
//             const maxX = target.x + target.base / 2;
//             const minY = target.y - target.height;
//             const maxY = target.y;
//             const withinX = bullet.x >= minX && bullet.x <= maxX;
//             const withinY = bullet.y >= minY && bullet.y <= maxY;
//
//             return withinX && withinY; // Retourne vrai si la balle est dans les limites du triangle.
//         };
//
//         // Fonction pour détecter la collision entre le joueur et un bonus.
//         const detectCollisionWithPlayer = (bonus) => {
//             // Calcul de la distance entre le joueur et le bonus pour vérifier la collision.
//             const distance = Math.sqrt((playerPosition.current.x - bonus.x) ** 2 + (playerPosition.current.y - bonus.y) ** 2);
//             return distance < (20 + bonus.radius); // Seuil de collision.
//         };
//
//         // Applique l'effet du bonus au joueur.
//         const applyBonusEffect = (bonus) => {
//             if (bonus.type === BonusType.BULLET) {
//                 // Active les balles supplémentaires et les désactive après 10 secondes.
//                 setExtraBullets(true);
//                 setTimeout(() => setExtraBullets(false), 10000);
//             } else if (bonus.type === BonusType.SPEED) {
//                 // Active le bonus de vitesse et le désactive après 10 secondes.
//                 setSpeedBonusActive(true);
//                 setTimeout(() => setSpeedBonusActive(false), 10000);
//             }
//         };
//
// // Fonction de mise à jour appelée à chaque frame pour redessiner le canvas et mettre à jour le jeu.
//         const update = (time) => {
//             if (!canvasRef.current || !offScreenCanvasRef.current) return;
//             const canvas = canvasRef.current; // This ensures we are using the ref correctly
//             const ctx = canvas.getContext('2d'); // Correctly define ctx for on-screen canvas
//             const offScreenCtx = offScreenCanvasRef.current.getContext('2d');
//             // Si le jeu est terminé, afficher le message "Game Over" et le score.
//             if (isGameOver) {
//                 ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface le canvas.
//                 ctx.fillStyle = '#FF0000'; // Couleur du texte.
//                 ctx.font = '48px Arial'; // Taille et police du texte.
//                 // Affichage du texte "Game Over".
//                 ctx.fillText("Game Over ", canvas.width / 2 - 100, canvas.height / 2);
//                 // Affichage du score.
//                 ctx.fillText(`Your Score ! : ${score}`, canvas.width / 2 - 200, canvas.height / 2 + 100);
//                 // Mise à jour du score le plus élevé si le score actuel le dépasse.
//                 if (score > highScore) {
//                     const payload = {
//                         'name': name,
//                         'difficultyLevel': difficultyLevel,
//                         'currentScore': score,
//                         'highScore': score,
//                     };
//
//                     // Envoi d'une requête pour mettre à jour le score le plus élevé.
//                     fetch(`/Game/${gameId}`, {
//                         method: 'PUT',
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                         body: JSON.stringify(payload),
//                     })
//                         .then(response => response.json())
//                         .then(data => {
//                             console.log('Success:', data);
//                             setHighScore(score); // Mise à jour de l'état du score le plus élevé.
//                         })
//                         .catch((error) => {
//                             console.error('Error:', error);
//                         });
//                 }
//
//                 return; // Stoppe la mise à jour si le jeu est terminé.
//             }
//             cancelAnimationFrame(requestRef.current); // Annule la demande d'animation frame pour éviter le dessin répété.
//             offScreenCtx.clearRect(0, 0, canvas.width, canvas.height); // Nettoyage du canvas pour le redessin.
//
//             // Dessin et déplacement des bonus sur le canvas.
//             bonuses.forEach((bonus, index) => {
//                 const text = 'BONUS';
//                 let textX = bonus.x + 15;
//                 let textY = bonus.y + 15;
//                 // Définition de la couleur selon le type de bonus.
//                 offScreenCtx.fillStyle = bonus.type === BonusType.BULLET ? '#00ffe1' : '#FFCC00';
//                 offScreenCtx.beginPath();
//                 offScreenCtx.arc(bonus.x, bonus.y, 25, 0, Math.PI * 2);
//                 offScreenCtx.fill();
//                 // Centrage du texte sur le bonus.
//                 textX = bonus.x - ctx.measureText(text).width / 2;
//                 textY = bonus.y + 5;
//                 offScreenCtx.font = '10px Arial';
//                 offScreenCtx.fillStyle = '#000000';
//                 offScreenCtx.fillText(text, textX, textY);
//                 bonus.y += 3; // Mouvement du bonus vers le bas.
//
//                 // Applique l'effet du bonus si collision avec le joueur.
//                 if (detectCollisionWithPlayer(bonus)) {
//                     applyBonusEffect(bonus);
//                     bonuses.splice(index, 1); // Supprime le bonus de la liste.
//                 }
//             });
//
//             // Gestion de la vitesse de déplacement du joueur.
//             const playerSpeed = speedBonusActive ? 10 : 5;
//
//             // Déplacement du joueur selon la touche pressée.
//             if (keysPressed.current['ArrowLeft']) {
//                 playerPosition.current.x -= playerSpeed;
//             }
//             if (keysPressed.current['ArrowRight']) {
//                 playerPosition.current.x += playerSpeed;
//             }
//
//             // Dessin du triangle représentant le joueur.
//             if (triangle) {
//                 offScreenCtx.fillStyle = '#FFCC00';
//                 offScreenCtx.beginPath();
//                 // Construction du triangle à partir de la position du joueur.
//                 offScreenCtx.moveTo(playerPosition.current.x, playerPosition.current.y);
//                 offScreenCtx.lineTo(playerPosition.current.x - triangle.base / 2, playerPosition.current.y + triangle.height);
//                 offScreenCtx.lineTo(playerPosition.current.x + triangle.base / 2, playerPosition.current.y + triangle.height);
//                 offScreenCtx.closePath();
//                 offScreenCtx.fill();
//             }
//
//             // Gestion du tir des balles.
//             if (time - lastFireTimeRef.current > fireRate) {
//                 bullets.push({x: playerPosition.current.x, y: playerPosition.current.y, radius: bulletData.radius}); // Ajout d'une nouvelle balle.
//                 fireBullets();
//                 lastFireTimeRef.current = time; // Mise à jour du temps du dernier tir.
//
//             }
//             updateBullets();
//
//             bullets.forEach((bullet, index) => {
//                 offScreenCtx.fillStyle = '#00ffe1'; // Couleur de la balle.
//                 offScreenCtx.beginPath();
//                 offScreenCtx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
//                 offScreenCtx.fill();
//                 bullet.y -= 15; // Mouvement de la balle vers le haut.
//
//                 if (bullet.y <= 0) {
//                     bullets.splice(index, 1);
//                 }
//
//                 let bulletsToRemove = new Set();
//                 let targetsHit = new Set();
//
//                 targets.forEach((target, targetIndex) => {
//                     if (!target.isVisible) return;
//
//                     bullets.forEach((bullet, bulletIndex) => {
//                         if (detectCollision(bullet, target)) {
//                             targetsHit.add(targetIndex);
//                             bulletsToRemove.add(bulletIndex);
//                         }
//                     });
//
//                     // Check for game over condition.
//                     if ((target.y + target.length + target.height + target.radius) > 700) {
//                         setIsGameOver(true);
//                         cancelAnimationFrame(requestRef.current);
//                     }
//                 });
//                 if (targetsHit.size > 0) {
//                     setTargets(targets =>
//                         targets.map((target, index) =>
//                             targetsHit.has(index) ? { ...target, isVisible: false } : target
//                         )
//                     );
//                     setScore(currentScore => currentScore + 5);
//                 }
// // // Pour supprimmer les balles après impact , rend le jeux avec beaucoup de cible beaucoup trop dur
// //                 setBullets(bullets =>
// //                     bullets.filter((_, index) => !bulletsToRemove.has(index))
// //                 );
//             });
//
//
//             setTargets(targets => targets.map(target => {
//                 //traitre chaque target de différente manière selon le type de target
//                 const text = `Aire: ${Math.round(target.area)}`;
//                 // Peri: ${Math.round(target.perimeter)
//                 let textX = target.x + 15;
//                 let textY = target.y + 15;
//                 if (target.isVisible && (target.formType === 'Rectangle')) {
//                     offScreenCtx.fillStyle = '#ff0059';
//                     offScreenCtx.fillRect(target.x, target.y, target.width, target.length);
//                     offScreenCtx.fillStyle = '#ffffff';
//                     textX = target.x + (target.width - ctx.measureText(text).width) / 2;
//                     textY = target.y + target.length / 2 + 5;
//                     offScreenCtx.font = '10px Arial';
//                     offScreenCtx.fillText(text, textX, textY);
//                 }
//                 if (target.isVisible && (target.formType === 'Cercle')) {
//                     offScreenCtx.fillStyle = '#9900ff';
//                     offScreenCtx.beginPath();
//                     offScreenCtx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
//                     offScreenCtx.fill();
//                     offScreenCtx.fillStyle = '#ffffff';
//                     textX = target.x - ctx.measureText(text).width / 2 + target.radius;
//                     textY = target.y + 5;
//                     offScreenCtx.font = '10px Arial';
//                     offScreenCtx.fillText(text, textX, textY);
//                 }
//                 if (target.isVisible && (target.formType === 'Triangle')) {
//                     offScreenCtx.fillStyle = '#66ff00';
//                     offScreenCtx.beginPath();
//                     offScreenCtx.moveTo(target.x, target.y);
//                     offScreenCtx.lineTo(target.x - target.base / 2, target.y - target.height);
//                     offScreenCtx.lineTo(target.x + target.base / 2, target.y - target.height);
//                     offScreenCtx.closePath();
//                     offScreenCtx.fill();
//                     offScreenCtx.fillStyle = '#ffffff';
//                     textX = target.x - ctx.measureText(text).width / 2 + target.base / 2;
//                     textY = target.y - 20;
//                     offScreenCtx.font = '10px Arial';
//                     offScreenCtx.fillText(text, textX, textY);
//                 }
//                 let baseSpeed = 5;
//                 let speedModifier = 1;
//                 let directionChangeProbability = 0;
//                 let verticalMovement = 0;
//                 //Différente difficultés
//                 if (difficultyLevel === 2) {
//                     speedModifier = 1.1;
//                     directionChangeProbability = 0.003;
//                 }
//
//                 if (difficultyLevel === 3) {
//                     speedModifier = 1.5;
//                     directionChangeProbability = 0.001;
//                     verticalMovement = 1.5;
//                 }
//                 if (difficultyLevel === 4) {
//                     speedModifier = 2;
//                     directionChangeProbability = 0.005;
//                     verticalMovement = 3;
//                 }
//
//                 let speed = (target.direction === 'right' ? baseSpeed : -baseSpeed) * speedModifier;
//
//                 if (Math.random() < directionChangeProbability) {
//                     target.direction = target.direction === 'right' ? 'left' : 'right';
//                     speed = -speed;
//                 }
//
//                 let newX = target.x + speed;
//                 let newY = target.y + (verticalMovement * (Math.random() < 0.5 ? -1 : 1));
//                 //Ajout des paramètres de difficultés
//                 if (newX > canvas.width || newX < 0 ) {
//
//                     switch (target.formType) {
//                         case 'Rectangle':
//                             switch (target.direction) {
//                                 case 'right':
//                                     target.direction = 'left';
//                                     newX = target.x - target.width;
//                                     newY = target.y + 70
//                                     break;
//                                 case 'left':
//                                     target.direction = 'right';
//                                     newX = target.x ;
//                                     newY = target.y + 70
//                                     break;
//                             }
//                             break;
//                         case 'Cercle':
//                             switch (target.direction) {
//                                 case 'right':
//                                     target.direction = 'left';
//                                     newX = target.x ;
//                                     newY = target.y + 70
//                                     break;
//                                 case 'left':
//                                     target.direction = 'right';
//                                     newX = target.x + (target.radius * 2 + speed);
//                                     newY = target.y + 70
//                                     break;
//                             }
//                             break;
//                         case 'Triangle':
//                             switch (target.direction) {
//                                 case 'right':
//                                     target.direction = 'left';
//                                     newX = target.x;
//                                     newY = target.y + 70
//                                     break;
//                                 case 'left':
//                                     target.direction = 'right';
//                                     newX = target.x + target.base;
//                                     newY = target.y + 70
//                                     break;
//                             }
//                             break;
//                         default:
//                             target.direction = target.direction === 'right' ? 'left' : 'right';
//                             newX = target.x;
//                             newY = target.y + 75
//                     }
//                 }
//
//                 if (newY > canvas.height - target.height || newY < 0) {
//                     newY = target.y; // Prevent vertical movement outside bounds
//                 }
//
//                 return {
//                     ...target,
//                     x: newX,
//                     y: newY
//                 };
//             }));
//             //Suivis du score et High Score en bas a droite et a gauche
//             offScreenCtx.fillStyle = '#66ff00';
//             offScreenCtx.font = '24px Arial';
//             offScreenCtx.fillText(`Score: ${score}`, offScreenCanvasRef.current.width  - 150, offScreenCanvasRef.current.height - 100);
//             if (score > highScore) {
//                 offScreenCtx.fillText(`New High Score !!!  : ${score}`, 10, offScreenCanvasRef.current.height - 100); // Utilisation du score actuel comme nouveau score le plus élevé.
//             } else {
//                 offScreenCtx.fillText(`High Score: ${highScore}`, 10, offScreenCanvasRef.current.height - 100); // Affichage du score le plus élevé enregistré si le score actuel ne le dépasse pas.
//             }
//
//             offScreenCtx.fillText(`Wave: ${currentWave}`, offScreenCanvasRef.current.width - 300 , offScreenCanvasRef.current.height - 100 );
//
//             ctx.drawImage(offScreenCanvasRef.current, 0, 0);
//
//             // Continue the animation loop
//             requestRef.current = requestAnimationFrame(update);
//         };
//
//
//         requestRef.current = requestAnimationFrame(update);
//
//         return () => cancelAnimationFrame(requestRef.current);
//     }, [targets, triangle, bulletData, score, highScore, bonuses]);
//     const handleMenuClick = () => {
//         navigate('/');
//     };
//
//     return (
//         <>
//             <canvas height='872' width='1920' ref={canvasRef}></canvas>
//             {isGameOver && (
//                 <NeonButton onClick={resetGame}><RefreshIcon />Restart</NeonButton>
//             )}
//             {isGameOver && (
//                 <NeonButton onClick={handleMenuClick} startIcon={<CloseIcon />}>Menu</NeonButton>
//             )}
//         </>
//     );
// }
//
// export default GameCanvas;

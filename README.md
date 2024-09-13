# GeoInvader

GeoInvader is a modern take on the classic **Space Invader** game, enhanced with a **level creation system**, **bonus mechanics**, **scoreboards**, and **tutorials**. It leverages **Object-Oriented Programming (OOP)**, **Object-Relational Mapping (ORM)**, and **double buffering** techniques to deliver a smooth and dynamic gameplay experience. 

## Table of Contents
1. [Features](#features)
2. [Visuals](#visuals)
3. [Installation](#installation)
   - [Frontend (React)](#frontend-react)
   - [Backend and API (Dockerized)](#backend-and-api-dockerized)
4. [Usage](#usage)
5. [Contributing](#contributing)
6. [Authors](#authors)
7. [License](#license)

## Features

- **Custom Level Creation System**: Players can design and share their own levels.
- **Bonuses and Power-ups**: Collect items to boost your score and abilities.
- **Global Scoreboard**: Compete against others and track your progress.
- **Interactive Tutorials**: Learn how to play with easy-to-follow guides.
- **Object-Oriented Programming**: Efficient code structure for extensibility and maintenance.
- **ORM Integration**: Simplified database interactions for managing user data, scores, and game progress.
- **Double Buffering**: Provides smooth animation and enhances the game's performance.

## Visuals

![GeoInvader Screenshot](https://i.imgur.com/s0Lzlr9.png)

## Installation

### Frontend (React)

To get started with the React frontend:

1. Clone the repository:

    ```bash
    git clone git@github.com:shroomssV0/GeoInvader.git
    cd GeoInvader
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

The app will run on `http://localhost:3000/`.

### Backend and API (Dockerized)

The backend and API are **Dockerized**. To run them:

1. Ensure you have Docker installed.
2. Navigate to the backend folder and run:

    ```bash
    docker-compose up
    ```

The backend will run at `http://localhost:5000/` (or configured port). Refer to the [API documentation](link_to_API_docs) for detailed instructions on usage.

## Usage

Once the application is running:

1. **Start Playing**: Navigate to the game on `http://localhost:3000/` and dive into the action.
2. **Create Levels**: Use the built-in level creation tools to design custom challenges.
3. **Check the Scoreboard**: View your ranking and compare scores locally.
4. **Explore Tutorials**: New to the game? Follow the interactive tutorials to get up to speed.



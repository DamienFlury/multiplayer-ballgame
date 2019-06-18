import React, { useState } from 'react';
import io from 'socket.io-client';
import GameOver from './GameOver';
import GameCanvas from './GameCanvas';

const socket = io.connect('http://localhost:4100');

const Game = () => {
  const [gameOver, setGameOver] = useState(false);

  socket.on('gameOver', () => {
    setGameOver(true);
  });

  return gameOver ? <GameOver /> : <GameCanvas socket={socket} />;
};

export default Game;

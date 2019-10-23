import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import GameOver from './GameOver';
import GameCanvas from './GameCanvas';

const socket = io.connect('http://localhost:4100');

const Game = () => {
  const [gameOver, setGameOver] = useState(false);


  useEffect(() => {
    socket.on('gameOver', () => {
      setGameOver(true);
    });
    return () => {
      socket.disconnect();
    };
  }, []);


  return gameOver ? <GameOver /> : <GameCanvas socket={socket} />;
};

export default Game;

import React, { useState, useRef, useEffect } from 'react';


const GameCanvas = ({ socket }) => {
  const [gameObjects, setGameObjects] = useState([]);

  const canvasRef = useRef(null);
  socket.on('update', (objs) => {
    setGameObjects(objs);
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    gameObjects.forEach(({ x, y, radius }) => {
      ctx.beginPath();
      ctx.ellipse(x + radius, y + radius, radius, radius, 0, 0, 360);
      ctx.fill();
      ctx.stroke();
    });
  }, [gameObjects]);

  const handleClick = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    console.log(event.clientX - rect.left, event.clientY - rect.top, gameObjects);
    socket.emit('click', { x: event.clientX - rect.left, y: event.clientY - rect.top, currentState: gameObjects });
  };

  return <canvas ref={canvasRef} height="500" width="1000" style={{ backgroundColor: 'black' }} onClick={handleClick} />;
};

export default GameCanvas;

import React, { useRef, useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4100');

function App() {
  
  const [gameObjects, setGameObjects] = useState([]);
  
  const canvasRef = useRef(null);
  socket.on('update', objs => {
    setGameObjects(objs);
  });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    gameObjects.forEach(({x, y, radius}) => {
      ctx.beginPath();
      ctx.ellipse(x + radius, y + radius, radius, radius, 0, 0, 360);
      ctx.fill();
      ctx.stroke();
    });
  }, [gameObjects])

  const handleClick = event => {
    gameObjects.forEach(g => {
      console.log(event.clientX > g.x && event.clientX < g.x + 40 ? 'hit' : 'miss' );
    })
    socket.emit('click', {x: event.clientX, y: event.clientY, currentState: gameObjects});
  };

  return (
    <div className="App">
      <canvas ref={canvasRef} height="500" width="1000" style={{backgroundColor: 'black'}} onClick={handleClick}></canvas>
    </div>
  );
}

export default App;

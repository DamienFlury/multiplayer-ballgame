const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(4100);
app.use(express.static('public'));

const io = socket(server);

io.on('connection', (socket) => {
  console.log('connected');
  socket.on('click', ({ x, y }) => {
    const next = gameObjects.filter(gameObj => !(gameObj.x < x && gameObj.x + gameObj.radius * 2 > x && gameObj.y < y && gameObj.y + gameObj.radius * 2 > y));
    gameObjects = next.length !== gameObjects.length ? next : [...next, {
      x: 0,
      y: 0,
      radius: 40,
      velocity: {
        x: 2,
        y: 0,
      }
    }]
  })
})

let gameObjects = [{
  x: 0,
  y: 0,
  radius: 40,
  velocity: {
    x: 2,
    y: 0,
  }
}];



const maxHeight = 500;


setInterval(() => {
  gameObjects = gameObjects.map(({ x, y, velocity, radius }) => ({ radius: radius, x: x + velocity.x, y: y + velocity.y, velocity: { x: velocity.x, y: y + 40 >= maxHeight ? -Math.abs(0.94 * velocity.y) : velocity.y + Math.sqrt(0.01 * 9.81) } }));

  io.emit('update', gameObjects);
}, 1000 / 60);
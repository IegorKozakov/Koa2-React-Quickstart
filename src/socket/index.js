import IO from 'koa-socket';

let onMessage = (ctx, message) => {
  console.log(message);
  ctx.socket.broadcast('message', message);
  ctx.socket.emit('message', message);
};

export default (nameOfSocket, app) => {
  let room = new IO(nameOfSocket);
  room.attach(app);
  room.on('message', onMessage);
  return room;
};

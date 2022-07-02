const {
  JOIN_ROOM_EVENT,
  NEW_USER_JOINED_ROOM_EVENT,
} = require("@pmp/constants");

function initSocket(socket) {
  const ROOM_NAME = "HELLO_WORLD";
  socket.on(JOIN_ROOM_EVENT, () => {
    console.log("Trying to join a room!");
    socket.join(ROOM_NAME);
    socket.broadcast
      .to(ROOM_NAME)
      .emit(NEW_USER_JOINED_ROOM_EVENT, { user: socket.id });
  });
}

module.exports = initSocket;

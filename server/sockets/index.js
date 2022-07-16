const { JOIN_ROOM_EVENT } = require("@pmp/constants");
const buildEventHandlers = require("./eventHandler");

function initSocket(socket, db) {
  const eventHandler = buildEventHandlers(socket, db);
  socket.on(JOIN_ROOM_EVENT, eventHandler.joinRoom);
}

module.exports = initSocket;

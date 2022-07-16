const {
  NEW_USER_JOINED_ROOM_EVENT,
  ROOM_NOT_FOUND,
  ROOM_ALREADY_FULL,
} = require("@pmp/constants");
const isEmpty = require("lodash/isEmpty");
const get = require("lodash/get");

module.exports = function (socket, db) {
  async function joinRoom(payload) {
    console.log("Trying to join a room!", payload);
    const roomID = payload.roomID;
    if (!isEmpty(roomID)) {
      try {
        let roomState = await db.get(`room:${roomID}`);
        if (isEmpty(roomState)) {
          console.log("Room not found", payload);
          socket.emit(ROOM_NOT_FOUND);
          return;
        }
        roomState = JSON.stringify(roomState);
        if (get(roomState, "isFull", true)) {
          console.log("Room already full!", payload);
          socket.emit(ROOM_ALREADY_FULL);
          return;
        }
        socket.join(roomID);
        socket.broadcast
          .to(roomID)
          .emit(NEW_USER_JOINED_ROOM_EVENT, { user: socket.id });
      } catch (err) {
        console.log("Something went wrong in the socket response");
        console.log(err);
      }
    }
  }
  return {
    joinRoom,
  };
};

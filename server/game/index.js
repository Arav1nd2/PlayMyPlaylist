const suid = require("short-unique-id");

// Generate 6 characters long room ids.
const uid = new suid({ length: 6 });

async function createRoom(gameProps, db, retryCount = 3) {
  if (retryCount <= 0) {
    throw new Error("Too many rooms in DB! Can't create a unique room ID!!!");
  }
  const roomID = uid();
  const isRoomAlreadyPresent = await db.get(`room:${roomID}`);
  if (isRoomAlreadyPresent) {
    return createRoom(gameProps, db, retryCount - 1);
  }
  // Room not present in DB, we can create a new one!
  await db.set(
    `room:${roomID}`,
    JSON.stringify({
      id: roomID,
      ...gameProps,
    })
  );
  return roomID;
}

module.exports = function (db) {
  return {
    createRoom: (gameProps) => createRoom(gameProps, db),
  };
};

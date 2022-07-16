const { Router } = require("express");
const buildRoomRouter = require("./rooms");

module.exports = function (db) {
  const router = Router();
  router.get("/ping", async (_, res) => {
    res.json({
      ok: true,
      message: "Pong! Things look good, proceed to create / join a room.",
    });
  });

  router.use("/room", buildRoomRouter(db));

  return router;
};

const { Router } = require("express");
const Joi = require("joi");
const HTTPException = require("../../lib/errors");
const buildGameController = require("../../game");

const createRoomSchema = Joi.object({
  maxPlayers: Joi.number().min(2).max(6).required(),
  songsPerPlayer: Joi.number().min(2).max(4).required(),
  maxRounds: Joi.number().min(4).max(24).required(),
});

module.exports = function (db) {
  const router = Router();
  const gameController = buildGameController(db);
  router.post("/", async function (req, res, next) {
    try {
      const { error, value: body } = createRoomSchema.validate(req.body, {
        stripUnknown: true,
      });
      if (error) {
        throw new HTTPException(400, error.message);
      }
      const roomID = await gameController.createRoom(body);
      res.json({
        ok: true,
        payload: {
          roomID,
        },
      });
    } catch (err) {
      next(err);
    }
  });

  return router;
};

const { Router } = require("express");
const _get = require("lodash/get");
const _set = require("lodash/set");
const HTTPException = require("../lib/errors");

module.exports = function (db) {
  const router = Router();
  router.get("/ping", (_, res) =>
    res.json({
      ok: true,
      message: "Pong! Things look good, proceed to create / join a room.",
    })
  );

  router.post("/player", async (req, res, next) => {
    try {
      const userID = _get(req, "session.user.id", "");
      if (!userID) {
        throw new HTTPException(403);
      }
      const name = _get(req, "body.name", "");
      const avatar = _get(req, "body.avatar", "");
      // Validate name and avatar.
      const isValidName =
        name !== "" && name.length < 10 && name.match(/^[0-9a-zA-Z]+$/);
      const isValidAvatar =
        avatar !== "" &&
        typeof avatar === "number" &&
        avatar <= 10 &&
        avatar > 0;
      if (!isValidName) {
        throw new HTTPException(
          400,
          "Name field must be less than 10 characters and only alphanumeric characters are allowed."
        );
      }
      if (!isValidAvatar) {
        throw new HTTPException(400, "Invalid Avatar.");
      }
      try {
        const url = generateURL(avatar);
        const newUser = await db.player.update({
          where: { id: userID },
          data: {
            name,
            avatar: url,
          },
        });
        // update user details in session also
        _set(req, "session.user.name", newUser.name);
        _set(req, "session.user.avatar", newUser.avatar);
        res.statusCode = 200;
        res.json({
          ok: true,
          message: "Record updated successfully.",
        });
      } catch (err) {
        console.log(err);
        if (err instanceof RecordNotFound) {
          console.log("UPDATE OP FAILED DUE TO RECORD NOT FOUND!");
          throw new HTTPException(404);
        }
        console.log(err);
        throw new HTTPException(500);
      }
    } catch (err) {
      next(err);
    }
  });
  return router;
};

function generateURL(avatar) {
  return `https://google.com?image=${avatar}`;
}

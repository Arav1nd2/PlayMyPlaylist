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

  return router;
};

function generateURL(avatar) {
  return `https://google.com?image=${avatar}`;
}

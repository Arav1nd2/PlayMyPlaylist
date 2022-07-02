const { Router } = require("express");
const router = Router();

router.get("/", (_, res) =>
  res.json({
    ok: true,
    message: "You have hit /api end point",
  })
);

module.exports = router;

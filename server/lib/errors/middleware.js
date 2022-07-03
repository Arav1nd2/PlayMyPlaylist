const HTTPException = require(".");

module.exports = function (err, _, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  if (err instanceof HTTPException) {
    res.statusCode = err.statusCode;
    res.json({
      ok: false,
      detail: {
        description: err.message,
        name: err.name,
        stack: err.stack,
      },
    });
  } else {
    res.statusCode = 500;
    res.json({
      ok: false,
      message: "Something went wrong.",
      stack: err.stack,
    });
  }
};

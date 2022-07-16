const express = require("express");
const http = require("http");
const { Server: SocketServer } = require("socket.io");
const cors = require("cors");
const dotEnv = require("dotenv");
const { SERVER_CONNECT_EVENT } = require("@pmp/constants");
const buildAPI = require("./api");
const sockets = require("./sockets");
const errorHandler = require("./lib/errors/middleware");
const redis = require("redis");
const redisClient = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
  password: "redispasss",
});
dotEnv.config();

async function main() {
  redisClient.on("connect", () => {
    console.log("Redis client connected!");
  });
  redisClient.on("error", (err) => console.log("Redis Client Error", err));
  await redisClient.connect();

  // Start app config
  const app = express();
  const server = http.createServer(app);
  const io = new SocketServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  app.use(cors());
  app.use(express.json());

  app.use("/api", buildAPI(redisClient));

  io.on(SERVER_CONNECT_EVENT, (socket) => {
    console.log("Socket connections are also working!");
    sockets(socket, redisClient);
  });

  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;

  server.listen(PORT, () => {
    console.log(`PlayMyPlaylist server started and running on port ${PORT}`);
  });
}

// Start the server!!
main();

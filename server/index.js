const express = require("express");
const http = require("http");
const { Server: SocketServer } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const ws = new SocketServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.get("/", (_, res) =>
  res.json({
    ok: true,
    message: "You have hit PlayMyPlaylist API v1.0.0",
  })
);

ws.on("connection", (socket) => {
  console.log("Socket connections are also working!");
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`PlayMyPlaylist server started and running on port ${PORT}`);
});

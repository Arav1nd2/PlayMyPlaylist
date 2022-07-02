const express = require("express");
const http = require("http");
const { Server: SocketServer } = require("socket.io");
const cors = require("cors");
const {
  JOIN_ROOM_EVENT,
  NEW_USER_JOINED_ROOM_EVENT,
  SERVER_CONNECT_EVENT,
} = require("@pmp/constants");

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

app.get("/", (_, res) =>
  res.json({
    ok: true,
    message: "You have hit PlayMyPlaylist API v1.0.0",
  })
);

io.on(SERVER_CONNECT_EVENT, (socket) => {
  console.log("Socket connections are also working!");
  attachListeners(socket);
});

function attachListeners(socket) {
  const ROOM_NAME = "HELLO_WORLD";
  socket.on(JOIN_ROOM_EVENT, () => {
    console.log("Trying to join a room!");
    socket.join(ROOM_NAME);
    socket.broadcast
      .to(ROOM_NAME)
      .emit(NEW_USER_JOINED_ROOM_EVENT, { user: socket.id });
  });
}

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`PlayMyPlaylist server started and running on port ${PORT}`);
});

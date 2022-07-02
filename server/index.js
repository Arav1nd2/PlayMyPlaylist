const express = require("express");
const http = require("http");
const { Server: SocketServer } = require("socket.io");
const cors = require("cors");
const dotEnv = require("dotenv");
const { SERVER_CONNECT_EVENT } = require("@pmp/constants");
const api = require("./api");
const sockets = require("./sockets");

// Start app config
dotEnv.config();
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

app.use("/api", api);

io.on(SERVER_CONNECT_EVENT, (socket) => {
  console.log("Socket connections are also working!");
  sockets(socket);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`PlayMyPlaylist server started and running on port ${PORT}`);
});

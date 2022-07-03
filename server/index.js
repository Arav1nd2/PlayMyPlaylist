const express = require("express");
const http = require("http");
const { Server: SocketServer } = require("socket.io");
const cors = require("cors");
const dotEnv = require("dotenv");
const { SERVER_CONNECT_EVENT } = require("@pmp/constants");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const { PrismaClient } = require("@prisma/client");
const api = require("./api");
const sockets = require("./sockets");

// Start app config
dotEnv.config();
const prisma = new PrismaClient();
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
app.use(
  cookieSession({
    name: "pmpSid",
    httpOnly: true,
    keys: [process.env.COOKIE_SECRET],
    maxAge: 3 * 24 * 60 * 60 * 1000, // Cookie would live for 3 days
  })
);

app.use(async (req, res, next) => {
  if (req.session.isNew) {
    const newPlayer = await prisma.player.create({
      data: {
        name: "Temp",
        avatar: "temp",
      },
    });
    req.session.user = newPlayer;
    return next();
  }
  if (req.session.isPopulated) {
    const sessionPlayer = req.session.user;
    const playerFromDB = await prisma.player.findUnique({
      where: { id: sessionPlayer.id },
    });
    if (!playerFromDB) {
      const newPlayer = await prisma.player.create({
        data: {
          name: "Temp",
          avatar: "temp",
        },
      });
      req.session.user = newPlayer;
    } else {
      req.session.user = playerFromDB;
    }
  }
  next();
});

app.use("/api", api);

io.on(SERVER_CONNECT_EVENT, (socket) => {
  console.log("Socket connections are also working!");
  sockets(socket);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`PlayMyPlaylist server started and running on port ${PORT}`);
});

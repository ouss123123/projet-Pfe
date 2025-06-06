const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");
const { EventEmitter } = require("events");
const connectDB = require("./connection/connection.js");
const userRoutes = require("./routes/userRoutes.js");
const matchRoutes = require("./routes/matchRoute.js");
const stadiumRoutes = require("./routes/stadiumRoute.js");
const commentRoutes = require("./routes/commentRoute.js");
const messageRoutes = require("./routes/messageRoutes.js");
const notificationRoutes = require("./routes/notificationRoutes.js");
const reportRoutes = require("./routes/reportRoutes.js")
const limiter = require("./middlewares/limiter.js");
const dotenv = require("dotenv");
dotenv.config()

EventEmitter.defaultMaxListeners = 20;

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static("public"));
app.use(limiter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("chat message", (message) => {
    io.emit("chat message", message);
  });

  socket.on("notification",(message) => {
    io.emit("notification", message);
    console.log('message',message)
  })

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 5000;

connectDB();

try {
  app.use("/users", userRoutes);
  app.use("/matches", matchRoutes);
  app.use("/stadiums", stadiumRoutes);
  app.use("/comments", commentRoutes);
  app.use("/messages",messageRoutes);
  app.use("/notifications",notificationRoutes)
  app.use("/reports",reportRoutes)
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: err.message,
    });
  });
} catch (error) {
  console.error("Error in server setup:", error);
  process.exit(1);
}

server.listen(PORT, () => {
  console.log("listening on port 5000");
});

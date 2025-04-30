const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const http = require("http");
const connectDB = require("./connection/connection.js");
const userRoutes = require("./routes/userRoutes.js");

const app = express();

app.use(cors());

const server = http.createServer(app);

const PORT = process.env.PORT;

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDB();

try {
  app.use("/", userRoutes);
} catch (error) {
  console.error("Error in server setup:", error);
  process.exit(1);
}

server.listen(PORT, () => {
  console.log("listening on port 5000");
});

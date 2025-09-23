const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);

const io = new Server(server); //io continues connection
require("dotenv").config();

const connectDB = require("./config/db");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
  });
});

app.use("/api/auth", require("./routes/user.route"));
app.use("/api/pets", require("./routes/pet.route"));
app.use("/api/appointments", require("./routes/appointment.route"));
app.use("/api/activity", require("./routes/activity.route"));
app.use("/api/insurance", require("./routes/insurance.route"));
app.use("/api/admin", require("./routes/admin.route"));
app.use("/api", require("./routes/contact.route"));

app.use((req, res) => {
  res.status(404).send("404 Not Found");
  console.log("404 not found");
});

const PORT = process.env.PORT || 8000;
io.on("connection", (client) => {
  console.log("Client connected");
});

server.listen(PORT, () => {
  connectDB();
  console.log("Io connected");
});

const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, "build")));

const state = {
    1: "Hello",
    2: "This is a note",
    3: "This is also a note, but a long one",
};

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/api/notes/getAll", (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(state));
});

io.on("connection", socket => {
  socket.on("message", action => {
    socket.broadcast.send(action);
    Object.assign(state, {[action.payload.id]: action.payload.value});
  });
});

server.listen(9000);

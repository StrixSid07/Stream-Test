const http = require("http");
const app = require("./app");
const { handleSocketEvents } = require("./sockets/stream.socket");
const socketIO = require("socket.io");
const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("stream");
});

app.get("/host", (req, res) => {
  res.render("host");
});

handleSocketEvents(io);
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

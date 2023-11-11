const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = 1234;
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

app.use(cors({
    origin: "http://localhost:3000"
}));
app.use(bodyParser.json());

const messages = [];

io.on("connection", socket => {
    socket.on("send-message", data => {
        messages.push(data.message);
        io.emit("messages-update", messages);
    })
});

app.get("/api/messages", (req, res) => {
    res.json(messages);
});

app.post("/api/send-message", (req, res) => {
    const message = req.body.message;
    messages.push(message);
    res.status(200)
    .json({message: "message added successfully"});
});

server.listen(port, () => {
    console.log(`listening on port ${port}`);
});

const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const path = require('path');

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

// Serve your static files
server.use(express.static(path.join(__dirname, 'dist')));

server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

server.use(router);

module.exports = server;

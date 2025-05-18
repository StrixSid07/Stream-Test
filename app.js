const express = require("express");
const path = require("path");
// const streamRoutes = require('./routes/stream.routes');

const app = express();

app.use(express.json({ limit: "50mb" })); // Handle large video frames
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));
// app.use('/api/stream', streamRoutes);

module.exports = app;

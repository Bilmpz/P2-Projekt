const express = require("express");
const path = require("path");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "..")));
app.use("/api/auth", authRoutes);

module.exports = app;
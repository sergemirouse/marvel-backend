require("dotenv").config();
const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const comicsRoute = "./routes/comics.js";
const charactersRoute = "./routes/characters.js";
app.use(comicsRoute);
app.use(charactersRoute);

app.get("/", (req, res) => {
  res.json("Salut les voyous");
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Cette route n'existe pas" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started 🤕");
});

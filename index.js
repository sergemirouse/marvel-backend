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

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI);

const comicsRoute = require("./routes/comics");
app.use(comicsRoute);

const charactersRoute = require("./routes/characters");
app.use(charactersRoute);

const userRoutes = require("./routes/user");
app.use(userRoutes);

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/"
    );
    console.log(response.data);
    res.status(200).json("Hi friends");
  } catch (error) {
    res.status(400).json(error.message);
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Wrong way dude" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started 🤕");
});

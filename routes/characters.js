const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/characters", async (req, res) => {
  let { limit, skip, name } = req.query;

  if (!limit) {
    limit = "";
  }
  if (!skip) {
    skip = "";
  }
  if (!name) {
    name = "";
  }

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&limit=${limit}&skip=${skip}&name=${name}`
    );
    res.status(200).json(response.data);
    console.log(response.data);
    console.log("Ma route fonctionne");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/character/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.characterId}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.status(200).json(response.data);
    console.log(response.data);
    console.log("Ma route fonctionne");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

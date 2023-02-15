const express = require("express");
const router = express.Router();

router.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.status(200).json(response.data);
    console.log(response.data);
    console.log("Ma route fonctionne");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/comics/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.query.characterId}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.status(200).json(response.data);
    console.log(response.data);
    console.log("Ma route fonctionne");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

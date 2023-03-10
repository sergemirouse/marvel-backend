const express = require("express");
const router = express.Router();

const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const User = require("../models/User");
const { default: axios } = require("axios");

router.post("/user/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing parameter" });
    }

    const salt = uid2(16);
    const hash = SHA256(salt + password).toString(encBase64);
    const token = uid2(64);

    const emailRegistered = await User.findOne({ email });

    //console.log(emailRegistered);

    const newUser = new User({
      account: {
        username: req.body.username,
      },
      email: req.body.email,
      hash,
      salt,
      token,
    });

    if (emailRegistered) {
      return res
        .status(400)
        .json({ message: "This email address already exists" });
    }

    await newUser.save();

    const signupAnswer = {
      id: newUser._id,
      token: token,
      account: {
        username: newUser.account,
        token: newUser.token,
      },
    };

    res.json(signupAnswer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailValidation = await User.findOne({ email: email });
    if (!emailValidation) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const hash = SHA256(emailValidation.salt + password).toString(encBase64);
    //console.log(hash);

    const loginAnswer = {
      id: emailValidation._id,
      token: emailValidation.token,
      account: {
        username: emailValidation.account.username,
      },
    };
    console.log(loginAnswer);

    if (hash !== emailValidation.hash) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      res.json(loginAnswer);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/user/favorites", async (req, res) => {
  // console.log("fonctionne");
  try {
    // je cr??e un tableau vide qui sera rempli lors de mes requ??tes
    let result = [];
    // ici, je fais une boucle, tant que i est inf??rieur ou ??gal ?? la longueur du tableau en body, on fait une requ??te par tour de boucle, et on push les infos re??ues en r??ponse dans le tableau cr???? pr??c??demment
    for (let i = 0; i < req.body.favorites.length; i++) {
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/character/${req.body.favorites[i]}?apiKey=${process.env.MARVEL_API_KEY}`
      );
      result.push(response.data);
      console.log(req.body.favorites);
      console.log(result);
    }
    // console.log(result);
    // console.log(response.data);
    // console.log(req.body.favorites);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.meesage });
    console.log(error.message);
  }
});

module.exports = router;

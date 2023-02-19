const mongoose = require("mongoose");

const User = mongoose.model("User", {
  account: {
    username: { type: String, required: true },
  },
  email: { type: String, required: true },
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;

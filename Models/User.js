const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: String,
  email: { type: String, unique: true },
  password: String,
  power: String,
  salt: String,
  hash: String,
  token: String,
});

module.exports = User;

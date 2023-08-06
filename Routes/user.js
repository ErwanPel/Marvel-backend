const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const Base64 = require("crypto-js/enc-base64");

const User = require("../Models/User");

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, power } = req.body;
    if (email && password && username && power) {
      const salt = uid2(32);
      const hash = SHA256(password + salt).toString(Base64);
      const token = uid2(32);

      const createUser = new User({
        username,
        email,
        power,
        salt,
        hash,
        token,
      });
      console.log(createUser);
      await createUser.save();

      res.status(200).json({
        token: createUser.token,
        username: createUser.username,
        message: "votre compte a bien été crée",
      });
    } else {
      throw { status: 400, message: "missing parameters" };
    }
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const findUser = await User.findOne({ email });
      if (findUser) {
        const hashUser = SHA256(password + findUser.salt).toString(Base64);
        if (hashUser === findUser.hash) {
          return res.status(200).json({
            _id: findUser._id,
            token: findUser.token,
            username: findUser.username,
          });
        } else {
          throw { status: 400, message: "email or password are incorrect" };
        }
      } else {
        throw { status: 400, message: "the user is not find in the database" };
      }
    } else {
      throw { status: 400, message: "email or password are incorrect" };
    }
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

module.exports = router;

const User = require("../Models/User");

const isAuthenticated = async (req, res, next) => {
  if (req.headers.authorization) {
    console.log("je suis dans le middleware");
    const sentToken = req.headers.authorization.replace("Bearer ", "");

    const findUser = await User.findOne({ token: sentToken });

    if (findUser) {
      req.token = findUser;
      next();
    } else {
      res.status(401).json({ message: "unautorized" });
    }
  } else {
    res.status(401).json({ message: "unautorized" });
  }
};

module.exports = isAuthenticated;

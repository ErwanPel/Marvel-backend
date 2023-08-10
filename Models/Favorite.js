const mongoose = require("mongoose");

const Favorite = mongoose.model("Favorite", {
  characters: Array,
  comics: Array,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Favorite;

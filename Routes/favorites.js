const express = require("express");
const router = express.Router();
const isAuthenticated = require("../Middleware/isAuthenticated");

const Favorite = require("../Models/Favorite");
const { find } = require("lodash");

router.get("/favorites", isAuthenticated, async (req, res) => {
  try {
    const findFavorite = await Favorite.findOne({ owner: req.token._id });
    console.log(findFavorite);
    if (findFavorite) {
      res.status(200).json({
        characters: findFavorite.characters,
        comics: findFavorite.comics,
      });
    } else {
      throw {
        status: 200,
        message: "the user doesn't have favorite in the database",
      };
    }
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
});

router.post("/favorites", isAuthenticated, async (req, res) => {
  try {
    console.log("favorite", req.token);
    console.log(req.body);
    const findFavorite = await Favorite.findOne({ owner: req.token._id });
    console.log(findFavorite);
    if (!findFavorite) {
      if (req.body.characters) {
        console.log("chara");
        const FavoriteToCreate = await Favorite({
          characters: req.body.characters,
          comics: [],
          owner: req.token,
        });
        console.log(FavoriteToCreate);
        await FavoriteToCreate.save();
        return res.status(200).json(FavoriteToCreate);
      } else {
        const FavoriteToCreate = await Favorite({
          characters: [],
          comics: req.body.comics,
          owner: req.token,
        });
        console.log(FavoriteToCreate);
        await FavoriteToCreate.save();
        return res.status(200).json(FavoriteToCreate);
      }
    } else {
      if (req.body.characters) {
        console.log("nouveau characters");
        console.log("trouvé", findFavorite);
        if (!findFavorite.characters.includes(req.body.characters)) {
          findFavorite.characters.push(req.body.characters);
          findFavorite.markModified("characters");
          await findFavorite.save();
          console.log(findFavorite);
          return res
            .status(200)
            .json({ message: "the favorite character is create" });
        } else {
          findFavorite.characters.splice(
            findFavorite.characters.indexOf(req.body.characters),
            1
          );

          findFavorite.markModified("comics");
          findFavorite.save();
          res.status(200).json({ message: "the favorite character is delete" });
        }
      } else {
        console.log("nouveau comics");
        if (!findFavorite.comics.includes(req.body.comics)) {
          findFavorite.comics.push(req.body.comics);
          findFavorite.markModified("comics");
          await findFavorite.save();
          console.log(findFavorite);
          return res
            .status(200)
            .json({ message: "the favorite comic is create" });
        } else {
          console.log("present", findFavorite);
          findFavorite.comics.splice(
            findFavorite.comics.indexOf(req.body.comics),
            1
          );

          findFavorite.markModified("comics");
          findFavorite.save();
          res.status(200).json({ message: "the favorite comic is delete" });
        }
      }
    }
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
});

module.exports = router;

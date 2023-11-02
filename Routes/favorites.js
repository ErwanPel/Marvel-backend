const express = require("express");
const router = express.Router();
const isAuthenticated = require("../Middleware/isAuthenticated");

const Favorite = require("../Models/Favorite");

router.get("/favorites", isAuthenticated, async (req, res) => {
  try {
    const findFavorite = await Favorite.findOne({ owner: req.token._id });

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
    const findFavorite = await Favorite.findOne({ owner: req.token._id });

    // If no favorite is find for the owner, create favorite
    if (!findFavorite) {
      // create favorite database for user with the character
      if (req.body.name) {
        const FavoriteToCreate = await Favorite({
          characters: req.body,
          comics: [],
          owner: req.token._id,
        });

        await FavoriteToCreate.save();
        res.status(200).json(FavoriteToCreate);

        // create favorite database for user with the character
      } else if (req.body.title) {
        const FavoriteToCreate = await Favorite({
          characters: [],
          comics: req.body,
          owner: req.token._id,
        });
        await FavoriteToCreate.save();
        res.status(200).json(FavoriteToCreate);
      }

      // If a user is find on the favorite Database
    } else {
      // If the body contain a key belong to the character "name"
      if (req.body.name) {
        const searchFav = findFavorite.characters.findIndex(
          (fav) => fav._id === req.body._id
        );

        // If the character is not find in this favorite's characters in database
        if (searchFav === -1) {
          findFavorite.characters.push(req.body);
          findFavorite.markModified("characters");

          await findFavorite.save();
          res.status(200).json(findFavorite);
        } else {
          res.status(200).json({
            message: "this favorite character is already in the database",
          });
        }

        // If the body contain a key belong to the comic "title"
      } else {
        const searchFav = findFavorite.comics.findIndex(
          (fav) => fav._id === req.body._id
        );

        // If the comic is not find in this favorite's comics in database
        if (searchFav === -1) {
          findFavorite.comics.push(req.body);
          findFavorite.markModified("comics");

          await findFavorite.save();
          res.status(200).json(findFavorite);
        } else {
          res.status(200).json({
            message: "this favorite comic is already in the database",
          });
        }
      }
    }
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
});

router.delete("/favorites", isAuthenticated, async (req, res) => {
  try {
    const findFavorite = await Favorite.findOne({ owner: req.token._id });

    if (findFavorite) {
      if (req.query.characters) {
        const searchFav = findFavorite.characters.findIndex(
          (fav) => fav._id === req.query.characters
        );

        if (searchFav === -1) {
          throw { status: 400, message: "no ID is find for this character" };
        } else {
          findFavorite.characters.splice(searchFav, 1);
          findFavorite.markModified("characters");
          findFavorite.save();
          res.status(200).json({ message: "the favorite character is delete" });
        }
      } else {
        const searchFav = findFavorite.comics.findIndex(
          (fav) => fav._id === req.query.comics
        );

        if (searchFav === -1) {
          throw { status: 400, message: "no ID is find for this comic" };
        } else {
          findFavorite.comics.splice(searchFav, 1);

          findFavorite.markModified("comics");
          findFavorite.save();
          res.status(200).json({ message: "the favorite comic is delete" });
        }
      }
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

module.exports = router;

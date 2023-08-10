const express = require("express");
const router = express.Router();
const isAuthenticated = require("../Middleware/isAuthenticated");

const Favorite = require("../Models/Favorite");

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
        return res
          .status(200)
          .json({ message: "the favorite is add in the database" });
      } else {
        const FavoriteToCreate = await Favorite({
          characters: [],
          comics: req.body.comics,
          owner: req.token,
        });
        console.log(FavoriteToCreate);
        await FavoriteToCreate.save();
        return res
          .status(200)
          .json({ message: "the favorite is add in the database" });
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
            .json({ message: "the favorite is add in the database" });
        } else {
          throw {
            status: 200,
            message: "the favorite is already in the database",
          };
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
            .json({ message: "the favorite is add in the database" });
        } else {
          throw {
            status: 200,
            message: "the favorite is already in the database",
          };
        }
      }
    }
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
});

router.delete("/favorites", isAuthenticated, async (req, res) => {
  try {
    console.log("query", req.query.characters);
    const findFavorite = await Favorite.findOne({ owner: req.token._id });
    console.log(findFavorite);
    if (findFavorite) {
      if (req.query.characters) {
        console.log(findFavorite.characters.indexOf(req.query.characters));
        if (findFavorite.characters.indexOf(req.query.characters) === -1) {
          throw { status: 400, message: "no ID is find for this character" };
        } else {
          findFavorite.characters.splice(
            findFavorite.characters.indexOf(req.query.characters),
            1
          );

          findFavorite.markModified("characters");
          findFavorite.save();
          res.status(200).json({ message: "the favorite character is delete" });
        }
      } else {
        console.log("delete comics");
        console.log(findFavorite.comics.indexOf(req.query.comics));
        if (findFavorite.comics.indexOf(req.query.comics) === -1) {
          throw { status: 400, message: "no ID is find for this comic" };
        } else {
          findFavorite.comics.splice(
            findFavorite.comics.indexOf(req.query.comics),
            1
          );

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

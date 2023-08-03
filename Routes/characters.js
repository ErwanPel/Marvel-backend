const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/characters", async (req, res) => {
  try {
    const { name, limit, skip } = req.query;
    let filters = { apiKey: process.env.APIKEY };

    if (name) {
      filters["name"] = name;
    }
    if (limit) {
      filters["limit"] = limit;
    }
    if (skip) {
      filters["skip"] = skip;
    }

    let query = "";
    const keys = Object.keys(filters);
    for (let i = 0; i < keys.length; i++) {
      if (i === 0) {
        query += `?${keys[i]}=${filters[keys[i]]}`;
      } else {
        query += `&${keys[i]}=${filters[keys[i]]}`;
      }
    }

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters${query}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.response });
  }
});

router.get("/character/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.characterId}?apiKey=${process.env.APIKEY}`
    );
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.response });
  }
});

module.exports = router;

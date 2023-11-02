const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/characters", async (req, res) => {
  try {
    const { name, page } = req.query;
    let filters = { apiKey: process.env.APIKEY };

    if (name) {
      filters["name"] = name;
    }

    if (page) {
      const skip = (page - 1) * 100;
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
    res.status(500).json({ message: error.message });
  }
});

router.get("/character/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.characterId}?apiKey=${process.env.APIKEY}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

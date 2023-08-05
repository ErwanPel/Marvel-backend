require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");

const charactersRoute = require("./Routes/characters");
const comicsRoute = require("./Routes/comics");

app.use(cors()).use(charactersRoute).use(comicsRoute);

app.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "Bienvenue au site Marvel" });
  } catch (error) {
    res.status(500).json({ message: error.response });
  }
});

app.all("*", (req, res) => {
  try {
    res.status(404).json({ message: "Page not found !" });
  } catch (error) {
    res.status(500).json({ message: error.response });
  }
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server has started");
});

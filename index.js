require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL);

const charactersRoute = require("./Routes/characters");
const comicsRoute = require("./Routes/comics");
const userRoutes = require("./Routes/user");
const FavoriteRoutes = require("./Routes/favorites");

app
  .use(function (req, res, next) {
    res.setHeader(
      "Report-To",
      '{"group":"csp-endpoint","max_age":10886400,"endpoints":[{"url":"https://site--marvel-backend--fwddjdqr85yq.code.run/__cspreport__"}],"include_subdomains":true},  { "group": "hpkp-endpoint","max_age": 10886400,"endpoints": [{ "url": "https://site--marvel-backend--fwddjdqr85yq.code.run/__hpkpreport__" }] }'
    );
    req.setHeader(
      "Content-Security-Policy",
      "default-src 'self' https://site--marvel-backend--fwddjdqr85yq.code.run/; font-src 'self' https://fonts.gstatic.com/; img-src 'self' http://i.annihil.us; script-src 'self'; style-src 'self' 'sha256-Evgf5Vl6C3X3/0d5WiBHe2Tmq2ZdlVQYhfTiePNAXgY=' https://fonts.googleapis.com/ 'sha256-m9C3ibQ7/MuOKw17/yE5bYRuDJAxyp9QzejqJPbEqos='; frame-src 'self'"
    );
    next();
  })
  .use(
    express.json({
      type: [
        "application/json",
        "application/csp-report",
        "application/reports+json",
      ],
    })
  )
  .use(cors())
  .use(charactersRoute)
  .use(comicsRoute)
  .use(userRoutes)
  .use(FavoriteRoutes);

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

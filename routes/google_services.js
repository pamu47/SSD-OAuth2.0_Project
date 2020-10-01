const express = require("express");
const app = express()
const googleRoutes = express.Router();

googleRoutes.get("/callback", (req, res) => {
  res.send("API Called");
});

module.exports = googleRoutes;

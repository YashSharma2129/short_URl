const express = require("express");
const {
  handleGeneateShortURl,
  handleGetAnalytics,
} = require("../controller/url");

const Router = express.Router();

Router.post("/", handleGeneateShortURl);

Router.get("/analytics/:shortId",handleGetAnalytics);

module.exports = Router;

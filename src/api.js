const axios = require("axios");
const express = require("express");
const app = express();
const serverless = require("serverless-http");
const cors = require("cors");

app.use(cors());

const host = "https://newsapi.org/v2/";

const router = require("router");

router.get("/", (req, res) => {
  res.json({ message: "welcome" });
});

router.get("/:var", (req, res) => {
  const api = req._parsedUrl.href;

  axios
    .get(host + api)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json({ message: api });
    });
});

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);

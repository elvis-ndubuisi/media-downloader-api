const express = require("express");
const routers = express.Router();
const {
  youtubeMp3Handler,
  youtubeVideoHandler,
} = require("./handlers/youtubeHandler");

// Healthcheck & aanalysis
routers.get("/", (_, res) => {
  res.redirect("https://elvis.js.cool");
});
routers.get("/health", (_, res) => {
  res.sendStatus(200);
});

// Youtube
routers.post("/api/yt", youtubeVideoHandler);
routers.post("/api/yt-mp3", youtubeMp3Handler);

module.exports = routers;

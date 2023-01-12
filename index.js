const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const httpErrors = require("http-errors");
const ytMusic = require("./handlers/dl-ytmusic");
const ytVideo = require("./handlers/dl-ytvideo");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/", ytVideo);
app.post("/mp3", ytMusic);

app.get("*", (req, res, next) => {
  next(httpErrors.NotFound("Route doesn't exist"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    status: "error",
    error: {
      code: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(8080, () => console.log("Ready on port 8080"));
// module.exports = app;

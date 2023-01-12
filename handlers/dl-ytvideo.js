const fs = require("fs");
const ytdl = require("ytdl-core");

const ytVideo = async (req, res, next) => {
  let url = "https://www.youtube.com/watch?v=a00NRSFgHsY";
  const data = await ytdl.getInfo(url);
  res.json({ data: data });
  // res.end();
};

module.exports = ytVideo;

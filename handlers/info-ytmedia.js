/**
 * Gets the infomations associated with youtube url
 */
const fs = require("fs");
const ytdl = require("ytdl-core");
const axios = require("axios");

// const infoMedia = async (req, res, next) => {
//   // let url = "https://www.youtube.com/watch?v=a00NRSFgHsY";
//   let url = "https://www.tiktok.com/@salonmater/video/7188458192014167339";
//   const data = await ytdl.getInfo(url);
//   res.json({ data: data });
//   // res.end();
// };

const infoMedia = async (req, res, next) => {
  // let url = "https://www.tiktok.com/@salonmater/video/7188458192014167339";
  let url = "https://www.youtube.com/watch?v=a00NRSFgHsY";

  try {
    const response = await axios.get(url);
    res.json({ data: response });
  } catch (error) {
    res.send(error);
  }
};

module.exports = infoMedia;

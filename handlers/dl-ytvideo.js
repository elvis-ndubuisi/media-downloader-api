/**
 * Stream Yt video data in chunks through API route.
 */

const https = require("node:https");
const httpErrors = require("http-errors");
const ytdl = require("ytdl-core");

const dlYtVideo = async (req, res, next) => {
  const durl = req.body.durl;
  if (!durl) throw httpErrors.BadRequest("Invalid data");

  // Begin stream process.
  try {
    https.get(decodeURIComponent(durl), (response) => {
      // Set Headers
      res.setHeader("Content-Length", response.headers["content-length"]);
      res.setHeader("Content-Disposition", "attachment; filename=video.mp4");
      res.setHeader("Content-Type", "video/mp4");

      // Check status code
      if (response.statusCode >= 400)
        res
          .status(500)
          .json({ name: "Error", message: "Internal Server Error" });

      // Initiate streaming process.
      response.on("data", (chunk) => {
        res.write(chunk);
      });

      response.on("error", (error) => {
        res.status(500).json({ name: error.name, message: error.message });
      });

      response.on("end", () => {
        res.end();
      });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = dlYtVideo;

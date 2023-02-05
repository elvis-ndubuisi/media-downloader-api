const ytdl = require("ytdl-core");
const _ = require("lodash");
const httpErrors = require("http-errors");

/**
 * Gets required data from ytdl-core.
 * @param req sVideo url from request body --  url string
 * @param res Required video info stripped out from the ytdl-core result.
 */
async function youtubeVideoHandler(req, res) {
  if (!req.body.url || ytdl.validateURL(req.body.url) === false)
    res.send("Provide a valid link");

  try {
    const metaInfo = _.pick(
      await ytdl.getInfo(req.body.url),
      "formats",
      "videoDetails"
    );

    const videos = ytdl.filterFormats(metaInfo.formats, "videoandaudio");
    metaInfo.formats = videos.map((format) =>
      _.pick(format, "mimeType", "qualityLabel", "quality", "url", "container")
    );

    metaInfo.videoDetails = _.pick(
      metaInfo.videoDetails,
      "title",
      "lengthSeconds",
      "video_url",
      "thumbnails"
    );

    res.json(metaInfo);
  } catch (err) {
    res.send(err.message);
  }
}

/**
 *  Convert to mp2
 * @param {*} req
 * @param {*} res
 */
async function youtubeMp3Handler(req, res) {}

module.exports = {
  youtubeVideoHandler,
  youtubeMp3Handler,
};

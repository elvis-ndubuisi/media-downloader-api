const ytdl = require("ytdl-core");
const _ = require("lodash");
const httpErrors = require("http-errors");

/**
 * Fetches all video data related to video url passed in request body
 * @param {object} request.body.url youtube url link
 */
async function youtubeVideoHandler(req, res) {
  /* No url value passed in request? */
  if (!req.body.url) httpErrors.BadRequest("Provide a valid youtube link");

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

/**
 * Gets the infomations associated with youtube url
 */
const ytdl = require("ytdl-core");
const httpErrors = require("http-errors");

const infoMedia = async (req, res, next) => {
  const url = req.body.ytLink;
  if (!url) throw httpErrors.BadRequest("youtube url required");

  let response = {};

  try {
    const info = await ytdl.getInfo(url);
    if (!info.formats) httpErrors.NotFound("media info not found");
    response.title = info.videoDetails.title;
    response.lengthInSec = info.videoDetails.lengthSeconds;
    response.thumbnail = info.videoDetails.thumbnails[0];
    response.formats = info.formats
      .filter((format) => format.mimeType.includes("video/mp4"))
      .map((fmt) => {
        return {
          type: fmt.mimeType,
          url: fmt.url,
          qualityLabel: fmt.qualityLabel,
          quality: fmt.quality,
        };
      });
    response.related = info.related_videos
      .map((related) => {
        return {
          id: related.id,
          thumbnail: related.thumbnails[0].url,
          title: related.title,
        };
      })
      .slice(0, 4);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = infoMedia;

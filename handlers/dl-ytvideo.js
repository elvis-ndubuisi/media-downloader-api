const fs = require("fs");
const ytdl = require("ytdl-core");
const http = require("http");

const ytVideo = async (req, res, next) => {
  // Get youtube video info
  let url = "https://www.youtube.com/watch?v=a00NRSFgHsY";
  const info = await ytdl.getInfo(url);

  // Begin download process.
  // http.get(decodeURIComponent(info.formats[1].url), function (response) {
  //   res.setHeader("Content-Length", response.headers["content-length"]);
  //   if (response.statusCode >= 400) res.status(500).send("Error");
  //   response.on("data", function (chunk) {
  //     res.write(chunk);
  //   });
  //   response.on("end"),
  //     function () {
  //       res.send("completed");
  //       res.end();
  //     };
  // });

  http.get(
    decodeURIComponent(info.formats[0].url, (resp) => {
      console.log(resp);
    })
  );
};

module.exports = ytVideo;

// app.get("/download-video", function (req, res) {
//   http.get(decodeURIComponent(req.query.url), function (response) {
//     res.setHeader("Content-Length", response.headers["content-length"]);
//     if (response.statusCode >= 400) res.status(500).send("Error");
//     response.on("data", function (chunk) {
//       res.write(chunk);
//     });
//     response.on("end", function () {
//       res.end();
//     });
//   });
// });

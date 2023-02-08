# Media Downloader API

Social media video/image downloader, youtube video to audio(mp3) converter.

## Clone/Setup Project

- clone project repository
```bash
git clone https://github.com/elvis-ndubuisi/media-downloader-api.git 
```
_you can clone to project but with a different project name_
```bash
git clone https://github.com/elvis-ndubuisi/media-downloader-api.git <custonName-if-you-do-not-want-media-download-api-as-projectName>
```

- change working directory to project's directory

```bash
cd media-downloader-api
```

- Install packages

```bash
npm install
```

- Start dev or main server

```base
npm run dev / npm run start
```

## Issues

Currently, I'm leaving this side project at this stage due to issues I encounted.

### **Download behaviour from frontend.**

Unlike other youtube video downloaders, when this API is used with the front-end, it returns an object containing the video url, title, thumbnail, etc.
which are passed to an anchor tag (looks something like this).

```html
<a href=`${url-from-api} download=`${title-from-api}`>Download Video</a>
```
- Clicking on the link opens a tab or still the same tab, and starts streaming the video without downloading it straigh away
- Downloading the video from the options provided on the display control, downloads the video but sets video file name to 'videoplayback.mp4'

**This issue can be traced to `same-origin` cors issue (since <a download></a> required cors be set to same-origin to init download immediately). Video title MAY BE due to `same-origin`, `Content-disposition` and `Content-Type` headers received by the frontend when it made request to youtube video url.

## Possible fix

- To solve `same-origin` issue, build fullstack with FE and BE running on same port. E.G express + ejs, vite-express, etc.
- You can still seperate your API from frontend (like I did) and use ReadStream API (requires a different API response format and I would not recommend it, especially if you are downloading large files using this method)

ahhh, I thinks that all. Thank you.

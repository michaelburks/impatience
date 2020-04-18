function imp_setPlaybackRate(rate) {
  let videos = document.querySelectorAll("video");
  videos.forEach((vid, _) => {
    vid.playbackRate = rate;
  });
  return (videos.length > 0);
}

function imp_getPlaybackRate() {
  let videos = document.querySelectorAll("video");
  if (videos.length > 0) {
    return videos[0].playbackRate;
  }
  return 1;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("message received:", request.type);
    if (request.type == "get") {
      let rate = imp_getPlaybackRate();
      sendResponse({rate: rate, success: true});
    } else if (request.type == "set") {
      let rate = request.rate;
      let success = imp_setPlaybackRate(rate)
      sendResponse({rate: rate, success: success});
    }
    return true;
});

function connect() {
  let slider = document.querySelector("#imp-slider");
  let connecting = document.querySelector("#imp-connecting");
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type: "get"}, function(response) {
      console.log(response);
      if (response.success == true) {
        slider.style.display = "inline-block";
        slider.value = response.rate;
        connecting.textContent = response.rate;
        attachSlider();
      }
    });
  });
}

function attachSlider() {
  let slider = document.querySelector("#imp-slider");
  let connecting = document.querySelector("#imp-connecting");
  slider.onchange = function(event) {
    let rate = this.value;
    connecting.textContent = rate;
    updatePlaybackRate(rate);
  }
}

function updatePlaybackRate(rate) {
  console.log("updateRate", rate);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {type: "set", rate: rate}, function(response) {
              console.debug(response);
              if (response.success != true) {
                 // Retry
                 console.log("Retry");
                 updatePlaybackRate(rate);
              }
          });
      });
}

connect();

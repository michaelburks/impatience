function connect() {
  let slider = document.querySelector("#imp-slider");
  let status = document.querySelector("#imp-status");
  let buttons = document.querySelector("#imp-buttons");
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type: "get"}, function(response) {
      if (response.success == true) {
        slider.style.display = "block";
        buttons.style.display = "block";
        slider.value = response.rate;
        status.textContent = response.rate + "x";
        status.style.fontSize = "16px";
        attachSlider();
        attachButtons();
      }
    });
  });
}

function attachSlider() {
  let slider = document.querySelector("#imp-slider");
  slider.onchange = function(event) {
    let rate = this.value;
    updatePlaybackRate(rate);
  }
}

function attachButtons() {
  let slider = document.querySelector("#imp-slider");
  let buttons = document.querySelectorAll(".imp-button");
  buttons.forEach((button, _) => {
    button.onclick = function(event) {
      let rate = this.value;
      slider.value = rate;
      updatePlaybackRate(rate);
    }
  });
}

function updatePlaybackRate(rate) {
  let status = document.querySelector("#imp-status");
  status.textContent = rate + "x";
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {type: "set", rate: rate}, function(response) {
              console.debug(response);
              if (response.success != true) {
                 // Retry
                 console.debug("Retry");
                 updatePlaybackRate(rate);
              }
          });
      });
}

connect();

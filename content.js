// Function to send a message to the background script to check the auto joiner status
function checkAutoJoinerStatus() {
  chrome.runtime.sendMessage({ action: 'checkAutoJoinerStatus' }, function(response) {
    if (chrome.runtime.lastError) {
      setTimeout(checkAutoJoinerStatus, 1000);
    } else if (response && response.autoJoinerEnabled) {
      clickPlayButton();
    }
  });
}

// Function to click the Play button
function clickPlayButton() {
  const playButton = document.querySelector('.btn.btn-lg.btn-success.text-ellipsis.flex-grow-1') ||
                     document.querySelector('.btn.btn-lg.btn-success.text-truncate.flex-grow-1') ||
                     document.querySelector('.btn btn-lg btn-success text-truncate flex-grow-1');
  
  if (playButton) {
    playButton.click();
  }
}

// Check and click the Play button every 3 seconds
setInterval(checkAutoJoinerStatus, 3000);

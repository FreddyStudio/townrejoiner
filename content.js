// Function to send a message to the background script to check the auto joiner status
function checkAutoJoinerStatus() {
  chrome.runtime.sendMessage({ action: 'checkAutoJoinerStatus' }, function(response) {
    if (chrome.runtime.lastError) {
      console.error('Runtime error:', chrome.runtime.lastError);
      setTimeout(checkAutoJoinerStatus, 1000); // Retry after 1 second
    } else if (response && response.autoJoinerEnabled) {
      clickPlayButton();
    }
  });
}

// Function to click the Play button
function clickPlayButton() {
  // Select the Play button using a more general selector
  const playButton = document.querySelector('.btn.btn-lg.btn-success.text-ellipsis.flex-grow-1') ||
                     document.querySelector('.btn.btn-lg.btn-success.text-truncate.flex-grow-1') ||
                     document.querySelector('.btn btn-lg btn-success text-truncate flex-grow-1');
  
  // If the Play button exists, click it
  if (playButton) {
    playButton.click();
    console.log('Play button clicked');
  }
}

// Check and click the Play button every 3 seconds
setInterval(checkAutoJoinerStatus, 3000);

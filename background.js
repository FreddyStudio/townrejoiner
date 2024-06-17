// Function to execute content script on specified tabs
function checkAndClick() {
  const urlsToMonitor = [
    "https://test.pixel.horse/*",
    "https://pony.town/*"
  ];

  urlsToMonitor.forEach(urlPattern => {
    chrome.tabs.query({ url: urlPattern }, function(tabs) {
      tabs.forEach(tab => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content.js']
        });

        // Store the active URLs
        chrome.storage.local.set({ [urlPattern]: tab.url });
      });
    });
  });
}

// Set an alarm to run the checkAndClick function every 5 minutes
chrome.alarms.create("rejoinGame", { periodInMinutes: 5 });

// Add a listener for the alarm
chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === "rejoinGame") {
    checkAndClick();
  }
});

// Initial check when the extension is installed or reloaded
checkAndClick();

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'checkAutoJoinerStatus') {
    // Check the auto joiner status and respond
    chrome.storage.local.get(['autoJoinerEnabled'], function(result) {
      sendResponse({ autoJoinerEnabled: result.autoJoinerEnabled !== false });
    });
    return true; // Indicate that the response is asynchronous
  }
});

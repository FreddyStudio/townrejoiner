function checkAndClick() {
  const urlsToMonitor = [
    "https://test.pixel.horse/*",
    "https://event.pony.town/*",
    "https://building.pony.town/*",
    "https://pony.town/*"
  ];

  urlsToMonitor.forEach(urlPattern => {
    chrome.tabs.query({ url: urlPattern }, function(tabs) {
      tabs.forEach(tab => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content.js']
        });

        chrome.storage.local.set({ [urlPattern]: tab.url });
      });
    });
  });
}

chrome.alarms.create("rejoinGame", { periodInMinutes: 5 });

chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === "rejoinGame") {
    checkAndClick();
  }
});

checkAndClick();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'checkAutoJoinerStatus') {
    chrome.storage.local.get(['autoJoinerEnabled'], function(result) {
      sendResponse({ autoJoinerEnabled: result.autoJoinerEnabled !== false });
    });
    return true; 
  }
});

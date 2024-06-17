document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('toggle');
  
    // Load the current state of the toggle
    chrome.storage.local.get('autoJoinerEnabled', function(result) {
      console.log('Storage result:', result);
      toggle.checked = result.autoJoinerEnabled !== false; // Default to enabled
    });
  
    // Save the state of the toggle immediately when changed
    toggle.addEventListener('change', function() {
      chrome.storage.local.set({ autoJoinerEnabled: toggle.checked }, function() {
        console.log('Auto Joiner state saved:', toggle.checked);
      });
    });
  });
  
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('toggle');
  
    chrome.storage.local.get('autoJoinerEnabled', function(result) {
      toggle.checked = result.autoJoinerEnabled !== false;
    });
  
    toggle.addEventListener('change', function() {
      chrome.storage.local.set({ autoJoinerEnabled: toggle.checked }, function() {
      });
    });
  });

console.log('Background script running!');

// TOGGLE ACTION
chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, 'toggle');
});

// MESSAGE MIDDLEMAN BETWEEN POPUP AND CONTENT SCRIPTS
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, request, ({ data }) => {
      if (data) {
        sendResponse({ data });
      }
    });
  });

  return true;
});

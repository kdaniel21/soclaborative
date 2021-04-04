console.log('Background script running!');

// TOGGLE ACTION
chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, 'toggle');
});

// MESSAGE MIDDLEMAN BETWEEN POPUP AND CONTENT SCRIPTS
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(`New ${request.type} message!`);
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, request, () => {
      console.log(`Forwarded message!`);
    });
  });

  return true;
});

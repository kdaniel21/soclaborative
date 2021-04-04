console.log('Background script running!');

chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, 'toggle');
});

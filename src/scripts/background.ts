chrome.browserAction.onClicked.addListener(tab => {
  console.log('message sent');
  chrome.tabs.sendMessage(tab.id, 'toggle');
});

chrome.tabs.onCreated.addListener(tab => {
  console.log('tab created');
});

console.log('background running');

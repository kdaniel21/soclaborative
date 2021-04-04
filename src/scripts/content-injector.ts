chrome.runtime.onMessage.addListener((message, sender) => {
  console.log('received message', message);
  if (message === 'toggle') {
    togglePopup();
  }
});

const iframe = document.createElement('iframe');
iframe.style.background = 'green';
iframe.style.height = '100%';
iframe.style.width = '0px';
iframe.style.position = 'fixed';
iframe.style.top = '0px';
iframe.style.right = '0px';
iframe.style.zIndex = '9000000000000000000';
iframe.src = chrome.extension.getURL('index.html');

const togglePopup = () => {
  document.body.appendChild(iframe);

  const currentWidth = iframe.style.width;
  const widthToSet = currentWidth === '0px' ? '400px' : '0px';

  iframe.style.width = widthToSet;
};

console.log('content injector running');

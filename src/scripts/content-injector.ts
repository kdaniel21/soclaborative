console.log('Content injector running!');

chrome.runtime.onMessage.addListener((message) => {
  if (message === 'toggle') {
    togglePopup();
  }
});

const normalWidth = '350px';

const iframe = document.createElement('iframe');
iframe.style.background = 'white';
iframe.style.height = '100%';
iframe.style.width = '0px';
iframe.style.position = 'fixed';
iframe.style.top = '0px';
iframe.style.right = '0px';
iframe.style.zIndex = '9000000000000000000';
iframe.src = chrome.extension.getURL('index.html');

const togglePopup = () => {
  document.body.append(iframe);

  const currentWidth = iframe.style.width;
  const widthToSet = currentWidth === '0px' ? normalWidth : '0px';

  const app = document.body.firstElementChild as HTMLElement;
  app.style.marginRight = widthToSet;

  iframe.style.width = widthToSet;
};

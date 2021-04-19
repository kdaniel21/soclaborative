console.log('Content injector running!');

const IFRAME_WIDTH = '350px';

chrome.runtime.onMessage.addListener((message) => {
  if (message === 'toggle') {
    togglePopup();
  }
});

let isOpen = false;

const togglePopup = (): void => {
  const action = isOpen ? removeIframe : createIframe;

  action();

  isOpen = !isOpen;
};

const createIframe = () => {
  const iframe = document.createElement('iframe');
  iframe.style.background = 'white';
  iframe.style.height = '100%';
  iframe.style.width = IFRAME_WIDTH;
  iframe.style.position = 'fixed';
  iframe.style.top = '0px';
  iframe.style.right = '0px';
  iframe.style.zIndex = '9000000000000000000';
  iframe.src = chrome.extension.getURL('index.html');
  iframe.id = 'soclaborative';

  document.body.append(iframe);

  const app = document.body.firstElementChild as HTMLElement;
  app.style.marginRight = IFRAME_WIDTH;
};

const removeIframe = () => {
  const iframe = document.querySelector('iframe#soclaborative');
  iframe.remove();

  const app = document.body.firstElementChild as HTMLElement;
  app.style.marginRight = '0';
};

import { defaultObserverConfig } from './default-observer-config';
import { initQuestionObserver } from './questions-observer';
import { initSubmitObserver } from './submit-observer';

// INITIAL OBSERVER
const body = document.documentElement;

const callback = (_, obs: MutationObserver) => {
  console.log('DOM changed');
  const hasQuizStarted = hasQuestionBeenLoaded();
  if (!hasQuizStarted) {
    return;
  }

  initQuestionObserver();
  initSubmitObserver();
  obs.disconnect();
};

const initialObserver = new MutationObserver(callback);
initialObserver.observe(body, defaultObserverConfig);

const hasQuestionBeenLoaded = (): boolean => {
  const questionContainer = document.querySelector('.question-text');
  const questionText = questionContainer?.firstChild?.firstChild.textContent;

  return !!questionContainer && !!questionText;
};

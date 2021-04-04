import { defaultObserverConfig } from './default-observer-config';
import { QuestionChangedEvent } from './events';

// QUESTIONS OBSERVER
let latestQuestion: string;

export const initQuestionObserver = (): void => {
  console.log('Initializing questions observer...');

  const questionContainer = document.querySelector('.question-text');
  const questionContainerNode = questionContainer.getRootNode();

  const questionObserver = new MutationObserver(questionObserverCallback);
  questionObserver.observe(questionContainerNode, defaultObserverConfig);

  questionObserverCallback();
};

const questionObserverCallback = (): void => {
  const questionContainer = document.querySelector('.question-text');
  const questionText = questionContainer?.firstChild?.firstChild.textContent;

  if (!questionText || questionText === latestQuestion) {
    return;
  }

  latestQuestion = questionText;
  onQuestionChanged(questionText);
};

const onQuestionChanged = (newQuestionText: string) => {
  console.log(`Question changed to ${newQuestionText}`);

  const event = new QuestionChangedEvent({ text: newQuestionText });

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, event, (res) => {
      console.log(`QuestionChanged message sent!`, res);
    });
  });
};

import { defaultObserverConfig } from './default-observer-config';
import { EventType, QuestionChangeEvent } from './events';

// QUESTIONS OBSERVER
let currentQuestion: string;

export const initQuestionObserver = (): void => {
  console.log('Initializing questions observer...');

  initCurrentQuestionListener();

  const questionContainer = document.querySelector('.question-text');
  const questionContainerNode = questionContainer.getRootNode();

  const questionObserver = new MutationObserver(questionObserverCallback);
  questionObserver.observe(questionContainerNode, defaultObserverConfig);

  questionObserverCallback();
};

const questionObserverCallback = (): void => {
  const questionContainer = document.querySelector('.question-text');
  const questionText = questionContainer?.firstChild?.firstChild.textContent;

  // Note: We don't want to show a "no question" page to the user while the feedback modal is open
  const hasFeedbackModal = isFeedbackModalOpen();

  if (hasFeedbackModal || questionText === currentQuestion) {
    return;
  }

  currentQuestion = questionText;
  onQuestionChanged(questionText);
};

const onQuestionChanged = (newQuestionText: string) => {
  console.log(`Question changed to ${newQuestionText}`);

  const event = new QuestionChangeEvent({ text: newQuestionText });

  chrome.runtime.sendMessage(event, () => console.log(`QuestionChanged message sent!`));
};

const initCurrentQuestionListener = () => {
  console.log('Current question listener initialized...');

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request?.type === EventType.currentQuestionQuery) {
      return onQuestionChanged(currentQuestion);
    }
  });
};

const isFeedbackModalOpen = (): boolean => {
  const feedbackPopup = document.querySelector('#feedback-popup.open');
  const hasFeedbackPopup = !!feedbackPopup;

  return hasFeedbackPopup;
};

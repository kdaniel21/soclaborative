import { defaultObserverConfig } from './default-observer-config';

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
};

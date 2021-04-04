import { defaultObserverConfig } from './default-observer-config';
import { SubmitAnswerEvent } from './events';

export const initSubmitObserver = () => {
  console.log('Initializing answer & feedback observer...');

  const body = document.documentElement;

  const bodyObserver = new MutationObserver(bodyObserverCallback);
  bodyObserver.observe(body, defaultObserverConfig);

  bodyObserverCallback();
};

const bodyObserverCallback = () => {
  const feedbackPopup = document.querySelector('#feedback-popup.open');
  const hasFeedbackPopup = !!feedbackPopup;
  if (hasFeedbackPopup) {
    onFeedbackReceived();
    return;
  }

  const submitButton = document.querySelector('#submit-button');
  const hasSubmitButton = !!submitButton;

  if (hasSubmitButton) {
    submitButton.addEventListener('click', onSubmitClicked);
    return;
  }
};

const onFeedbackReceived = () => {
  const feedbackPopup = document.querySelector('#feedback-popup.open');
  const correctAnswerWrapper = feedbackPopup.querySelector('.answer');
  const correctAnswerText = correctAnswerWrapper?.firstChild.textContent;

  submitAnswer(correctAnswerText, true);
};

const onSubmitClicked = (): void => {
  const isMultiSelect = !!document.querySelector('.mc-answer-option.selected');

  const submittedAnswer = isMultiSelect ? getSelectedOption() : getAnswerFromTextarea();

  submitAnswer(submittedAnswer);
};

const getSelectedOption = (): string => {
  const selectedOption = document.querySelector('.mc-answer-option.selected');
  const selectedAnswerWrapper = selectedOption.querySelector('.mc-answer-option-text');
  const selectedAnswerText = selectedAnswerWrapper.firstChild?.firstChild?.textContent;

  return selectedAnswerText;
};

const getAnswerFromTextarea = (): string => {
  const answerTextareaWrapper = document.querySelector('.question-answer-container');
  const answerTextarea = answerTextareaWrapper.querySelector('textarea');
  const answerText = answerTextarea.value;

  return answerText;
};

const submitAnswer = (answerText: string, isValidated: boolean = false): void => {
  console.log(`Submitting answer ${answerText} (validated: ${isValidated})`);

  const event = new SubmitAnswerEvent({ text: answerText, isValidated });

  chrome.runtime.sendMessage(event, (res) => console.log(`SubmitAnswer message sent!`, res));
};

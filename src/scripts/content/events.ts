const QUESTION_CHANGED = 'Question Changed';
export class QuestionChangedEvent {
  public msg = QUESTION_CHANGED;

  constructor(public data: { text: string }) {}
}

const SUBMIT_ANSWER = 'Submit Answer';
export class SubmitAnswerEvent {
  public msg = SUBMIT_ANSWER;

  constructor(public data: { text: string; isValidated: boolean }) {}
}

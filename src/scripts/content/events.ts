export interface ContentEvent {
  type: EventType;
  data: { [key: string]: any; text: string };
}

export enum EventType {
  questionChange = 'QUESTION_CHANGE',
  submitAnswer = 'SUBMIT_ANSWER',
}

export class QuestionChangeEvent implements ContentEvent {
  public type = EventType.questionChange;

  constructor(public data: { text: string }) {}
}

export class SubmitAnswerEvent implements ContentEvent {
  public type = EventType.submitAnswer;

  constructor(public data: { text: string; isValidated: boolean }) {}
}

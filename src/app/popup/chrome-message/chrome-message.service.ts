import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { SubmitAnswerGQL } from 'src/generated/graphql';
import { ContentEvent, EventType } from 'src/scripts/content/events';

@Injectable({
  providedIn: 'root',
})
export class ChromeMessageService {
  onMessage: Observable<ContentEvent> = new Observable((observer) =>
    chrome.runtime.onMessage.addListener((request) => {
      this.ngZone.run(() => observer.next(request));
    })
  );

  currentQuestion$ = this.onMessage.pipe(
    filter((res) => res.type === EventType.questionChange),
    map((res) => res.data.text)
  );

  answerSubmit$ = this.onMessage.pipe(
    filter((res) => res.type === EventType.submitAnswer),
    map((res) => res.data),
    withLatestFrom(this.currentQuestion$),
    debounceTime(300),
    switchMap(([{ text, isValidated = false }, currentQuestion]) =>
      this.submitAnswerGQL.mutate({ question: currentQuestion, answer: text, isValidated })
    )
  );

  constructor(private submitAnswerGQL: SubmitAnswerGQL, private ngZone: NgZone) {}

  sendMessage(event: ContentEvent): Observable<void> {
    return new Observable((observer) =>
      chrome.runtime.sendMessage(event, () =>
        this.ngZone.run(() => {
          observer.next();
          observer.complete();
        })
      )
    );
  }
}

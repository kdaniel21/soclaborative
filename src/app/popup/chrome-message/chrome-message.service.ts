import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ContentEvent, EventType } from 'src/scripts/content/events';

@Injectable({
  providedIn: 'root',
})
export class ChromeMessageService {
  onMessage: Observable<ContentEvent> = new Observable((observer) => {
    chrome.runtime.onMessage.addListener((request) => {
      observer.next(request);
    });
  });

  currentQuestion = this.onMessage.pipe(
    filter((res) => res.type === EventType.questionChange),
    map((res) => res.data.text)
  );

  constructor() {}
}

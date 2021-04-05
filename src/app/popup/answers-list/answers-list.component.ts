import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, merge, Observable, Subscription } from 'rxjs';
import { map, scan, switchMap } from 'rxjs/operators';
import {
  Answer,
  GetAnswersGQL,
  GetParticipantsGQL,
  NewAnswerGQL,
  NewParticipantGQL,
  Participant,
  QuestionParticipantChangeAction,
} from 'src/generated/graphql';
import { CurrentQuestionQueryEvent } from 'src/scripts/content/events';
import { ChromeMessageService } from '../chrome-message/chrome-message.service';

@Component({
  selector: 'app-answers-list',
  templateUrl: './answers-list.component.html',
  styleUrls: ['./answers-list.component.scss'],
})
export class AnswersListComponent implements OnInit, OnDestroy {
  answerSubmitSubscription: Subscription;

  currentQuestion$ = this.chromeMessageService.currentQuestion$;

  answers$: Observable<Answer[]> = this.currentQuestion$.pipe(
    switchMap((questionText) =>
      merge(
        this.getAnswersGQL.fetch({ questionText }).pipe(map((res) => res.data.getAnswersByText)),
        this.newAnswerGQL.subscribe().pipe(map((res) => res.data.newQuestionAnswer))
      )
    ),
    scan((acc, answer) => (Array.isArray(answer) ? [...answer] : [...acc, answer]), [])
  );

  participants$: Observable<Participant[]> = this.currentQuestion$.pipe(
    switchMap((question) =>
      merge(
        this.getParticipantsGQL.fetch({ question }).pipe(map((res) => res.data.getQuestionParticipants)),
        this.newParticipantGQL.subscribe().pipe(map((res) => res.data.newQuestionParticipant))
      )
    ),
    scan((acc, participant) => {
      if (Array.isArray(participant)) {
        return [...participant];
      }

      if (participant.action === QuestionParticipantChangeAction.Join) {
        return [...acc, participant];
      }

      return acc.filter((addedParticipant) => addedParticipant.participantName !== participant.participantName);
    }, [])
  );

  combinedAnswers$ = combineLatest([this.answers$, this.participants$]).pipe(
    map(([answers, participants]) => [...answers, ...participants])
  );

  constructor(
    public chromeMessageService: ChromeMessageService,
    private getAnswersGQL: GetAnswersGQL,
    private getParticipantsGQL: GetParticipantsGQL,
    private newAnswerGQL: NewAnswerGQL,
    private newParticipantGQL: NewParticipantGQL
  ) {}

  ngOnInit() {
    this.chromeMessageService.answerSubmit$.subscribe();
    this.chromeMessageService.sendMessage(new CurrentQuestionQueryEvent()).subscribe();
  }

  ngOnDestroy() {
    if (this.answerSubmitSubscription) {
      this.answerSubmitSubscription.unsubscribe();
    }
  }
}

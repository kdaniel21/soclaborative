import { ChangeDetectorRef, Component } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map, switchMap, takeLast, tap } from 'rxjs/operators';
import { GetAnswersGQL, GetParticipantsGQL } from 'src/generated/graphql';
import { ChromeMessageService } from '../chrome-message/chrome-message.service';

@Component({
  selector: 'app-answers-list',
  templateUrl: './answers-list.component.html',
  styleUrls: ['./answers-list.component.scss'],
})
export class AnswersListComponent {
  // sampleData = [
  //   {
  //     participantName: 'Daniel',
  //     answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, dicta!',
  //     isValidated: true,
  //   },
  //   {
  //     participantName: 'Daniel',
  //     answer: 'Lorem ipsum dolor Ratione, dicta!',
  //     isValidated: true,
  //   },
  //   {
  //     participantName: 'Daniel',
  //     answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  //     isValidated: true,
  //     isLoading: true,
  //   },
  // ];
  // sampleData = [];

  currentQuestion$ = this.chromeMessageService.currentQuestion.pipe(
    tap(() => {
      this.changeDetectorRef.detectChanges();
    })
  );

  answers$ = this.currentQuestion$.pipe(
    // takeLast(1),
    tap((res) => console.log('curre', res)),
    switchMap((currentQuestion) => this.getAnswersGQL.fetch({ questionText: currentQuestion })),
    map((res) => res.data.getAnswersByText)
  );

  participants$ = this.currentQuestion$.pipe(
    // takeLast(1),
    switchMap((currentQuestion) => this.getParticipantsGQL.fetch({ question: currentQuestion })),
    map((res) => res.data.getQuestionParticipants)
  );

  answersAndParticipants$ = combineLatest([this.answers$, this.participants$]);

  constructor(
    public chromeMessageService: ChromeMessageService,
    private changeDetectorRef: ChangeDetectorRef,
    private getAnswersGQL: GetAnswersGQL,
    private getParticipantsGQL: GetParticipantsGQL
  ) {}
}

import { Component, Input } from '@angular/core';
import { GetAnswersQuery, GetParticipantsQuery } from 'src/generated/graphql';

@Component({
  selector: 'app-answer-item',
  templateUrl: './answer-item.component.html',
  styleUrls: ['./answer-item.component.scss'],
})
export class AnswerItemComponent {
  @Input() answer:
    | GetParticipantsQuery['getQuestionParticipants'][number]
    | GetAnswersQuery['getAnswersByText'][number];

  constructor() {}
}

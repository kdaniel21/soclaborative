import { Component, Input } from '@angular/core';
import { GetAnswersQuery } from 'src/generated/graphql';

@Component({
  selector: 'app-answer-item',
  templateUrl: './answer-item.component.html',
  styleUrls: ['./answer-item.component.scss'],
})
export class AnswerItemComponent {
  @Input() answer:
    Partial<GetAnswersQuery['getAnswersByText'][number]>;

  constructor() { }

  get isLoading(): boolean {
    return !this.answer.text;
  }
}

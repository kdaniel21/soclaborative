import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { JoinComponent } from './join/join.component';
import { PopupTaigaModule } from './popup-taiga.module';
import { PopupRoutingModule } from './popup-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';
import { AnswersListComponent } from './answers-list/answers-list.component';
import { AnswerItemComponent } from './answers-list/answer-item/answer-item.component';

@NgModule({
  declarations: [NavbarComponent, JoinComponent, CreateComponent, AnswersListComponent, AnswerItemComponent],
  imports: [
    CommonModule,
    PopupRoutingModule,
    PopupTaigaModule,
    ReactiveFormsModule,
  ],
  exports: [NavbarComponent],
})
export class PopupModule {}

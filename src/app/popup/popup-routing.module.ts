import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnswersListComponent } from './answers-list/answers-list.component';
import { CreateComponent } from './create/create.component';
import { JoinComponent } from './join/join.component';

const routes: Routes = [
  { path: '', redirectTo: 'listening', pathMatch: 'full' },
  { path: 'join', component: JoinComponent },
  { path: 'create', component: CreateComponent },
  { path: 'listening', component: AnswersListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopupRoutingModule {}

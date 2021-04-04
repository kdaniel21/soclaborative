import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnswersListComponent } from './answers-list/answers-list.component';
import { AuthorizedOnlyGuard } from './authorization/authorized-only.guard';
import { UnauthorizedOnlyGuard } from './authorization/unauthorized-only.guard';
import { CreateComponent } from './create/create.component';
import { JoinComponent } from './join/join.component';

const routes: Routes = [
  { path: '', redirectTo: 'join', pathMatch: 'full' },
  { path: 'join', component: JoinComponent, canActivate: [UnauthorizedOnlyGuard] },
  { path: 'create', component: CreateComponent, canActivate: [UnauthorizedOnlyGuard] },
  { path: 'collaborate', component: AnswersListComponent, canActivate: [AuthorizedOnlyGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopupRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { JoinComponent } from './join/join.component';

const routes: Routes = [
  { path: '', redirectTo: 'join', pathMatch: 'full' },
  { path: 'join', component: JoinComponent },
  { path: 'create', component: CreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopupRoutingModule {}

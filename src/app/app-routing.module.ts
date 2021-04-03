import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'popup', pathMatch: 'full' },
  {
    path: 'popup',
    loadChildren: () =>
      import('./popup/popup.module').then((m) => m.PopupModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

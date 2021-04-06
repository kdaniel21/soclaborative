import { Component } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';

@Component({
  selector: 'app-root',
  template: `
    <tui-root>
      <app-navbar></app-navbar>

      <div class="tui-space_bottom-3 tui-space_horizontal-3">
        <tui-notification
          *ngIf="error$ | async as error"
          class="tui-space_bottom-4"
          status="error"
        >
          {{ error }}
        </tui-notification>

        <router-outlet></router-outlet>
      </div>
    </tui-root>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  error$ = this.errorHandlerService.errors$;

  constructor(private errorHandlerService: ErrorHandlerService) {}
}

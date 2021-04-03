import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <tui-root>
      <app-navbar></app-navbar>

      <div class="tui-space_bottom-3 tui-space_horizontal-3">
        <router-outlet></router-outlet>
      </div>
    </tui-root>
  `,
  styles: [
    `
      tui-root {
        width: 500px;
        height: 350px;
        overflow-x: hidden;
      }
    `,
  ],
})
export class AppComponent {
  title = 'socrative-collab';
}

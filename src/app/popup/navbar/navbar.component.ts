import { Component } from '@angular/core';
import { AuthorizationService } from '../authorization/authorization.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(public authorizationService: AuthorizationService) {}

  onLeaveRoom() {
    this.authorizationService.leaveRoom().subscribe();
  }
}

import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthorizationService } from '../authorization/authorization.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isAuthenticated$ = this.authorizationService.isAuthenticated$;
  roomName$ = this.authorizationService.participant$.pipe(map((participant) => participant.roomName));

  constructor(public authorizationService: AuthorizationService) {}

  onLeaveRoom() {
    this.authorizationService.leaveRoom().subscribe();
  }
}

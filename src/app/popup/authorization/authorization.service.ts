import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { catchError, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { GetParticipantGQL, JoinRoomGQL } from 'src/generated/graphql';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  refreshParticipantSubject = new BehaviorSubject<void>(undefined);

  participant$ = this.refreshParticipantSubject.pipe(
    tap(() => console.log('refresh')),
    switchMap(() => from(this.apollo.client.resetStore())),
    switchMap(() => this.getParticipantGQL.fetch(null, { fetchPolicy: 'network-only' })),
    tap((res) => console.log('res1', res)),
    map((res) => res.data.getParticipant),
    // catchError(() => of(undefined)),
    tap((res) => console.log('result', res))
  );

  isAuthenticated$ = this.participant$.pipe(map((participant) => !!participant));

  constructor(
    private getParticipantGQL: GetParticipantGQL,
    private joinRoomGQL: JoinRoomGQL,
    private storageService: StorageService,
    private router: Router,
    private apollo: Apollo
  ) {}

  joinRoom(roomCode: string, name: string) {
    return this.joinRoomGQL.mutate({ name, code: roomCode }).pipe(
      map((res) => res.data.joinRoom.jwtToken),
      switchMap((jwtToken) => this.storageService.set({ name, jwtToken })),
      tap(() => this.refreshParticipantSubject.next()),
      tap(() => this.router.navigate(['/collaborate']))
    );
  }

  leaveRoom(): Observable<void> {
    return this.storageService.remove('jwtToken').pipe(
      tap(() => this.refreshParticipantSubject.next())
      // tap(() => this.router.navigate(['/']))
    );
  }
}

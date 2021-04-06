import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, forkJoin, from, NEVER, Observable } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { restartWebsockets } from 'src/app/graphql.module';
import { GetParticipantGQL, JoinRoomGQL, Participant } from 'src/generated/graphql';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  participantSubject = new BehaviorSubject<Participant>(undefined);
  participant$: Observable<Participant> = this.participantSubject.asObservable();
  get participant(): Participant {
    return this.participantSubject.value;
  }

  isAuthenticatedSubject = new BehaviorSubject(false);
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  constructor(
    private getParticipantGQL: GetParticipantGQL,
    private joinRoomGQL: JoinRoomGQL,
    private storageService: StorageService,
    private router: Router,
    private apollo: Apollo
  ) {
    this.storageService
      .get('jwtToken')
      .pipe(
        switchMap((jwtToken) => (jwtToken ? this.getParticipantGQL.fetch() : NEVER)),
        tap((res) => {
          this.participantSubject.next(res.data.getParticipant);
          this.isAuthenticatedSubject.next(true);
          this.router.navigate(['/collaborate']);
        }),
        catchError(() => NEVER)
      )
      .subscribe();
  }

  joinRoom(roomCode: string, name: string) {
    return this.joinRoomGQL.mutate({ name, code: roomCode }).pipe(
      map((res) => res.data.joinRoom.jwtToken),
      switchMap((jwtToken) =>
        forkJoin([this.storageService.set({ name, jwtToken }), from(this.apollo.client.cache.reset())])
      ),
      switchMap(() => this.getParticipantGQL.fetch(null, { fetchPolicy: 'network-only' })),
      map((res) => res.data.getParticipant),
      tap((participant) => {
        restartWebsockets();

        this.participantSubject.next(participant);
        this.isAuthenticatedSubject.next(true);

        this.router.navigate(['/collaborate']);
      })
    );
  }

  leaveRoom(): Observable<void> {
    return this.storageService.remove('jwtToken').pipe(
      tap(() => {
        this.isAuthenticatedSubject.next(false);
        this.router.navigate(['/']);
      })
    );
  }
}

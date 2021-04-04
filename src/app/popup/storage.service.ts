import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage = chrome.storage.sync;

  constructor(private ngZone: NgZone) {}

  get(key?: string): Observable<any> {
    return new Observable((observer) =>
      this.ngZone.run(() =>
        this.storage.get(key, (data) => {
          observer.next(data[key]);
          observer.complete();
        })
      )
    );
  }

  set(data: any): Observable<void> {
    return new Observable((observer) =>
      this.ngZone.run(() =>
        this.storage.set(data, () => {
          observer.next();
          observer.complete();
        })
      )
    );
  }

  remove(key: string): Observable<void> {
    return new Observable((observer) =>
      this.ngZone.run(() =>
        this.storage.remove(key, () => {
          observer.next();
          observer.complete();
        })
      )
    );
  }
}

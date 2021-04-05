import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage = this.ngZone.run(() => chrome.storage.sync);

  constructor(private ngZone: NgZone) {}

  get(key?: string): Observable<any> {
    return new Observable((observer) =>
      this.storage.get(key, (data) =>
        this.ngZone.run(() => {
          observer.next(data[key]);
          observer.complete();
        })
      )
    );
  }

  set(data: any): Observable<void> {
    return new Observable((observer) =>
      this.storage.set(data, () =>
        this.ngZone.run(() => {
          observer.next();
          observer.complete();
        })
      )
    );
  }

  remove(key: string): Observable<void> {
    return new Observable((observer) =>
      this.storage.remove(key, () =>
        this.ngZone.run(() => {
          observer.next();
          observer.complete();
        })
      )
    );
  }
}

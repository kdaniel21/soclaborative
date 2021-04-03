import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private syncStorage = browser.storage.sync;

  constructor() {}

  get(key: string): Observable<any> {
    return from(this.syncStorage.get(key)).pipe(map((res) => res[key]));
  }

  set(data: any): Observable<void> {
    return from(this.syncStorage.set(data));
  }

  remove(key: string): Observable<void> {
    return from(this.syncStorage.remove(key));
  }
}

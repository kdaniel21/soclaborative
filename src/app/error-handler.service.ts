/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

const ERROR_MESSAGES = {
  INVALID_ROOM_CODE: 'This code is invalid or expired. Please try again!',
  NAME_ALREADY_TAKEN: 'This name is already taken in this room. Please choose another one!',
  NETWORK_ERROR: 'Cannot communicate with the server. Please check your internet connection and try again!',
  DEFAULT: 'Something went wrong. Please try again!',
};

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  static errorsSubject = new Subject<string>();

  hideErrorMessage$: Observable<undefined> = ErrorHandlerService.errorsSubject.pipe(
    debounceTime(4000),
    map(() => undefined)
  );

  errors$: Observable<string | undefined> = merge(ErrorHandlerService.errorsSubject, this.hideErrorMessage$).pipe(
    map((errorCode) => (errorCode ? ERROR_MESSAGES[errorCode] || ERROR_MESSAGES[errorCode] : undefined))
  );

  constructor() {}
}

import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthorizationService } from './authorization.service';

@Injectable({ providedIn: 'root' })
export class UnauthorizedOnlyGuard implements CanActivate {
  constructor(private authorizationService: AuthorizationService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authorizationService.isAuthenticated$.pipe(
      map((isAuthenticated) => (isAuthenticated ? this.router.createUrlTree(['/collaborate']) : true))
    );
  }
}

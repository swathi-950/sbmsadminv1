import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGaurdService implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.auth.getJwtToken();
    if (currentUser != null) {
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/signIn']);
    return false;
  }

}

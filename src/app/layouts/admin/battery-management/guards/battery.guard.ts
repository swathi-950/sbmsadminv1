import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { env_permissions } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BatteryGuard implements CanActivate {

  private permissions: any[] = [];

  constructor(private router: Router,
    private auth: AuthenticationService) {
    this.permissions = this.auth.permissions.value;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if (this.permissions.length != 0) {
      if (this.permissions.includes(env_permissions.create_battery)) {
        return true;
      } else {
        this.navigate();
        return false;
      }
    }
    this.navigate();
    return false;
  }

  navigate() {
    this.router.navigate(['signIn']);
  }


}

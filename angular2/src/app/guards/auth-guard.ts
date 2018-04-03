
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}

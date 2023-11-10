import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { of } from 'rxjs';
import { LoginService } from '../services/auth-services/login-service.service';
import { LoginUtils } from '../utils/login-utils';
@Injectable({
  providedIn: 'root',
})
export class AdminGuard {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('checking admin');
    if (
      !LoginUtils.getToken() ||
      LoginUtils.getToken() == null ||
      LoginUtils.getToken() == 'Anonymous'
    ) {
      this.router.navigateByUrl('/unauthorized');
      return of(false);
    }

    return this.loginService.isAdmin();
  }
}

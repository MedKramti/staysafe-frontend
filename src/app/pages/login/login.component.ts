import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthRequest,
  AuthResponse,
  LoginService,
} from 'src/app/services/auth-services/login-service.service';
import { LoginUtils } from 'src/app/utils/login-utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  errorMessage: string = '';
  constructor(private loginService: LoginService, private router: Router) {}

  login(loginInput: AuthRequest) {
    LoginUtils.clearToken();
    this.errorMessage = '';
    this.loginService.login(loginInput).subscribe({
      next: (data: AuthResponse) => {
        LoginUtils.saveToken(data.token);
        this.router.navigate(['/', 'home']);
      },
      error: (err) => {
        this.errorMessage = 'Invalid username or password';
      },
    });
  }

  anonymousLogin() {
    LoginUtils.saveToken('Anonymous');
    this.router.navigate(['/', 'home']);
  }
}

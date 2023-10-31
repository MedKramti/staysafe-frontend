import { Component } from '@angular/core';
import {
  AuthRequest,
  AuthResponse,
  LoginService,
} from 'src/app/services/login-service.service';
import { LoginUtils } from 'src/app/utils/login-utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  errorMessage: string = '';
  constructor(private loginService: LoginService) {}

  login(loginInput: AuthRequest) {
    this.errorMessage = '';
    this.loginService.login(loginInput).subscribe({
      next: (data: AuthResponse) => {
        LoginUtils.saveToken(data.token);
      },
      error: (err) => {
        if (err.status === 401)
          this.errorMessage = 'Invalid username or password';
        else this.errorMessage = 'System error please contact administrator';
      },
    });
  }
}

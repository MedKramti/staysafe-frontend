import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { default as configuration } from './../../configuration.json';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private authServer: string = configuration['auth-server'];
  constructor(private http: HttpClient) {}

  public login(loginInput: AuthRequest) {
    return this.http.post<AuthResponse>(
      this.authServer + '/api/login',
      loginInput
    );
  }
}
export interface AuthRequest {
  username: string;
  password: string;
}
export interface AuthResponse {
  token: string;
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { default as configuration } from '../../../configuration.json';
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

  public isAdmin(): Observable<boolean> {
    return this.http.get<boolean>(this.authServer + '/api/login/is-admin');
  }
}
export interface AuthRequest {
  username: string;
  password: string;
}
export interface AuthResponse {
  token: string;
}

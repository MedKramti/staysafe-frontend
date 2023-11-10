import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { default as configuration } from '../../../configuration.json';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private authServer: string = configuration['auth-server'];
  constructor(private http: HttpClient) {}

  public register(registerInfo: RegisterRequest) {
    return this.http.post(this.authServer + '/api/register', registerInfo);
  }
}

export interface RegisterRequest {
  username: string;
  password: string;
  confirmPassword: string;
}

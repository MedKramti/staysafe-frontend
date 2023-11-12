import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private authServer: string = environment.AUTHSERVER_SERVER;
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

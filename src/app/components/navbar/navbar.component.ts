import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth-services/login-service.service';
import { LoginUtils } from 'src/app/utils/login-utils';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAdmin: boolean = false;
  isAnonymous: boolean = false;
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    if (LoginUtils.getToken() == 'Anonymous' || LoginUtils.getToken() == null) {
      this.isAnonymous = true;
    }
    this.loginService.isAdmin().subscribe({
      next: (data: boolean) => (this.isAdmin = data),
      error: () => (this.isAdmin = false),
    });
  }

  logout() {
    LoginUtils.clearToken();
    this.router.navigateByUrl('/');
  }
}

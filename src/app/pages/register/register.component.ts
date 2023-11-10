import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  RegisterRequest,
  RegisterService,
} from 'src/app/services/auth-services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm = this.fb.group({
    username: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(32),
        Validators.pattern('[a-zA-Z]+'),
      ]),
    ],
    password: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(128),
      ]),
    ],
    confirmPassword: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(128),
      ]),
    ],
  });

  errorMessage = '';
  successMessage = '';
  constructor(
    private registerService: RegisterService,
    private fb: FormBuilder
  ) {}

  register() {
    if (!this.registerForm.valid) {
      this.errorMessage = 'Please fill the form correctly!';
      return;
    }

    let registerInfo = <RegisterRequest>this.registerForm.value;
    if (registerInfo.confirmPassword != registerInfo.password) {
      this.errorMessage = 'Passwords do not much';
      return;
    }

    this.registerService.register(registerInfo).subscribe({
      next: (data) => {
        this.successMessage = 'Your account is created you can login now';
      },
      error: (err) => {
        this.errorMessage =
          'Please contact the administrator an error occurred while creating your account';
      },
    });
  }

  getControl(name: string) {
    return this.registerForm.get(name) as FormControl;
  }
}

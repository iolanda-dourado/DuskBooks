import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../buttons/button/button.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-page',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.css',
})
export class SigninPageComponent implements OnInit {
  signinForm!: FormGroup;
  submitted = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  get email() {
    return this.signinForm.get('email');
  }

  get password() {
    return this.signinForm.get('password');
  }

  signinUser(): void {
    this.submitted = true;
    if (this.signinForm.invalid) {
      return;
    }

    // this.pageLoader.showLoader();
    const email = this.signinForm.value.email;
    const password = this.signinForm.value.password;

    this.authenticationService.login(email, password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.router.navigate(['']);

        // this.pageLoader.hideLoader();
      },
      error: (error) => {
        console.error('Login failed', error);
        // Adicione feedback visual para o usuário
        if (error.status === 401) {
          alert('Invalid credentials!');
        } else {
          alert('Login error. Please try again later.');
        }
      },
    });
  }
}

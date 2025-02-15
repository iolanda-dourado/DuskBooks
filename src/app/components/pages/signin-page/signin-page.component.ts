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
import { PageLoaderService } from '../../../services/page-loader.service';
import Swal from 'sweetalert2';

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
  isVisible: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private pageLoader: PageLoaderService
  ) {}

  ngOnInit(): void {
    this.pageLoader.isLoading().subscribe({
      next: (x) => (this.isVisible = x),
      error: (err) => console.error(err),
    });

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
    this.pageLoader.showLoader();
    this.submitted = true;

    if (this.signinForm.invalid) {
      this.pageLoader.hideLoader();
      return;
    }

    const email = this.signinForm.value.email;
    const password = this.signinForm.value.password;

    this.authenticationService.login(email, password).subscribe({
      next: (response) => {
        this.pageLoader.hideLoader();

        // Verifica se a resposta contém um token antes de redirecionar
        if (response && response.token) {
          console.log('Login successful', response);
          this.router.navigate(['']);
        } else {
          
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Login failed. Please verify your credentials.',
          });
        }
      },
      error: (error) => {
        this.pageLoader.hideLoader();
        console.error('Login failed', error);

        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Login failed. Please verify your credentials.',
        });
      },
    });
  }
}

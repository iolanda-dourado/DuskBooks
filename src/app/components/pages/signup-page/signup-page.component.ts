import { Component } from '@angular/core';
import { ButtonComponent } from '../../buttons/button/button.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { User } from '../../../interfaces/user';
import { PageLoaderService } from '../../../services/page-loader.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, NgIf],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css',
})
export class SignupPageComponent {
  signupForm!: FormGroup;
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

    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  get name() {
    return this.signupForm.get('name');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  signupUser(): void {
    this.pageLoader.showLoader();
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    }

    this.authenticationService.register(this.signupForm.value).subscribe({
      next: (response: any) => {
        this.pageLoader.hideLoader();
        console.log('Registration succesful', response);

        this.router.navigate(['signin']);
      },
      error: (error: any) => {
        this.pageLoader.hideLoader();
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Registration failed. Please verify your credentials.',
        });

        if (error.error instanceof ErrorEvent) {
          console.error('Client error: ', error.error.message);
        } else {
          console.error(
            `Server error: [${error.status}]: ${error.error.message}`
          );
        }
      },
    });
  }
}

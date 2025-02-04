import { Component } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
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

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    }

    this.authenticationService.register(this.signupForm.value).subscribe({
      next: (response: any) => {
        console.log("Registration succesful", response);

        // this.pageLoader.hideLoader();
        this.router.navigate(['signin']);
      },
      error: (error: any) => {
        // this.pageLoader.hideLoader();
        if (error.error instanceof ErrorEvent) {
          console.error("Client error: ", error.error.message);
        } else {
          console.error(`Server error: [${error.status}]: ${error.error.message}`);
        }
      },
    });
  }
}

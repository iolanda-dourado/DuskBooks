import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { User } from '../../../interfaces/user';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-area',
  standalone: true,
  imports: [NgIf],
  templateUrl: './user-area.component.html',
  styleUrl: './user-area.component.css',
})
export class UserAreaComponent {
  constructor(private authService: AuthenticationService) {}
  user: User | null = null;

  // user-area.component.ts
  ngOnInit(): void {
    console.log('Initial auth state:', this.authService.user);
    this.authService.user.subscribe((user) => {
      console.log('User data update:', user);
      this.user = user;
    });
  }
}

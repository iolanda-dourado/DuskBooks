import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-unauthorized-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './unauthorized-page.component.html',
  styleUrl: './unauthorized-page.component.css',
})
export class UnauthorizedPageComponent {
  returnUrl: string = '/';
  isAuthenticated: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.returnUrl = params['returnUrl'] || '/';
    });

    this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }
}
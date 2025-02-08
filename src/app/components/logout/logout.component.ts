import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.authService.logout();
    console.log('Redirecionando para a página de login...');
    this.router.navigate(['/']); // Redireciona para a homepage após logout
  }
}

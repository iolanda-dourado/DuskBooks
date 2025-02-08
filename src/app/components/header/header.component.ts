import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

  isAuthenticated = false;

  constructor(private authService: AuthenticationService, private router: Router) {
    // Atualiza o estado de autenticação sempre que houver mudanças
    this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user; // Se houver um usuário, está autenticado
    });
  }


  // isScrolled = false;
  // @ViewChild('heroSection') heroSection!: ElementRef;

  // @HostListener('window:scroll')
  // onWindowScroll() {
  //   const heroHeight = this.heroSection?.nativeElement.offsetHeight || 0;
  //   this.isScrolled = window.scrollY > heroHeight;
  // }
}

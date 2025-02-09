import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isAuthenticated = false;
  private authSubscription!: Subscription;
  role = '';
  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private bookService: BookService
  ) {
    this.authSubscription = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.role = user?.role || ''; // Atualiza a role quando o user muda
    });

    this.role = this.authService.getUserRole() || '';
  }

  onSearch() {
    const search = this.searchInput.nativeElement.value; // Captura o valor do input
    if (search) {
      this.bookService.getBookByIsbn(search).subscribe({
        next: (book) => {
          if (book) {
            this.router.navigate(['/book/', search]); // Navega para a rota do livro com o ISBN
          } else {
            this.router.navigate(['/']); // Redireciona para a home se o livro não existir
          }
          this.searchInput.nativeElement.value = '';
        },
        error: (err) => {
          console.error('Erro ao buscar livro: ', err);
          this.router.navigate(['/']);
          this.searchInput.nativeElement.value = '';
        },
      });
    }
  }
}
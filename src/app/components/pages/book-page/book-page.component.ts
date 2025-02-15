import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookService } from '../../../services/book.service';
import { Book } from '../../../interfaces/book';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../../services/authentication.service';
import { ButtonRemoveBookComponent } from '../../buttons/button-remove-book/button-remove-book.component';
import { ButtonEditBookComponent } from '../../buttons/button-edit-book/button-edit-book.component';
import { ButtonUpdateAvailabilityComponent } from '../../buttons/button-update-availability/button-update-availability.component';
import { ReviewService } from '../../../services/review.service';
import { Review } from '../../../interfaces/review';
import { ButtonAddReviewComponent } from '../../buttons/button-add-review/button-add-review.component';
import { BackToBooksComponent } from '../../buttons/back-to-books/back-to-books.component';

@Component({
  selector: 'app-book-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ButtonRemoveBookComponent,
    ButtonEditBookComponent,
    ButtonUpdateAvailabilityComponent,
    ButtonAddReviewComponent,
    BackToBooksComponent
  ],
  templateUrl: './book-page.component.html',
  styleUrl: './book-page.component.css',
})
export class BookPageComponent implements OnInit {
  book!: Book;
  reviews: Review[] = [];
  isLoading: boolean = true;
  isLoadingReviews: boolean = false;
  error: string | null = null;
  isAuthenticated: boolean = false;
  userRole: string = '';

  // Propriedades para paginação
  currentPage: number = 1; // Página atual
  reviewsPerPage: number = 5; // Número de reviews por página
  paginatedReviews: Review[] = []; // Reviews exibidos na página atual

  constructor(
    private bookService: BookService,
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    // Verifica autenticação e papel do usuário
    this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.userRole = user?.role || '';
      console.log('User role:', this.userRole);
    });

    // Obtém o ISBN da rota e carrega o livro
    this.route.params.subscribe((params) => {
      const isbn = params['isbn'];
      this.loadBook(isbn);
    });
  }

  private loadBook(isbn: string) {
    this.bookService.getBookByIsbn(isbn).subscribe({
      next: (book) => {
        this.book = book;
        this.isLoading = false;
        // Carrega as reviews após o livro ser carregado
        this.loadReviews(isbn);
      },
      error: (err) => {
        this.error = 'Failed to load book details';
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  private loadReviews(isbn: string): void {
    this.isLoadingReviews = true;
    this.reviewService.getReviews(isbn).subscribe({
      next: (reviews) => {
        this.reviews = reviews.filter((review) => review.isbn === isbn);
        this.updatePaginatedReviews(); // Atualiza as reviews exibidas
        this.isLoadingReviews = false;
      },
      error: (error) => {
        console.error('Error loading reviews:', error);
        this.isLoadingReviews = false;
      },
    });
  }

  // Método para atualizar as reviews exibidas com base na página atual
  private updatePaginatedReviews(): void {
    const startIndex = (this.currentPage - 1) * this.reviewsPerPage;
    const endIndex = startIndex + this.reviewsPerPage;
    this.paginatedReviews = this.reviews.slice(startIndex, endIndex);
  }

  // Método para ir para a próxima página
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedReviews();
    }
  }

  // Método para voltar para a página anterior
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedReviews();
    }
  }

  // Getter para calcular o total de páginas
  get totalPages(): number {
    return Math.ceil(this.reviews.length / this.reviewsPerPage);
  }
}

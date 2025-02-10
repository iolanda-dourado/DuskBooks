import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { Book } from '../../interfaces/book';
import { BookService } from '../../services/book.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription } from 'rxjs';
import { ButtonGetUnavailableBooksComponent } from '../buttons/button-get-unavailable-books/button-get-unavailable-books.component';
import { ButtonAddBookComponent } from '../buttons/button-add-book/button-add-book.component';
import { CategoryService } from '../../services/category.service'; // Importe o CategoryService
import { Category } from '../../interfaces/category'; // Importe a interface Category
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-books-listing',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    RouterModule,
    BookDetailComponent,
    NgClass,
    ButtonAddBookComponent,
    ButtonGetUnavailableBooksComponent,
    FormsModule
  ],
  templateUrl: './books-listing.component.html',
  styleUrl: './books-listing.component.css',
})
export class BooksListingComponent implements OnInit {
  @Output() selectedBook = new EventEmitter<Book>();
  books: Book[] = [];
  filteredBooks: Book[] = []; // Lista de livros filtrados
  categories: Category[] = []; // Lista de categorias
  selectedCategory: string = 'all'; // Categoria selecionada (default: 'all')
  isLoading: boolean = true;
  isAuthenticated: boolean = false;
  role = '';
  private authSubscription!: Subscription;

  constructor(
    private bookService: BookService,
    private authService: AuthenticationService,
    private categoryService: CategoryService // Injete o CategoryService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.role = user?.role || '';
    });

    this.role = this.authService.getUserRole() || '';

    // Busca todos os livros disponíveis
    this.bookService.getAvailableBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.filteredBooks = books; // Inicializa a lista filtrada com todos os livros
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error obtaining the books list: ', err);
        this.isLoading = false;
      },
    });

    // Busca todas as categorias
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Error obtaining the categories list: ', err);
      },
    });
  }

  // Método para filtrar os livros por categoria
  filterBooksByCategory(categoryName: string): void {
    this.selectedCategory = categoryName;
    if (categoryName === 'all') {
      this.filteredBooks = this.books; // Mostra todos os livros
    } else {
      this.filteredBooks = this.books.filter(
        (book) => book.category === categoryName
      ); // Filtra por categoria
    }
  }

  selectBook(book: Book): void {
    this.selectedBook.emit(book);
  }
}

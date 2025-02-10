import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Book } from '../../interfaces/book';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { ButtonAddBookComponent } from '../buttons/button-add-book/button-add-book.component';
import { ButtonGetUnavailableBooksComponent } from '../buttons/button-get-unavailable-books/button-get-unavailable-books.component';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service'; // Importe o CategoryService
import { Category } from '../../interfaces/category'; // Importe a interface Category

@Component({
  selector: 'app-unavailable-books-listing',
  standalone: true,
  imports: [
    CommonModule,
    BookDetailComponent,
    ButtonAddBookComponent,
    ButtonGetUnavailableBooksComponent,
    FormsModule,
  ],
  templateUrl: './unavailable-books-listing.component.html',
  styleUrl: './unavailable-books-listing.component.css',
})
export class UnavailableBooksListingComponent implements OnInit {
  @Output() selectedBook = new EventEmitter<Book>();
  books: Book[] = []; // Lista completa de livros indisponíveis
  filteredBooks: Book[] = []; // Lista de livros filtrados
  categories: Category[] = []; // Lista de categorias
  selectedCategory: string = 'all'; // Categoria selecionada (default: 'all')
  isLoading: boolean = true;

  constructor(
    private bookService: BookService,
    private categoryService: CategoryService // Injete o CategoryService
  ) {}

  ngOnInit(): void {
    // Busca os livros indisponíveis
    this.bookService.getUnavailableBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.filteredBooks = books; // Inicializa a lista filtrada com todos os livros
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error obtaining the complete books list: ', err);
        this.isLoading = false;
      },
    });

    // Busca as categorias disponíveis
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

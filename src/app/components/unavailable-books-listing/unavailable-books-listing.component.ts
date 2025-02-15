import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Book } from '../../interfaces/book';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { ButtonAddBookComponent } from '../buttons/button-add-book/button-add-book.component';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service'; 
import { Category } from '../../interfaces/category';

@Component({
  selector: 'app-unavailable-books-listing',
  standalone: true,
  imports: [
    CommonModule,
    BookDetailComponent,
    ButtonAddBookComponent,
    FormsModule,
  ],
  templateUrl: './unavailable-books-listing.component.html',
  styleUrl: './unavailable-books-listing.component.css',
})
export class UnavailableBooksListingComponent implements OnInit {
  @Output() selectedBook = new EventEmitter<Book>();
  books: Book[] = [];
  filteredBooks: Book[] = [];
  categories: Category[] = [];
  selectedCategory: string = 'all';
  isLoading: boolean = true;

  constructor(
    private bookService: BookService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    // Busca os livros indisponíveis
    this.bookService.getUnavailableBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.filteredBooks = books; 
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

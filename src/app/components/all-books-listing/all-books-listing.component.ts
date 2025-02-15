import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Book } from '../../interfaces/book';
import { Subscription } from 'rxjs';
import { BookService } from '../../services/book.service';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule, NgClass } from '@angular/common';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { FormsModule } from '@angular/forms'; // Importe o FormsModule
import { CategoryService } from '../../services/category.service'; // Importe o CategoryService
import { Category } from '../../interfaces/category'; // Importe a interface Category

@Component({
  selector: 'app-all-books-listing',
  standalone: true,
  imports: [CommonModule, BookDetailComponent, FormsModule], // Adicione o FormsModule
  templateUrl: './all-books-listing.component.html',
  styleUrl: './all-books-listing.component.css',
})
export class AllBooksListingComponent implements OnInit {
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
    // Busca todos os livros
    this.bookService.getBooks().subscribe({
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

  // Método para filtrar os livros por categoria
  filterBooksByCategory(categoryName: string): void {
    this.selectedCategory = categoryName;
    if (categoryName === 'all') {
      this.filteredBooks = this.books; 
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

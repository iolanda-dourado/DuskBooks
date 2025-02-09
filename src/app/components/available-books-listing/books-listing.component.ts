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

@Component({
  selector: 'app-books-listing',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule, BookDetailComponent, NgClass, ButtonAddBookComponent, ButtonGetUnavailableBooksComponent],
  templateUrl: './books-listing.component.html',
  styleUrl: './books-listing.component.css',
})
export class BooksListingComponent implements OnInit {
  @Output() selectedBook = new EventEmitter<Book>();
  books: Book[] = [];
  isLoading: boolean = true;
  isAuthenticated: boolean = false;
  role = '';
  private authSubscription!: Subscription;

  constructor(
    private bookService: BookService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.role = user?.role || ''; // Atualiza a role quando o user muda
    });

    this.role = this.authService.getUserRole() || '';

    this.bookService.getAvailableBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error obtaining the books list: ', err);
        this.isLoading = false;
      },
    });
  }

  selectBook(book: Book): void {
    this.selectedBook.emit(book);
  }
}

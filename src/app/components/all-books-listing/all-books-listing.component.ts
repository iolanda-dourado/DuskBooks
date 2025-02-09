import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Book } from '../../interfaces/book';
import { Subscription } from 'rxjs';
import { BookService } from '../../services/book.service';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule, NgClass } from '@angular/common';
import { BookDetailComponent } from '../book-detail/book-detail.component';

@Component({
  selector: 'app-all-books-listing',
  standalone: true,
  imports: [CommonModule, BookDetailComponent],
  templateUrl: './all-books-listing.component.html',
  styleUrl: './all-books-listing.component.css',
})
export class AllBooksListingComponent implements OnInit {
  @Output() selectedBook = new EventEmitter<Book>();
  books: Book[] = [];
  isLoading: boolean = true;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error obtaining the complete books list: ', err);
        this.isLoading = false;
      },
    });
  }

  selectBook(book: Book): void {
    this.selectedBook.emit(book);
  }
}

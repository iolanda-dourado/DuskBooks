import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { Book } from '../../interfaces/book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-books-listing',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule, BookDetailComponent],
  templateUrl: './books-listing.component.html',
  styleUrl: './books-listing.component.css',
})
export class BooksListingComponent implements OnInit {
  @Output() selectedBook = new EventEmitter<Book>();
  books: Book[] = [];
  isLoading: boolean = true;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
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

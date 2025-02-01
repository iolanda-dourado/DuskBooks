import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BookServiceService } from '../../services/book-service.service';
import { BookSummary } from '../../interfaces/book-summary';
import { RouterLink, RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { Book } from '../../interfaces/book';

@Component({
  selector: 'app-books-listing',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule, BookDetailComponent],
  templateUrl: './books-listing.component.html',
  styleUrl: './books-listing.component.css',
})
export class BooksListingComponent implements OnInit {
  @Output() selectedBook = new EventEmitter<BookSummary>();

  books: Book[] = [];

  constructor(private bookService: BookServiceService) {
    console.log('BooksListingComponent carregado!');
  }

  ngOnInit(): void {
    this.bookService.getAvailableBooks().subscribe({
      next: (books) => {
        this.books = books;
      },
      error: (err) => {
        console.error('Error obtaining the books list: ', err);
      },
    });
  }

  selectBook(book: BookSummary): void {
    this.selectedBook.emit(book);
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { Book } from '../../interfaces/book';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { ButtonAddBookComponent } from "../buttons/button-add-book/button-add-book.component";
import { ButtonGetUnavailableBooksComponent } from "../buttons/button-get-unavailable-books/button-get-unavailable-books.component";

@Component({
  selector: 'app-unavailable-books-listing',
  standalone: true,
  imports: [CommonModule, BookDetailComponent, ButtonAddBookComponent, ButtonGetUnavailableBooksComponent],
  templateUrl: './unavailable-books-listing.component.html',
  styleUrl: './unavailable-books-listing.component.css'
})
export class UnavailableBooksListingComponent {
@Output() selectedBook = new EventEmitter<Book>();
  books: Book[] = [];
  isLoading: boolean = true;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getUnavailableBooks().subscribe({
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

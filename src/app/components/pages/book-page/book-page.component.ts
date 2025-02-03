// book-page.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookService } from '../../../services/book.service';
import { Book } from '../../../interfaces/book';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './book-page.component.html',
  styleUrl: './book-page.component.css',
})
export class BookPageComponent implements OnInit {
  book!: Book;
  isLoading: boolean = true;
  error: string | null = null;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
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
      },
      error: (err) => {
        this.error = 'Failed to load book details';
        this.isLoading = false;
        console.error(err);
      },
    });
  }
}

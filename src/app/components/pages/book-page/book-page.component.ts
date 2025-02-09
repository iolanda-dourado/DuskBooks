// book-page.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookService } from '../../../services/book.service';
import { Book } from '../../../interfaces/book';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../../services/authentication.service';
import { ButtonRemoveBookComponent } from "../../buttons/button-remove-book/button-remove-book.component";
import { ButtonEditBookComponent } from '../../buttons/button-edit-book/button-edit-book.component';
import { ButtonUpdateAvailabilityComponent } from "../../buttons/button-update-availability/button-update-availability.component";

@Component({
  selector: 'app-book-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonRemoveBookComponent, ButtonEditBookComponent, ButtonUpdateAvailabilityComponent],
  templateUrl: './book-page.component.html',
  styleUrl: './book-page.component.css',
})
export class BookPageComponent implements OnInit {
  book!: Book;
  isLoading: boolean = true;
  error: string | null = null;
  isAuthenticated: boolean = false;
  userRole: string = '';

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.userRole = user?.role || '';
      console.log('User role:', this.userRole);
    });

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

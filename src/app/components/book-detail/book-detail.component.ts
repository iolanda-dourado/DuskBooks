import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookServiceService } from '../../services/book-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Book } from '../../interfaces/book';
import { NgIf } from '@angular/common';
import { BooksListingComponent } from '../books-listing/books-listing.component';
import { BookSummary } from '../../interfaces/book-summary';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css',
})
export class BookDetailComponent {
  @Input() book!: Book; // Recebe os dados do livro

}

import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '../../interfaces/book';
import { CommonModule, NgIf } from '@angular/common';
import { PromoPipe } from '../../pipes/promo.pipe';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [NgIf, RouterLink, CommonModule, PromoPipe],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css',
})
export class BookDetailComponent {
  @Input() book!: Book;

}

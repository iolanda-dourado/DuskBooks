import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '../../interfaces/book';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css',
})
export class BookDetailComponent {
  @Input() book!: Book;

}

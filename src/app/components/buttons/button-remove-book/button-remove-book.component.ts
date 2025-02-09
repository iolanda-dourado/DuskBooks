import { Component, Input } from '@angular/core';
import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-button-remove-book',
  standalone: true,
  imports: [],
  templateUrl: './button-remove-book.component.html',
  styleUrl: './button-remove-book.component.css',
})
export class ButtonRemoveBookComponent {
  @Input() isbn!: string;

  constructor(private bookService: BookService) {}

  removeBook() {
    if (!this.isbn) {
      console.error('ISBN is undefined');
      return;
    }

    this.bookService.deleteBook(this.isbn).subscribe({
      next: () => {
        console.log('Book removed successfully');
      },
      error: (err) => {
        console.error('Failed to remove book: ', err);
      },
    });
  }
}

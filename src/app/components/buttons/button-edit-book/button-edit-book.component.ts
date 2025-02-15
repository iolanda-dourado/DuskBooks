import { Component, Input } from '@angular/core';
import { Book } from '../../../interfaces/book';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button-edit-book',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './button-edit-book.component.html',
  styleUrl: './button-edit-book.component.css',
})
export class ButtonEditBookComponent {
  @Input() book!: Book;
}

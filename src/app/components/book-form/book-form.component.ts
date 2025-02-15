import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Book } from '../../interfaces/book';
import { Category } from '../../interfaces/category';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css',
})
export class BookFormComponent implements OnChanges {
  @Input() categories: Category[] = [];
  @Input() book: Book | null = null;
  @Output() formSubmit = new EventEmitter<Book>();
  isEditMode = false;

  bookForm: FormGroup;

  constructor() {
    this.bookForm = new FormGroup({
      isbn: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]), // Adicione aqui
      cover: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['book'] && this.book) {
      this.isEditMode = true;
      this.updateForm(this.book);
    } else {
      this.isEditMode = false;
    }
  }

  private updateForm(book: Book): void {
    this.bookForm.patchValue({
      isbn: book.isbn,
      title: book.title,
      author: book.author.join(', '),
      cover: book.cover,
      price: book.price,
    });

    // Sempre adicionar o controle category ao formulário
    if (!this.bookForm.get('category')) {
      this.bookForm.addControl(
        'category',
        new FormControl(book.category || '', Validators.required)
      );
    } else {
      this.bookForm.get('category')?.setValue(book.category);
    }

    if (this.isEditMode) {
      this.bookForm.get('category')?.disable();
    } else {
      this.bookForm.get('category')?.enable();
    }
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const formValue = this.bookForm.value;
      const authors =
        typeof formValue.author === 'string'
          ? formValue.author.split(',').map((author: string) => author.trim())
          : [];

      const bookData: Book = {
        isbn: formValue.isbn!,
        title: formValue.title!,
        author: authors,
        cover: formValue.cover!,
        price: formValue.price!,
        available: this.book?.available || true,
        category: formValue.category!, // Certifique-se de incluir o campo category
      };

      this.formSubmit.emit(bookData);
      console.log('Formulário submetido:', bookData);
    }
  }

  // Getters para os controles
  get isbn() {
    return this.bookForm.get('isbn');
  }
  get title() {
    return this.bookForm.get('title');
  }
  get author() {
    return this.bookForm.get('author');
  }
  get cover() {
    return this.bookForm.get('cover');
  }
  get price() {
    return this.bookForm.get('price');
  }
  get category() {
    return this.bookForm.get('category');
  }
}

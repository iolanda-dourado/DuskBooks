import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BookService } from '../../../services/book.service';
import { CategoryService } from '../../../services/category.service'; // Importe o CategoryService
import { Category } from '../../../interfaces/category'; // Importe a interface Category

@Component({
  selector: 'app-add-book-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-book-page.component.html',
  styleUrl: './add-book-page.component.css',
})
export class AddBookPageComponent implements OnInit {
  addBookForm!: FormGroup;
  submitted = false;
  categories: Category[] = []; // Lista de categorias

  constructor(
    private bookService: BookService,
    private categoryService: CategoryService // Injete o CategoryService
  ) {}

  ngOnInit(): void {
    // Inicializa o formulário
    this.addBookForm = new FormGroup({
      isbn: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]), // Campo de categoria
      cover: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
    });

    // Busca as categorias disponíveis
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Error obtaining the categories list: ', err);
      },
    });
  }

  get isbn() {
    return this.addBookForm.get('isbn');
  }

  get title() {
    return this.addBookForm.get('title');
  }

  get author() {
    return this.addBookForm.get('author');
  }

  get category() {
    return this.addBookForm.get('category');
  }

  get cover() {
    return this.addBookForm.get('cover');
  }

  get price() {
    return this.addBookForm.get('price');
  }

  onSubmit() {
    this.submitted = true;

    if (this.addBookForm.valid) {
      const formValue = this.addBookForm.value;
      formValue.author = formValue.author
        .split(',')
        .map((author: string) => author.trim());

      console.log('Dados do formulário:', formValue);

      this.bookService.postBook(formValue).subscribe({
        next: (response) => {
          console.log('Livro adicionado com sucesso:', response);
          this.addBookForm.reset();
          this.submitted = false;
        },
        error: (error) => {
          console.error('Erro ao adicionar livro:', error);
        },
      });
    } else {
      console.log('Formulário inválido');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../interfaces/category';
import { BookFormComponent } from '../../book-form/book-form.component';
import { Book } from '../../../interfaces/book';

@Component({
  selector: 'app-add-book-page',
  standalone: true,
  imports: [BookFormComponent],
  templateUrl: './add-book-page.component.html',
  styleUrl: './add-book-page.component.css',
})
export class AddBookPageComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private bookService: BookService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Error obtaining the categories list: ', err);
      },
    });
  }

  onFormSubmit(bookData: Book) {
    console.log('Dados enviados para a API:', bookData); // Verifique os dados enviados
    this.bookService.postBook(bookData).subscribe({
      next: (response) => {
        console.log('Livro adicionado com sucesso:', response);
      },
      error: (error) => {
        console.error('Erro ao adicionar livro:', error);
        console.error('Detalhes do erro:', error.error); // Verifique a mensagem de erro da API
      },
    });
  }
}

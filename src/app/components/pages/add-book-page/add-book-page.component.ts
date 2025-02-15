import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../interfaces/category';
import { BookFormComponent } from '../../book-form/book-form.component';
import { Book } from '../../../interfaces/book';
import Swal from 'sweetalert2'; // Importe o SweetAlert2
import { Router } from '@angular/router';

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
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Error obtaining the categories list: ', err);
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'It was not possible to add the categories list..',
        });
      },
    });
  }

  onFormSubmit(bookData: Book) {
    console.log('Dados enviados para a API:', bookData);
    this.bookService.postBook(bookData).subscribe({
      next: (response) => {
        console.log('Livro adicionado com sucesso:', response);
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Book registered succesfully.',
        });

        setTimeout(() => {
          this.router.navigate(['/book/' + bookData.isbn]);
        }, 2000);
      },
      error: (error) => {
        console.error('Erro ao adicionar livro:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'It was not possible to add the book.',
        });
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../../services/book.service';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../interfaces/category';
import { Book } from '../../../interfaces/book';
import { BookFormComponent } from '../../book-form/book-form.component';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2'; // Import SweetAlert2

@Component({
  selector: 'app-update-book-page',
  standalone: true,
  imports: [BookFormComponent, NgIf],
  templateUrl: './update-book-page.component.html',
  styleUrl: './update-book-page.component.css',
})
export class UpdateBookPageComponent implements OnInit {
  categories: Category[] = [];
  book: Book | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const isbn = this.route.snapshot.paramMap.get('isbn');

    if (isbn) {
      this.bookService.getBookByIsbn(isbn).subscribe({
        next: (book) => {
          this.book = book;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading book:', err);
          this.isLoading = false;
        },
      });
    }

    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Error obtaining categories:', err);
      },
    });
  }

  onFormSubmit(bookData: Book) {
    this.bookService.putBook(bookData.isbn, bookData).subscribe({
      next: (response) => {
        console.log('Book updated:', response);
        

        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'The book has been successfully updated.',
        }).then(() => { });
        
        this.router.navigate(['/book/' + bookData.isbn]);
      },
      error: (error) => {
        console.error('Error updating book:', error);

        // Show error message
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'The book could not be updated. Please try again later.',
        });
      },
    });
  }
}

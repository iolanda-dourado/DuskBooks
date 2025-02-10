import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Category } from '../../../interfaces/category';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../../services/category.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-categories-listing-page',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './categories-listing-page.component.html',
  styleUrl: './categories-listing-page.component.css',
})
export class CategoriesListingPageComponent {
  @Output() selectedCategory = new EventEmitter<Category>();
  categories: Category[] = [];
  selectedCategoryBooks: any[] = []; // Armazenará os livros da categoria selecionada
  isLoading: boolean = true;
  isAuthenticated: boolean = false;
  role = '';
  private authSubscription!: Subscription;

  constructor(
    private categoryService: CategoryService,
    private authService: AuthenticationService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.role = user?.role || ''; // Atualiza a role quando o user muda
    });

    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error obtaining the categories list: ', err);
        this.isLoading = false;
      },
    });
  }

  selectCategory(category: Category): void {
    this.bookService.getBooksByCategory(category.name).subscribe({
      next: (books) => {
        this.selectedCategoryBooks = books; // Atualiza a lista de livros
      },
      error: (err) => {
        console.error('Error fetching books: ', err);
      },
    });
  }
}

import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Category } from '../../../interfaces/category';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../../services/category.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { ButtonAddCategoryComponent } from "../../buttons/button-add-category/button-add-category.component";

@Component({
  selector: 'app-categories-listing-page',
  standalone: true,
  imports: [NgIf, NgFor, ButtonAddCategoryComponent],
  templateUrl: './categories-listing-page.component.html',
  styleUrl: './categories-listing-page.component.css',
})
export class CategoriesListingPageComponent {
  @Output() selectedCategory = new EventEmitter<Category>();
  categories: Category[] = [];
  isLoading: boolean = true;
  isAuthenticated: boolean = false;
  role = '';
  private authSubscription!: Subscription;

  constructor(
    private categoryService: CategoryService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.role = user?.role || '';
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
}

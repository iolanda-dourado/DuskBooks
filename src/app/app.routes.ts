import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { BooksListingComponent } from './components/books-listing/books-listing.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'books', component: BooksListingComponent },
  { path: ':isbn', component: BookDetailComponent },
];

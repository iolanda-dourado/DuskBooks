import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { BooksListingComponent } from './components/books-listing/books-listing.component';
import { BookPageComponent } from './components/pages/book-page/book-page.component';
import { SigninPageComponent } from './components/pages/signin-page/signin-page.component';
import { SignupPageComponent } from './components/pages/signup-page/signup-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'books', component: BooksListingComponent },
  { path: 'book/:isbn', component: BookPageComponent },
  { path: 'signin', component: SigninPageComponent },
  { path: 'signup', component: SignupPageComponent },
];

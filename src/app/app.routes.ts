import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { BooksListingComponent } from './components/available-books-listing/books-listing.component';
import { BookPageComponent } from './components/pages/book-page/book-page.component';
import { SigninPageComponent } from './components/pages/signin-page/signin-page.component';
import { SignupPageComponent } from './components/pages/signup-page/signup-page.component';
import { UserAreaComponent } from './components/pages/user-area/user-area.component';
import { authenticationGuard } from './guards/authentication.guard';
import { LogoutComponent } from './components/logout/logout.component';
import { UnauthorizedPageComponent } from './components/pages/unauthorized-page/unauthorized-page.component';
import { AddBookPageComponent } from './components/pages/add-book-page/add-book-page.component';
import { managerGuard } from './guards/manager.guard';
import { AllBooksListingComponent } from './components/all-books-listing/all-books-listing.component';
import { UnavailableBooksListingComponent } from './components/unavailable-books-listing/unavailable-books-listing.component';
import { CategoriesListingPageComponent } from './components/pages/categories-listing-page/categories-listing-page.component';
import { UpdateBookPageComponent } from './components/pages/update-book-page/update-book-page.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'books/all',
    component: AllBooksListingComponent,
    canActivate: [authenticationGuard],
  },
  { path: 'books/available', component: BooksListingComponent },
  {
    path: 'books/unavailable',
    component: UnavailableBooksListingComponent,
    canActivate: [managerGuard],
  },
  { path: 'book/:isbn', component: BookPageComponent },
  { path: 'signin', component: SigninPageComponent },
  { path: 'signup', component: SignupPageComponent },
  {
    path: 'user-area',
    component: UserAreaComponent,
    canActivate: [authenticationGuard],
  },
  { path: 'logout', component: LogoutComponent },
  { path: 'unauthorized', component: UnauthorizedPageComponent },
  {
    path: 'add-book',
    component: AddBookPageComponent,
    canActivate: [managerGuard],
  },
  {
    path: 'update-book/:isbn',
    component: UpdateBookPageComponent,
    canActivate: [managerGuard],
  },
  {
    path: 'categories',
    component: CategoriesListingPageComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];

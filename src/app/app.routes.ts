import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { BooksListingComponent } from './components/books-listing/books-listing.component';
import { BookPageComponent } from './components/pages/book-page/book-page.component';
import { SigninPageComponent } from './components/pages/signin-page/signin-page.component';
import { SignupPageComponent } from './components/pages/signup-page/signup-page.component';
import { UserAreaComponent } from './components/pages/user-area/user-area.component';
import { authenticationGuard } from './guards/authentication.guard';
import { LogoutComponent } from './components/logout/logout.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'books', component: BooksListingComponent },
  { path: 'book/:isbn', component: BookPageComponent },
  { path: 'signin', component: SigninPageComponent },
  { path: 'signup', component: SignupPageComponent },
  {
    path: 'user-area',
    component: UserAreaComponent,
    canActivate: [authenticationGuard],
  },
  { path: 'logout', component: LogoutComponent },
];

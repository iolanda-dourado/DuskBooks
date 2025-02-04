import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';

export const authenticationGuard: CanActivateFn = (route, state) => {
  // check If the user is logged in
  if (inject(AuthenticationService).hasToken()) {
    return true;
  }

  //not logged in so redirect to login page
  inject(Router).navigate(['/login'], {
    queryParams: { returnUrl: state.url },
  });
  
  return false;
};

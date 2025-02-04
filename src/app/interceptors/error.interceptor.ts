import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401) {
        // auto logout on unauthorized response
        Inject(AuthenticationService).logout();
        location.reload();
      }
      return throwError(() => new Error(err.error.message || err.statusText));
    })
  );
};

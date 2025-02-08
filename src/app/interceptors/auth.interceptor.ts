import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { TokenService } from '../services/token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (inject(AuthenticationService).hasToken()) {
    const theToken = JSON.parse(inject(TokenService).getToken('user'));
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${theToken.token}`),
    });

    return next(authRequest);
  }

  return next(req);
};
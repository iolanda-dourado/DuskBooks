import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';

export const authenticationGuard: CanActivateFn = (route, state) => {
  // Confere se o utilizador está autenticado
  if (inject(AuthenticationService).hasToken()) { return true; }

  // Não está logado, redireciona para o login
  inject(Router).navigate(['login']), { queryParams: { returnUrl: state.url } };

  return false;
};

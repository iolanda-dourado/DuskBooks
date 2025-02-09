import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { map, Observable, take } from 'rxjs';

export const managerGuard: CanActivateFn = (
  route,
  state
): Observable<boolean | UrlTree> => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  // Se o token não existe, redireciona para login
  if (!authService.hasToken()) {
    router.navigate(['signin'], { queryParams: { returnUrl: state.url } });
    return new Observable<boolean | UrlTree>((subscriber) => {
      subscriber.next(false);
      subscriber.complete();
    });
  }

  // Usa o observable do usuário para verificar o role
  return authService.user.pipe(
    take(1), // pega o valor atual e completa
    map((user) => {
      if (user?.role === 'manager') {
        return true;
      } else {
        // Retorna um UrlTree para redirecionar em caso de não autorização
        return router.createUrlTree(['/unauthorized'], {
          queryParams: { returnUrl: state.url },
        });
      }
    })
  );
};

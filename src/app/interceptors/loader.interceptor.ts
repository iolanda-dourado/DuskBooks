import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { PageLoaderService } from '../services/page-loader.service';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderServ = inject(PageLoaderService);

  return next(req).pipe(
    map((event) => {
      if (event instanceof HttpResponse) {
        loaderServ.hideLoader();
      } else {
        loaderServ;
      }

      return event;
    })
  );
};
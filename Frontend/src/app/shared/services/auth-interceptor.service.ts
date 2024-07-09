import { Injectable } from '@angular/core';
import { HttpApiService } from './http-api.service';
import { HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { exhaustMap, take } from 'rxjs';

@Injectable()
export class AuthInterceptorService {
  constructor(private authService: HttpApiService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }

        const headerDict = {
          Authorization: `Bearer ${user.token}`,
        };

        const modifiedReq = req.clone({
          headers: new HttpHeaders(headerDict),
        });

        // console.log(user);
        // console.log('INTERCEPTOR');
        return next.handle(modifiedReq);
      })
    );
  }
}

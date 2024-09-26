import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { exhaustMap, take } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class AuthInterceptorService {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }

        const decodedToken = jwtDecode(user.token);
        const validationResult = decodedToken.exp * 1000 > new Date().getTime();
        if (!validationResult) {
          console.log('Token expired! Need to refresh token!');
          this.authService.refreshToken().subscribe({
            next: (res) => {
              console.log(res);
            },
            error: (err) => {
              console.log(err);
            },
          });
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

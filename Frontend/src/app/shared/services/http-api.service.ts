import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

import { environment } from 'src/environments/environment';
import { endpoints } from 'src/enums/endpoints.enum';

import { AuthResponseData, JwtPayload } from '../models/auth.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class HttpApiService implements OnInit {
  user = new BehaviorSubject(null);
  API_URL = environment.API_URL;
  TOKEN = null;

  constructor(private http: HttpClient) {}

  signIn(loginData) {
    const body = {
      username: loginData.email,
      password: loginData.password,
    };

    return this.http
      .post<AuthResponseData>(`${this.API_URL + endpoints.authenticate}`, body)
      .pipe(
        tap((resData) => {
          if (resData.statusCode === 200) {
            const token = resData.data.token;
            const decodedToken: JwtPayload = jwtDecode(token);
            this.user.next(
              new User(decodedToken.sub, decodedToken.roles, token)
            );
            this.TOKEN = token;
            localStorage.setItem('token', token);
          }
        })
      );
  }

  signUp(registerData) {
    const body = {
      firstname: registerData.firstname,
      lastname: registerData.lastname,
      email: registerData.email,
      password: registerData.password,
    };

    return this.http
      .post<AuthResponseData>(`${this.API_URL + endpoints.register}`, body)
      .pipe(
        tap((resData) => {
          if (resData.statusCode === 200) {
            const token = resData.data.token;
            console.log(token);
            this.TOKEN = token;
            localStorage.setItem('token', token);
          }
        })
      );
  }

  autoLogin() {
    const saveToken = localStorage.getItem('token');
    const decodedToken: JwtPayload = jwtDecode(saveToken);

    // TOKEN DEBUG
    // console.log('Saved token: ', saveToken);
    // console.log('Decoded token: ', decodedToken);
    // console.log('Created time: ', new Date(decodedToken.iat * 1000));
    // console.log('Expired time: ', new Date(decodedToken.exp * 1000));
    // console.log('Current time: ', new Date());

    const tokenIsValid = this.tokenIsValid(saveToken);
    console.log('Token is valid: ', tokenIsValid);
    if (saveToken && tokenIsValid) {
      const user = new User(decodedToken.sub, decodedToken.roles, saveToken);
      this.user.next(user);
    }
  }

  tokenIsValid(token: string) {
    const decodedToken: JwtPayload = jwtDecode(token);
    const validationResult = decodedToken.exp * 1000 > new Date().getTime();
    return validationResult;
  }

  signOut() {
    this.user.next(null);
    localStorage.removeItem('token');
  }

  // private handleAuthentication(email: string, token: string) {
  //   const user = new User(email, token);
  //   this.user.next(user);
  // }

  ngOnInit(): void {}
}

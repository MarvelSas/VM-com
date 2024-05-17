import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../models/user.model';

export interface AuthResponseData {
  timestamp: string;
  statusCode: number;
  status: string;
  message: string;
  data: {
    token: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class HttpApiService implements OnInit {
  user = new BehaviorSubject(null);
  API_URL = 'http://localhost:8080/api/v1';
  TOKEN = null;

  constructor(private http: HttpClient) {}

  signIn(loginData) {
    const body = {
      username: loginData.email,
      password: loginData.password,
    };

    // console.log(body);
    return this.http
      .post<AuthResponseData>(`${this.API_URL}/auth/authenticate`, body)
      .pipe(
        tap((resData) => {
          if (resData.statusCode === 200) {
            const token = resData.data.token;
            console.log(token);
            this.user.next(new User('email', token));
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

    // console.log(body);
    return this.http
      .post<AuthResponseData>(`${this.API_URL}/auth/register`, body)
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
    console.log('Zapisany token: ', saveToken);
    if (saveToken) {
      const user = new User('asdasd', saveToken);
      this.user.next(user);
    }
  }

  signOut() {
    this.user.next(null);
    localStorage.removeItem('token');
  }

  private handleAuthentication(email: string, token: string) {
    const user = new User(email, token);
    this.user.next(user);
  }

  ngOnInit(): void {}
}

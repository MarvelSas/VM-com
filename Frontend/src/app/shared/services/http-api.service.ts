import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpApiService {
  API_URL = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  signIn(loginData) {
    const body = {
      email: loginData.email,
      password: loginData.password,
    };

    console.log(body);
    return this.http.post(`${this.API_URL}/auth/authenticate`, body);
  }

  signUp(registerData) {
    const body = {
      firstname: registerData.firstname,
      lastname: registerData.lastname,
      email: registerData.email,
      password: registerData.password,
    };

    console.log(body);
    return this.http.post(`${this.API_URL}/auth/register`, body);
  }

  signOut() {}
}

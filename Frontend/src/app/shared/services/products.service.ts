import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  ProductsResponseData,
  OneProductResponseData,
} from '../models/product.model';
import { Observable, take } from 'rxjs';
import { HttpApiService } from './http-api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  API_URL = 'http://localhost:8080/api/v1/product';
  constructor(
    private http: HttpClient,
    private httpApiService: HttpApiService
  ) {}

  getProducts(): Observable<ProductsResponseData> {
    let token = '';
    if (this.httpApiService.user.value) {
      token = this.httpApiService.user.value.token;
    }
    const headerDict = {
      Authorization: `Bearer ${token}`,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.get<ProductsResponseData>(
      `${this.API_URL}/getAll`,
      requestOptions
    );
  }

  getProduct(id: number): Observable<OneProductResponseData> {
    let token = '';
    if (this.httpApiService.user.value) {
      token = this.httpApiService.user.value.token;
    }

    const headerDict = {
      Authorization: `Bearer ${token}`,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.get<OneProductResponseData>(
      `${this.API_URL}/get/${id}`,
      requestOptions
    );
  }

  addProduct() {}

  updateProduct() {}

  deleteProduct() {}
}

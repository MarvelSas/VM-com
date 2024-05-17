import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IProduct } from '../models/product.model';
import { Observable, take } from 'rxjs';
import { HttpApiService } from './http-api.service';

interface IData {
  products: IProduct[];
}

export interface ProductsResponseData {
  data: IData;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // API_URL = 'http://localhost:3000/api/v1';
  API_URL = 'http://localhost:8080/api/v1/product/getAll';
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
      `${this.API_URL}`,
      requestOptions
    );
  }

  getProduct(id: number) {}

  addProduct() {}

  updateProduct() {}

  deleteProduct() {}
}

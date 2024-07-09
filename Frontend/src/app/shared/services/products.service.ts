import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { endpoints } from 'src/enums/endpoints.enum';

import { HttpApiService } from './http-api.service';

import {
  ProductsResponseData,
  OneProductResponseData,
} from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  API_URL = environment.API_URL;
  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductsResponseData> {
    return this.http.get<ProductsResponseData>(
      `${this.API_URL + endpoints.getAllProducts}`
    );
  }

  getProduct(id: number): Observable<OneProductResponseData> {
    return this.http.get<OneProductResponseData>(
      `${this.API_URL + endpoints.getProduct}/${id}`
    );
  }

  addProduct() {}

  updateProduct() {}

  deleteProduct() {}
}

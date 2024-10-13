import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { endpoints } from 'src/enums/endpoints.enum';

import {
  ProductsResponseData,
  OneProductResponseData,
  IPageableParams,
} from '../models/product.model';
import { ICategoriesGetResponseData } from 'src/app/pages/admin/admin-categories/category.model';

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

  getPageableProducts(params: IPageableParams) {
    console.log(params);

    let pageableParams: HttpParams = new HttpParams()
      .set('page', (params.page - 1).toString())
      .set('pageSize', params.pageSize.toString());

    if (params.category) {
      if (params.category !== 'All') {
        pageableParams = pageableParams.set('category', params.category);
      }
    }

    if (params.sortBy) {
      pageableParams = pageableParams.set('sortBy', params.sortBy);
    }

    if (params.minPrice) {
      pageableParams = pageableParams.set(
        'minPrice',
        params.minPrice.toString()
      );
    }

    if (params.maxPrice) {
      pageableParams = pageableParams.set(
        'maxPrice',
        params.maxPrice.toString()
      );
    }

    if (params.name) {
      pageableParams = pageableParams.set('name', params.name);
    }

    if (params.order) {
      pageableParams = pageableParams.set('order', params.order);
    }

    return this.http.get<ProductsResponseData>(
      `${this.API_URL + endpoints.getPageableProducts}`,
      { params: pageableParams }
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

  getCategories() {
    return this.http.get<ICategoriesGetResponseData>(
      this.API_URL + endpoints.getAllCategories
    );
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICategory } from '../admin-categories/category.model';
import { HttpApiService } from 'src/app/shared/services/http-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/shared/services/products.service';

interface IProductCreate {
  name: string;
  price: string;
  url: string;
  productCategory: ICategory;
}

interface IProductResponseData {}

@Injectable({
  providedIn: 'root',
})
export class adminProductsService {
  API_URL = 'http://localhost:8080/api/v1/product/add';
  constructor(
    private http: HttpClient,
    private httpApiService: HttpApiService,
    private productsService: ProductsService
  ) {}

  getProducts() {
    return this.productsService.getProducts();
  }

  addProduct(
    name,
    price,
    imageUrl,
    description,
    productCategory
  ): Observable<IProductResponseData> {
    console.log(productCategory);
    const body = {
      name: name,
      price: price,
      url: imageUrl,
      photoUrl: imageUrl, //TODO
      productCategory: productCategory, //TODO
      amount: 5, //TODO
      description: description,
    };

    console.log(body);
    const token = this.httpApiService.user.value.token;

    const headerDict = {
      Authorization: `Bearer ${token}`,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post<IProductResponseData>(
      this.API_URL,
      body,
      requestOptions
    );
  }
}

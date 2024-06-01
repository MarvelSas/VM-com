import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { endpoints } from 'src/enums/endpoints.enum';

import { HttpApiService } from 'src/app/shared/services/http-api.service';
import { ProductsService } from 'src/app/shared/services/products.service';

import { IProductResponseData, IResPhotoUpload } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class adminProductsService {
  API_URL = environment.API_URL;
  constructor(
    private http: HttpClient,
    private httpApiService: HttpApiService,
    private productsService: ProductsService
  ) {}

  getProducts() {
    return this.productsService.getProducts();
  }

  addProductNew(formData: FormData) {
    const token = this.httpApiService.user.value.token;

    const headerDict = {
      Authorization: `Bearer ${token}`,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post<IProductResponseData>(
      this.API_URL + endpoints.addProduct,
      formData,
      requestOptions
    );
  }

  uploadPhoto(photoFile: File) {
    const token = this.httpApiService.user.value.token;

    const headerDict = {
      Authorization: `Bearer ${token}`,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    const formData = new FormData();
    formData.append('photo', photoFile);

    return this.http.post<IResPhotoUpload>(
      this.API_URL + endpoints.uploadImage,
      // 'http://localhost:8088/upload', //DEBUG
      formData,
      requestOptions
    );
  }

  // addProduct(
  //   name,
  //   price,
  //   imageUrl,
  //   description,
  //   productCategory
  // ): Observable<IProductResponseData> {
  //   console.log(productCategory);
  //   const body = {
  //     name: name,
  //     price: price,
  //     url: imageUrl,
  //     photoUrl: imageUrl, //TODO
  //     productCategory: productCategory, //TODO
  //     amount: 5, //TODO
  //     description: description,
  //   };

  //   const token = this.httpApiService.user.value.token;

  //   const headerDict = {
  //     Authorization: `Bearer ${token}`,
  //   };
  //   const requestOptions = {
  //     headers: new HttpHeaders(headerDict),
  //   };

  //   return this.http.post<IProductResponseData>(
  //     this.API_URL,
  //     body,
  //     requestOptions
  //   );
  // }
}

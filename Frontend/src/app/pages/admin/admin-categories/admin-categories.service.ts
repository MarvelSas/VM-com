import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpApiService } from 'src/app/shared/services/http-api.service';

interface ICategoriesResponseData {
  //   id: number;
  //   name: string;
  data: {
    productCategory: boolean;
  };
  message: string;
  status: string;
  statusCode: number;
  timeStamp: string;
}

interface ICategoriesGetResponseData {
  data: {
    productCategories: any;
  };
}

@Injectable({
  providedIn: 'root',
})
export class adminCategoriesService {
  constructor(
    private http: HttpClient,
    private httpApiService: HttpApiService
  ) {}
  API_URL = 'http://localhost:8080/api/v1/product/productCategory/add';

  getCategories() {
    const token = this.httpApiService.user.value.token;
    const headerDict = {
      Authorization: `Bearer ${token}`,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get<ICategoriesGetResponseData>(
      'http://localhost:8080/api/v1/product/productCategory/getAll',
      requestOptions
    );
  }

  addCategory(categoryName) {
    const body = { name: categoryName };
    const token = this.httpApiService.user.value.token;

    const headerDict = {
      Authorization: `Bearer ${token}`,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post<ICategoriesResponseData>(
      this.API_URL,
      body,
      requestOptions
    );
  }
}

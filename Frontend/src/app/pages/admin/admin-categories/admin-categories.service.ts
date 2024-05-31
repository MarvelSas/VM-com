import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { endpoints } from 'src/enums/endpoints.enum';

import { HttpApiService } from 'src/app/shared/services/http-api.service';

import { ICategoriesGetResponseData } from '../admin-categories/category.model';
import { ICategoriesAddResponseData } from '../admin-categories/category.model';

@Injectable({
  providedIn: 'root',
})
export class adminCategoriesService {
  constructor(
    private http: HttpClient,
    private httpApiService: HttpApiService
  ) {}
  API_URL = environment.API_URL;

  getCategories() {
    const token = this.httpApiService.user.value.token;
    const headerDict = {
      Authorization: `Bearer ${token}`,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get<ICategoriesGetResponseData>(
      this.API_URL + endpoints.getAllCategories,
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

    return this.http.post<ICategoriesAddResponseData>(
      this.API_URL + endpoints.addCategory,
      body,
      requestOptions
    );
  }

  updateCategory(categoryId, newCategoryName) {
    const body = newCategoryName;
    const token = this.httpApiService.user.value.token;

    const headerDict = {
      Authorization: `Bearer ${token}`,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.patch(
      this.API_URL + endpoints.updateCategory + '/' + categoryId,
      body,
      requestOptions
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { endpoints } from 'src/enums/endpoints.enum';

import { ICategoriesGetResponseData } from '../admin-categories/category.model';
import { ICategoriesAddResponseData } from '../admin-categories/category.model';

@Injectable({
  providedIn: 'root',
})
export class adminCategoriesService {
  constructor(private http: HttpClient) {}
  API_URL = environment.API_URL;

  getCategories() {
    return this.http.get<ICategoriesGetResponseData>(
      this.API_URL + endpoints.getAllCategories
    );
  }

  addCategory(categoryName) {
    const body = { name: categoryName };

    return this.http.post<ICategoriesAddResponseData>(
      this.API_URL + endpoints.addCategory,
      body
    );
  }

  updateCategory(categoryId, newCategoryName) {
    const body = newCategoryName;

    return this.http.patch(
      this.API_URL + endpoints.updateCategory + '/' + categoryId,
      body
    );
  }

  deleteCategory(categoryId) {
    return this.http.delete(
      this.API_URL + endpoints.deleteCategory + '/' + categoryId
    );
  }
}

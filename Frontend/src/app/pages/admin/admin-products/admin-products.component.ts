import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { adminProductsService } from './admin-products.service';
import { IProduct } from 'src/app/shared/models/product.model';
import { ICategory } from '../admin-categories/category.model';
import { adminCategoriesService } from '../admin-categories/admin-categories.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit {
  addProductForm: FormGroup;
  products: IProduct[];
  categories: ICategory[];

  constructor(
    private adminProductsService: adminProductsService,
    private adminCategoriesService: adminCategoriesService
  ) {}

  onSubmit() {
    if (!this.addProductForm.valid) {
      return;
    }
    const productName = this.addProductForm.value.productName;
    const productPrice = this.addProductForm.value.productPrice;
    const productDescription = this.addProductForm.value.productDescription;
    const imageUrl = '';
    const productCategory =
      this.categories[this.addProductForm.value.productCategory];
    this.adminProductsService
      .addProduct(
        productName,
        productPrice,
        imageUrl,
        productDescription,
        productCategory
      )
      .subscribe((res) => {
        console.log(res);
      });
    // console.log(this.addProductForm.value);
  }
  onClear() {
    this.addProductForm.reset();
  }

  ngOnInit(): void {
    this.adminProductsService.getProducts().subscribe((res) => {
      this.products = res.data.products;
      console.log(res);
    });
    this.adminCategoriesService.getCategories().subscribe((res) => {
      this.categories = res.data.productCategories;
      console.log(res.data.productCategories);
    });
    this.addProductForm = new FormGroup({
      productName: new FormControl(null, Validators.required),
      productDescription: new FormControl(null, Validators.required),
      productPrice: new FormControl(null, Validators.required),
      productCategory: new FormControl(null, Validators.required),
    });
  }
}

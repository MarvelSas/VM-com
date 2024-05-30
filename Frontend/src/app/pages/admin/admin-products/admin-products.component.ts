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
  formData: FormData = new FormData();
  characterCount: number = 0;

  constructor(
    private adminProductsService: adminProductsService,
    private adminCategoriesService: adminCategoriesService
  ) {}

  onAddFile(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.formData.append('picture', file);
  }

  onSubmitNew() {
    if (!this.addProductForm.valid) {
      return;
    }

    const productName = this.addProductForm.value.productName;
    const productPrice = this.addProductForm.value.productPrice;
    const productDescription = this.addProductForm.value.productDescription;
    const productAmount = this.addProductForm.value.productAmount;
    const productCategory =
      this.categories[this.addProductForm.value.productCategory - 1];

    const product = {
      name: productName,
      price: productPrice,
      productCategory: productCategory,
      amount: productAmount,
      description: productDescription,
    };

    console.log(product);

    this.formData.append(
      'product',
      new Blob([JSON.stringify(product)], { type: 'application/json' })
    );

    this.adminProductsService.addProductNew(this.formData).subscribe((res) => {
      console.log(res);
    });

    this.onClear();
  }

  //
  // OLD
  //
  // onSubmit() {
  //   if (!this.addProductForm.valid) {
  //     return;
  //   }

  //   const productName = this.addProductForm.value.productName;
  //   const productPrice = this.addProductForm.value.productPrice;
  //   const productDescription = this.addProductForm.value.productDescription;
  //   const imageUrl = '';
  //   const productCategory =
  //     this.categories[this.addProductForm.value.productCategory - 1];

  //   this.adminProductsService
  //     .addProduct(
  //       productName,
  //       productPrice,
  //       imageUrl,
  //       productDescription,
  //       productCategory
  //     )
  //     .subscribe((res) => {
  //       console.log(res);
  //     });
  // }

  onClear() {
    this.addProductForm.reset();
  }

  ngOnInit(): void {
    this.adminProductsService.getProducts().subscribe((res) => {
      this.products = res.data.products;
      // console.log(res);
    });
    this.adminCategoriesService.getCategories().subscribe((res) => {
      this.categories = res.data.productCategories;
      // console.log(res.data.productCategories);
    });
    this.addProductForm = new FormGroup({
      productName: new FormControl(null, Validators.required),
      productDescription: new FormControl(null, [
        Validators.required,
        Validators.maxLength(8000),
      ]),
      productPrice: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[\d,\.]+$/),
      ]),
      productAmount: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\d+$/),
      ]),
      productImage: new FormControl(null, Validators.required),
      productCategory: new FormControl(null, Validators.required),
    });

    this.addProductForm
      .get('productDescription')!
      .valueChanges.subscribe((value) => {
        this.characterCount = value ? value.length : 0;
      });
  }
}

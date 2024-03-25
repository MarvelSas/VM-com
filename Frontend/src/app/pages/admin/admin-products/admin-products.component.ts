import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { adminProductsService } from './admin-products.service';
import { IProduct } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit {
  addProductForm: FormGroup;
  products: IProduct[];

  constructor(private adminProductsService: adminProductsService) {}

  onSubmit() {
    if (!this.addProductForm.valid) {
      return;
    }
    const productName = this.addProductForm.value.productName;
    const productPrice = this.addProductForm.value.productPrice;
    const productDescription = this.addProductForm.value.productDescription;
    const imageUrl = '';
    const productCategory = this.addProductForm.value.productCategory;
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
    this.addProductForm = new FormGroup({
      productName: new FormControl(null, Validators.required),
      productDescription: new FormControl(null, Validators.required),
      productPrice: new FormControl(null, Validators.required),
      productCategory: new FormControl(null, Validators.required),
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit {
  addProductForm: FormGroup;

  constructor() {}

  onSubmit() {
    if (!this.addProductForm.valid) {
      return;
    }
    console.log(this.addProductForm.value);
  }
  onClear() {
    this.addProductForm.reset();
  }

  ngOnInit(): void {
    this.addProductForm = new FormGroup({
      productName: new FormControl(null, Validators.required),
      productDescription: new FormControl(null, Validators.required),
      productPrice: new FormControl(null, Validators.required),
      productCategory: new FormControl(null, Validators.required),
    });
  }
}

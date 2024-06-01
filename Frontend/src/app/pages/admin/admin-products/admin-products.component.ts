import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { adminProductsService } from './admin-products.service';
import { IProduct } from 'src/app/shared/models/product.model';
import { ICategory } from '../admin-categories/category.model';
import { adminCategoriesService } from '../admin-categories/admin-categories.service';
import { ToastrService } from 'ngx-toastr';

interface IImage {
  imageUrl: string;
  isSelected: boolean;
}

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
  images: IImage[] = [];

  constructor(
    private adminProductsService: adminProductsService,
    private adminCategoriesService: adminCategoriesService,
    private toastr: ToastrService
  ) {}

  // OLD
  // onAddFile(event: Event) {
  //   const file = (event.target as HTMLInputElement).files[0];
  //   this.formData.append('picture', file);
  // }

  // PRZESYŁANIE ZDJĘĆ NA SERWER
  onAddImage(e: any) {
    for (let i = 0; i < e.target.files.length; i++) {
      this.adminProductsService.uploadPhoto(e.target.files[i]).subscribe({
        next: (res) => {
          this.images.push({ imageUrl: res.imageUrl, isSelected: false });
          // console.log(this.images);
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  // PRZESŁANIE FORMULARZA Z PRODUKTEM NA SERWER
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

    this.formData.append(
      'product',
      new Blob([JSON.stringify(product)], { type: 'application/json' })
    );

    // WYODRĘBNIA Z TABLICY TYLKO URL ZDJĘĆ
    const imagesUrls = this.images.map((image) => {
      return image.imageUrl;
    });

    // DODANIE DO FORMULARZA URL ZDJĘĆ
    this.formData.append('images', JSON.stringify(imagesUrls));

    this.adminProductsService.addProductNew(this.formData).subscribe({
      next: (res) => {
        if (res.statusCode === 200) {
          this.toastr.success('Pomyślnie dodano produkt!', null, {
            positionClass: 'toast-bottom-right',
          });
        }
      },
      error: (err) => {
        console.error(err.message);
        this.toastr.error('Błąd dodawania produktu!', null, {
          positionClass: 'toast-bottom-right',
        });
      },
    });

    this.adminProductsService.addProductNew(this.formData).subscribe();

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

  // WYCZYSZCZENIE FORMULARZA
  onClear() {
    this.addProductForm.reset();
  }

  // INICJALIZACJA
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

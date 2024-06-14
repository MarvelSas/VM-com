import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { environment } from 'src/environments/environment';

import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  id: number = 0;
  product: any = {};
  selectedImage: number = 0;
  isLoading = false;
  API_IMG = environment.API_IMG;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  onBuyProduct() {
    console.log('Buy product ID: ', this.id);
  }

  onImageClick(url) {
    console.log('Image opened in new tab!');
    window.open(url, '_blank');
  }

  onPreviousImage() {
    if (this.selectedImage > 0) {
      this.selectedImage--;
    }
  }

  onNextImage() {
    if (this.selectedImage < this.product.photos.length - 1) {
      this.selectedImage++;
    }
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    // console.log(this.id);

    this.productsService.getProduct(this.id).subscribe((product) => {
      this.product = product.data.product;
      this.isLoading = false;
      console.log(this.product.photos[0]);
    });
  }
}

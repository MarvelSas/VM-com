import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  id: number = 0;
  product: any = {};
  apiUrl = environment.apiUrl;

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

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    // console.log(this.id);

    this.productsService.getProduct(this.id).subscribe((product) => {
      this.product = product.data.product;
      // console.log(this.product);
    });
  }
}

import { Component } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product.model';
import { ProductsService } from 'src/app/shared/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  products: IProduct[] = [];
  isLoading = false;
  API_IMG = environment.API_IMG;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.productsService.getProducts().subscribe((res) => {
      this.products = res.data.products;
      this.isLoading = false;
      // console.log(this.products);
      // console.log(this.products[1]);
    });
  }
}

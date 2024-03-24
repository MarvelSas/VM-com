import { Component } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product.model';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  products: IProduct[] = [];

  constructor(private productsService: ProductsService) {}
  ngOnInit(): void {
    this.productsService.getProducts().subscribe((res) => {
      this.products = res.data.products;
      console.log(res);
      console.log(this.products[1]);
    });
  }
}

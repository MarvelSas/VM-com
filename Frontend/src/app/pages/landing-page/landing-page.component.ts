import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product.model';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  public slides = [
    {
      src: 'https://assets-global.website-files.com/5c895551cef9097fb47eaaa6/5c89580457d74f47ce70f5e6_Screen-Shot-2018-10-22-at-2.51.25-PM.png',
    },
    {
      src: 'https://i.ytimg.com/vi/G2tmDB_eMBw/maxresdefault.jpg',
    },
    {
      src: 'https://hackaday.com/wp-content/uploads/2014/06/high-voltage-monitor-power-supply.jpg',
    },
    {
      src: 'https://hackaday.com/wp-content/uploads/2023/08/crt-transplant-in-progress.png',
    },
  ];

  products: IProduct[] = [];

  constructor(private productsService: ProductsService) {}
  ngOnInit(): void {
    this.productsService.getProducts().subscribe((res) => {
      this.products = res;
      console.log(res);
      console.log(this.products[1]);
    });
  }
}

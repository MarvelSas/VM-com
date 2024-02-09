import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
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

  products = [
    {
      name: 'Samsung Galaxy M34 5G 6/128GB',
      price: '999',
      imgSrc:
        'https://cdn.x-kom.pl/i/setup/images/prod/big/product-small,,2024/1/pr_2024_1_12_9_6_21_336_01.jpg',
    },
    {
      name: 'Xiaomi Redmi Note 13 Pro 8/256GB',
      price: '1299',
      imgSrc:
        'https://cdn.x-kom.pl/i/setup/images/prod/big/product-small,,2024/1/pr_2024_1_16_9_55_28_967_00.jpg',
    },
    {
      name: 'MSI G272QPF',
      price: '1349',
      imgSrc:
        'https://cdn.x-kom.pl/i/setup/images/prod/big/product-small,,2023/6/pr_2023_6_9_13_59_0_722_00.jpg',
    },
  ];
}

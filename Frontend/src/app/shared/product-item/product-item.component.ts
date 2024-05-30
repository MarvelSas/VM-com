import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() id: number;
  @Input() imgSrc: any;
  @Input() name: any;
  @Input() price: any;
  API_IMG = environment.API_IMG;
  // console.log(this.name)

  constructor(private router: Router, private route: ActivatedRoute) {}

  onSelectItem() {
    this.router.navigate(['product', this.id]);
    // console.log(this.id);
  }
}

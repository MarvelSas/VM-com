import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}
  onProductsButton() {
    this.router.navigate(['products'], { relativeTo: this.route });
  }
  onCategoriesButton() {
    this.router.navigate(['categories'], { relativeTo: this.route });
  }
}

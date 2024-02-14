import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  searchCategory: string = 'Kategoria';

  onChangeCategory(e: any) {
    // console.log(e.target.textContent);
    this.searchCategory = e.target.textContent;
  }
}

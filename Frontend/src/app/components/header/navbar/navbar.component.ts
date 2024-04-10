import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpApiService } from 'src/app/shared/services/http-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  searchCategory: string = 'Kategoria';
  userSub: Subscription;

  constructor(private httpApiService: HttpApiService) {}

  user = null;

  ngOnInit(): void {
    this.userSub = this.httpApiService.user.subscribe((res) => {
      this.user = res;
    });
  }

  logout() {
    this.httpApiService.signOut();
  }

  onChangeCategory(e: any) {
    // console.log(e.target.textContent);
    this.searchCategory = e.target.textContent;
  }
}

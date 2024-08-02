import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  searchCategory: string = 'Kategoria';
  userSub: Subscription;

  constructor(private authService: AuthService) {}

  user = null;

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((res) => {
      this.user = res;
    });
  }

  logout() {
    this.authService.signOut();
  }

  onChangeCategory(e: any) {
    // console.log(e.target.textContent);
    this.searchCategory = e.target.textContent;
  }
}

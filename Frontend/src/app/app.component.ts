import { Component, OnInit } from '@angular/core';
import { HttpApiService } from './shared/services/http-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'VM-com - Sklep komputerowy';

  constructor(private httpApiService: HttpApiService) {}

  ngOnInit(): void {
    this.httpApiService.autoLogin();
  }
}

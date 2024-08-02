import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CategoriesComponent } from './header/categories/categories.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    CategoriesComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, FooterComponent],
})
export class LayoutModule {}

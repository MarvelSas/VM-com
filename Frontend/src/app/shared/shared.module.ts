import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    ProductItemComponent,
    SideMenuComponent,
    SlideshowComponent,
  ],
  imports: [CommonModule],
  exports: [SideMenuComponent, LoadingSpinnerComponent, ProductItemComponent],
})
export class SharedModule {}

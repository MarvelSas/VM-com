import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CategoriesComponent],
  imports: [CommonModule, SharedModule],
  exports: [CategoriesComponent],
})
export class CategoriesModule {}

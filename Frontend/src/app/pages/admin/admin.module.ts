import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { Router, RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AdminComponent,
    AdminCategoriesComponent,
    AdminProductsComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [AdminComponent, AdminCategoriesComponent, AdminProductsComponent],
})
export class AdminModule {}

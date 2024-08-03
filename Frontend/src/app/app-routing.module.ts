import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/user/login/login.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ShopingCartComponent } from './pages/shoping-cart/shoping-cart.component';
import { VerifyEmailComponent } from './pages/user/verify-email/verify-email.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminProductsComponent } from './pages/admin/admin-products/admin-products.component';
import { AdminCategoriesComponent } from './pages/admin/admin-categories/admin-categories.component';
import { AuthGuard } from './core/guards/auth.guard';
import { CategoriesComponent } from './pages/categories/categories.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'products', component: ProductsComponent },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
  },
  { path: 'c/:category', component: CategoriesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: ShopingCartComponent, canActivate: [AuthGuard] },
  { path: 'verify-email', component: VerifyEmailComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'products', component: AdminProductsComponent },
      { path: 'categories', component: AdminCategoriesComponent },
    ],
  },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

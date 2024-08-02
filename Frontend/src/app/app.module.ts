import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ShopingCartComponent } from './pages/shoping-cart/shoping-cart.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { UserModule } from './pages/user/user.module';
import { AdminModule } from './pages/admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    PageNotFoundComponent,
    ShopingCartComponent,
    ProductsComponent,
    ProductDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    LayoutModule,
    SharedModule,
    UserModule,
    // AdminModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

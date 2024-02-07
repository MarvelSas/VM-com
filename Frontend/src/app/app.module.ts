import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/header/navbar/navbar.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ShopingCartComponent } from './pages/shoping-cart/shoping-cart.component';
import { CategoriesComponent } from './components/header/categories/categories.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LandingPageComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    PageNotFoundComponent,
    ShopingCartComponent,
    CategoriesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

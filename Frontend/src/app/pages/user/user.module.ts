import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, VerifyEmailComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [LoginComponent, RegisterComponent, VerifyEmailComponent],
})
export class UserModule {}

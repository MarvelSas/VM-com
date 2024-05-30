import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { HttpApiService } from '../../shared/services/http-api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;

  constructor(
    private httpApiService: HttpApiService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  onLoginHandler() {
    if (this.signInForm.valid) {
      this.httpApiService.signIn(this.signInForm.value).subscribe({
        next: (res) => {
          if (res.statusCode === 200) {
            this.toastr.success('Zalogowano pomyślnie!', null, {
              positionClass: 'toast-bottom-right',
            });
            this.router.navigate(['/']);
          }
        },
        error: (err) => {
          console.error(err.message);
          this.toastr.error('Błąd logowania!', null, {
            positionClass: 'toast-bottom-right',
          });
        },
      });
    }
  }

  //     firstname: 'Marvel',
  //     lastname: 'Sas',
  //     email: 'marvel@gmail.com',
  //     password: 'test123',
}

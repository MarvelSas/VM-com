import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  onRegisterHandler() {
    if (this.signUpForm.valid) {
      this.authService.signUp(this.signUpForm.value).subscribe({
        next: (res) => {
          this.toast.success('Zarejestrowano pomyślnie!', null, {
            positionClass: 'toast-bottom-right',
          });
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err.message);

          // TODO
          // if (err.error.message === 'User already exists!')
          //   this.toast.error('Użytkownik już istnieje!', null, {
          //     positionClass: 'toast-bottom-right',
          //   });

          this.toast.error('Błąd rejestracji!', null, {
            positionClass: 'toast-bottom-right',
          });
        },
      });
    }
  }

  //     email: 'marvel@gmail.com',
  //     password: 'test123',
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpApiService } from 'src/app/shared/services/http-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(private httpApiService: HttpApiService) {}

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
      this.httpApiService.signUp(this.signUpForm.value).subscribe((res) => {
        console.log(res);
      });
    }
  }

  //     email: 'marvel@gmail.com',
  //     password: 'test123',
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss'],
})
export class AdminCategoriesComponent implements OnInit {
  addCategoryForm: FormGroup;

  ngOnInit(): void {
    this.addCategoryForm = new FormGroup({
      categoryName: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    if (!this.addCategoryForm.valid) {
      return;
    }
    console.log(this.addCategoryForm.value);
  }
  onClear() {
    this.addCategoryForm.reset();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { adminCategoriesService } from './admin-categories.service';
import { Category, ICategory } from './category.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss'],
})
export class AdminCategoriesComponent implements OnInit {
  addCategoryForm: FormGroup;
  categories: ICategory[] = [];

  constructor(
    private adminCategoriesService: adminCategoriesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.adminCategoriesService.getCategories().subscribe((res) => {
      this.categories = res.data.productCategories;
      console.log(res);
    });
    this.addCategoryForm = new FormGroup({
      categoryName: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    if (!this.addCategoryForm.valid) {
      return;
    }
    const categoryName = this.addCategoryForm.value.categoryName;

    this.adminCategoriesService.addCategory(categoryName).subscribe({
      next: (res) => {
        console.log(res);
        if (res.statusCode === 200) {
          console.log('Successfully added category!');
          // const newId = Math.round(Math.random() * 1000); // TODO: Set id from response
          const newId = this.categories.length + 1;
          this.categories.push(new Category(newId, categoryName));
          this.toastr.success('Pomyślnie dodano kategorię!', null, {
            positionClass: 'toast-bottom-right',
          });
        }
      },
      error: (err) => {
        console.error(err.message);
        this.toastr.error('Błąd dodawania produktu!', null, {
          positionClass: 'toast-bottom-right',
        });
      },
    });
    console.log(this.addCategoryForm.value.categoryName);
  }
  onClear() {
    this.addCategoryForm.reset();
  }
}

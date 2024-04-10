import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { adminCategoriesService } from './admin-categories.service';
import { Category, ICategory } from './category.model';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss'],
})
export class AdminCategoriesComponent implements OnInit {
  addCategoryForm: FormGroup;
  categories: ICategory[] = [
    { id: 0, name: 'Kategoria 0' },
    { id: 1, name: 'Kategoria 1' },
  ];

  constructor(private adminCategoriesService: adminCategoriesService) {}

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
    this.adminCategoriesService.addCategory(categoryName).subscribe((res) => {
      if (res.statusCode === 200) {
        console.log('Successfully added category!');
        const newId = Math.round(Math.random() * 1000); // TODO: Set id from response
        this.categories.push(new Category(newId, categoryName));
      }
    });
    console.log(this.addCategoryForm.value.categoryName);
  }
  onClear() {
    this.addCategoryForm.reset();
  }
}

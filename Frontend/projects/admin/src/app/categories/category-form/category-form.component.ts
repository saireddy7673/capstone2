import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted: boolean = false;
  editMode: boolean = false;
  currentCategoryId: string;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });

    this.checkEditMode();
  }

  private checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.currentCategoryId = params['id'];
        this.categoriesService
          .getCategory(params['id'])
          .subscribe((category) => {
            this.form.controls['name'].setValue(category.name);
          });
      }
    });
  }

  cancel() {
    this.router.navigate(['/categories']);
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const category: Category = {
      id: this.currentCategoryId,
      name: this.form.controls['name'].value
    };

    if (this.editMode) {
      this.updateCategory(category);
    } else {
      this.addCategory(category);
    }
  }

  private addCategory(category: Category) {
    this.categoriesService.addCategory(category).subscribe(() => {
      this.isSubmitted = false;
      this.form.reset();
      timer(500)
        .toPromise()
        .then(() => {
          this.router.navigate(['/categories']);
        });
    });
  }

  private updateCategory(category: Category) {
    this.categoriesService.updateCategory(category).subscribe(() => {
      this.isSubmitted = false;
      this.form.reset();
      timer(500)
        .toPromise()
        .then(() => {
          this.router.navigate(['/categories']);
        });
    });
  }
}

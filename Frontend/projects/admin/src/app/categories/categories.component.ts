import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../models/category';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoriesService: CategoriesService, private router: Router) {}

  ngOnInit(): void {
    this.getCategories();
  }

  deleteCategory(id: string) {
    this.categoriesService.deleteCategory(id).subscribe((response) => {
      alert('Category is deleted');
      this.getCategories();
    });
  }

  updateCategory(id: string) {
    this.router.navigateByUrl(`categories/form/${id}`);
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
}
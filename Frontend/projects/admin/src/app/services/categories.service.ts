import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<Category[]>(
      'http://localhost:3000/api/v1/categories/'
    );
  }

  getCategory(id: string) {
    return this.http.get<Category>(
      `http://localhost:3000/api/v1/categories/${id}`
    );
  }

  addCategory(category: Category) {
    return this.http.post('http://localhost:3000/api/v1/categories/', category);
  }

  updateCategory(category: Category) {
    return this.http.put(`http://localhost:3000/api/v1/categories/${category.id}`, category);
  }

  deleteCategory(id: string) {
    return this.http.delete(`http://localhost:3000/api/v1/categories/${id}`);
  }
}

import { Component, OnInit } from '@angular/core';
import { Product } from 'projects/admin/src/app/models/product';
import { ProductsService } from 'projects/admin/src/app/services/products.service';

@Component({
  selector: 'app-bed',
  templateUrl: './bed.component.html',
  styleUrls: ['./bed.component.css'],
})
export class BedComponent implements OnInit {
  bedCategoryId = '62d7c47f76826632ec4e5a83';
  bedCategoryProducts: Product[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService
      .getProducts(this.bedCategoryId)
      .subscribe((products) => {
        this.bedCategoryProducts = products;
      });
  }
}

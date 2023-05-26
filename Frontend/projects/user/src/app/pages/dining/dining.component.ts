import { Component, OnInit } from '@angular/core';
import { Product } from 'projects/admin/src/app/models/product';
import { ProductsService } from 'projects/admin/src/app/services/products.service';

@Component({
  selector: 'app-dining',
  templateUrl: './dining.component.html',
  styleUrls: ['./dining.component.css']
})
export class DiningComponent implements OnInit {

  CategoryId = "62d7c48c76826632ec4e5a85";
  CategoryProducts: Product[] = [];

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productService.getProducts(this.CategoryId).subscribe((products) => {
      this.CategoryProducts = products;
    })
  }

}

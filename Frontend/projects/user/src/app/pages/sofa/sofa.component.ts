import { Component, OnInit } from '@angular/core';
import { Product } from 'projects/admin/src/app/models/product';
import { ProductsService } from 'projects/admin/src/app/services/products.service';

@Component({
  selector: 'app-sofa',
  templateUrl: './sofa.component.html',
  styleUrls: ['./sofa.component.css'],
})
export class SofaComponent implements OnInit {
  sofaCategoryId = '62d7c48576826632ec4e5a84';
  sofaCategoryProducts: Product[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService
      .getProducts(this.sofaCategoryId)
      .subscribe((products) => {
        this.sofaCategoryProducts = products;
      });
  }
  send(){
    alert("feedback submited sucessfully")
  }
}

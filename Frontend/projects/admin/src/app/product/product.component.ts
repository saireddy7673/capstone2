import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;    
    });
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe((product) => {
      alert('Product is Deleted');
      this.getProducts();
    });
  }

  updateProduct(id: string) {
    this.router.navigateByUrl(`products/form/${id}`)
  }
}

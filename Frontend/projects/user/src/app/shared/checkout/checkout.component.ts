import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'projects/admin/src/app/models/order';
import { OrderItem } from 'projects/admin/src/app/models/order-item';
import { OrderService } from 'projects/admin/src/app/services/order.service';
import { Cart } from '../../models/cart';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  isSubmitted = false;
  form: FormGroup;
  orderItems: OrderItem[] = [];
  userId: string = localStorage.getItem('userId');

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      street: ['', Validators.required],
      apartment: ['', Validators.required],
      zip: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
    });
    this.getCartItems();
  }

  private getCartItems() {
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity,
      };
    });
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const order: Order = {
      orderItem: this.orderItems,
      shippingAddress1: this.form.controls['street'].value,
      shippingAddress2: this.form.controls['apartment'].value,
      zip: this.form.controls['zip'].value,
      city: this.form.controls['city'].value,
      country: this.form.controls['country'].value,
      phone: this.form.controls['phone'].value,
      status: 'Pending',
      user: this.userId,
      dateOrdered: `${Date.now()}`,
    };

    this.orderService.addOrder(order).subscribe((order) => {
      this.cartService.emptyCart();
      this.router.navigate(['/payment']);
    });
  }

  back() {
    this.router.navigate(['/cart']);
  }
}

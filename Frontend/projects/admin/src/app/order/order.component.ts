import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.getOrders();
  }

  private getOrders() {
    this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }

  deleteOrder(id: string) {
    this.orderService.deleteOrder(id).subscribe((response) => {
      alert('Order is deleted');
      this.getOrders();
    });
  }

  showOrder(id: string) {
    this.router.navigateByUrl(`orders/${id}`);
  }
}

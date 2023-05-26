import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrders() {
    return this.http.get<Order[]>('http://localhost:3000/api/v1/orders/');
  }

  getOrder(id: string) {
    return this.http.get<Order>(`http://localhost:3000/api/v1/orders/${id}`);
  }

  addOrder(order: Order) {
    return this.http.post('http://localhost:3000/api/v1/orders/', order);
  }


  deleteOrder(id: string) {
    return this.http.delete(`http://localhost:3000/api/v1/orders/${id}`);
  }

  getOrderNumber() {
    return this.http.get('http://localhost:3000/api/v1/orders/get/count');
  }
  
 
}

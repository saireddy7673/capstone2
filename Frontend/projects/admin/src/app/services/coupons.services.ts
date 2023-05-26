import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coupon } from '../models/coupon';

@Injectable({
  providedIn: 'root',
})

export class CouponsService {
  constructor(private http: HttpClient) {}

  getCoupons(){
    return this.http.get<Coupon[]>(
      'http://localhost:3000/api/v1/discount/'
    );
  }
  
  getCoupon(id:string){
    return this.http.get<Coupon>(
      `http://localhost:3000/api/v1/discount/${id}`
    );
  }

  addCoupon(coupon:Coupon){
    return this.http.post('http://localhost:3000/api/v1/discount/addcoupen', coupon);
  }

  useCoupon(coupon:string){
    return this.http.post('http://localhost:3000/api/v1/discount/usecoupen', coupon);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coupon } from '../models/coupon';
import { CouponsService } from '../services/coupons.services';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {

  coupons: Coupon[] = [];

  constructor(
    private router:Router,
    private couponService:CouponsService
  ) { }

  ngOnInit(): void {
    this.coupen()
  }
  coupen(){
    this.couponService.getCoupons().subscribe((coupen)=>{
      this.coupons = coupen;
    })
  }
}

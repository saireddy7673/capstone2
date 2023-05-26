import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Coupon } from 'projects/admin/src/app/models/coupon';
import { CouponsService } from 'projects/admin/src/app/services/coupons.services';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  isSubmitted = false;
  coupons: Coupon
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private coupenService : CouponsService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      cardnumber: ['', Validators.required],
      cvv: ['', Validators.required],
      expiry: ['', Validators.required],
    });
  }

  coupenApply(){
    let coupen = this.form.controls['coupon'].value
    console.log(coupen);
    this.coupenService.useCoupon(coupen).subscribe(
      (data=>{
        console.log(data);
      })
    )    
  }
  pay(){
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    this.router.navigate(['/thank-you'])
  }
}
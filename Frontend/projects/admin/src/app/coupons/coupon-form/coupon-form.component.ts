import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { Coupon } from '../../models/coupon';
import { CouponsService } from '../../services/coupons.services';


@Component({
  selector: 'app-coupon-form',
  templateUrl: './coupon-form.component.html',
  styleUrls: ['./coupon-form.component.css']
})
export class CouponFormComponent implements OnInit {
   form: FormGroup;
  isSubmitted: boolean = false;
  editMode: boolean = false;
  currentCouponId: string;


  constructor(
    private formBuilder: FormBuilder,
    private couponService: CouponsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      coupen: ['', Validators.required],
      discountpercent: ['', Validators.required]
    });
  
    this.checkEditMode();
  }
 
  
  private checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.currentCouponId = params['id'];
        this.couponService
          .getCoupon(params['id'])
          .subscribe((coupon) => {
            this.form.controls['coupen'].setValue(coupon.coupen);
            this.form.controls['discountpercent'].setValue(coupon.discountpercent)
          });
      }
    });
  }

  cancel() {
    this.router.navigate(['/coupons']);
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const coupon: Coupon = {
      coupen: this.form.controls['coupen'].value,
      discountpercent: this.form.controls['discountpercent'].value
    };
    this.couponService.addCoupon(coupon).subscribe(() => {
      this.isSubmitted = false;
      this.form.reset();
      timer(500)
        .toPromise()
        .then(() => {
          this.router.navigate(['/coupons']);
        });
      })
  }
  
}
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Coupon } from 'projects/admin/src/app/models/coupon';
import { CouponsService } from 'projects/admin/src/app/services/coupons.services';
import { ProductsService } from 'projects/admin/src/app/services/products.service';
import { Subject, take, takeUntil } from 'rxjs';
import { cartItemDetail } from '../models/cart';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  form: FormGroup;
  coupenFound : Coupon;
  coupons: Coupon[] = [];
  cartItems: cartItemDetail[] = [];
  endSubs: Subject<any> = new Subject();
  totalPrice: number;
  discount:number;
  tPrice:number;
  itemPrice:number;
  test: any;

  constructor(
    private router: Router,
    private couponService:CouponsService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.getCartDetails();
    this.getTotalPrice();
    this.coupenAppl();
    this.form = this.formBuilder.group({
      coupon:['']
    })
  }

  ngOnDestroy(): void {
    this.endSubs.next;
    this.endSubs.complete();
  }
  coupenAppl(){
    this.couponService.getCoupons().subscribe((coupen)=>{
      this.coupons = coupen;
      console.log(this.coupons)
    })
   }

  private getCartDetails() {
    this.cartService.cart.pipe(takeUntil(this.endSubs)).subscribe((res) => {
      this.cartItems = [];
      res.items.forEach((cartItem) => {
        this.productService
          .getProduct(cartItem.productId)
          .subscribe((product) => {
            this.cartItems.push({
              product: product,
              quantity: cartItem.quantity,
            });
          });
      });
    });
  }

  private getTotalPrice() {
    this.cartService.cart.pipe(takeUntil(this.endSubs)).subscribe((cart) => {
      this.totalPrice = 0;
      this.test = 1
      if (cart) {
        cart.items.map((item) => {
          this.productService
            .getProduct(item.productId)
            .pipe(take(1))
            .subscribe((product) => {
              if(!(this.coupenFound)){
                this.totalPrice += product.price * item.quantity;
                this.itemPrice = this.totalPrice
                this.tPrice = this.totalPrice;
              }
              else{
                this.discount = parseInt(`${this.coupenFound.discountpercent}`)/100
                this.totalPrice += product.price * item.quantity;
              }
              if((this.test) && this.discount ){
                this.tPrice *= this.discount;
                this.totalPrice = this.totalPrice - this.tPrice;
                this.test=0
              }
      });
        });
      }
    })
  }

  updateQuantity(event, item) {
    this.cartService.setCartItem(
      {
        productId: item.product.id,
        quantity: event.target.value,
      },
      true
    );
  }

  onCheckout() {
    this.router.navigate(['/checkout']);
  }

  back() {
    this.router.navigate(['/home']);
  }

  delete(item: cartItemDetail) {
    this.cartService.deleteCartItem(item.product.id);
  }
  coupenApply(){
    
    let coupen = this.form.controls['coupon'].value
    for(let i:number = 0;i<11;i+=1){
      if(this.coupons[i].coupen == coupen){
        this.coupenFound = this.coupons[i]
        alert(`coupen applied ${this.coupenFound.discountpercent} %discount`)
        this.getTotalPrice()
        break;
      }
  }
  if(!(this.coupenFound)){
    alert("invalid coupen")
  }
  
}

}


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userName: string = localStorage.getItem('userName');
  constructor(
    private router: Router,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {}

  logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    this.cartService.emptyCart();
    this.wishlistService.emptyWishlist();
    this.router.navigate(['/home']);
    window.location.reload();
  }

  login() {
    this.router.navigate(['/login']);
  }
}

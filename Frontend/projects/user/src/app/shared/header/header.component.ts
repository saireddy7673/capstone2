import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {



  constructor(cartService: CartService, wishlistService: WishlistService) {
    cartService.cartLocalStorage();
    wishlistService.wishlistLocalStorage();
  }

  ngOnInit(): void {
  }

}

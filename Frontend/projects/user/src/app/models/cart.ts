import { Product } from 'projects/admin/src/app/models/product';

export interface Cart {
  items: CartItem[];
}

export interface Wishlist {
  wishlistItem: CartItem[];
}

export interface CartItem {
  productId?: string;
  quantity?: number;
}

export interface cartItemDetail {
  product?: Product;
  quantity?: number;
}

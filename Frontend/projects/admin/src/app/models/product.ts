import { Category } from './category';

export interface Product {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  price?: number;
  category?: Category;
  countInStock?: number;
  dateCreated?: string;
}

import { OrderItem } from "./order-item";
import { User } from "./user";

export interface Order {
  id?: string;
  orderItem?: OrderItem[];
  shippingAddress1?: string;
  shippingAddress2?: string;
  zip?: string;
  city?: string;
  country?: string;
  phone?: string;
  status?: string;
  totalPrice?: number;
  user?: any;
  dateOrdered?: string;
}

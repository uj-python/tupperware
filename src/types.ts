export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  ratings?: number;
  reviewsCount?: number;
  isBpaFree?: boolean;
  isEcoFriendly?: boolean;
  isFridgeSafe?: boolean;
  isServing?: boolean;
  tags?: string[];
  specs?: {
    capacity?: string;
    material?: string;
    dimensions?: string;
    dishwasherSafe?: boolean;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  fullName: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
}

export type PaymentMethod = 'upi' | 'card' | 'netbanking';

export type OrderStatus = 'ordered' | 'packed' | 'shipped' | 'delivered';

export interface Order {
  id: string;
  status: OrderStatus;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  date: string;
  estimatedArrival: string;
  address: Address;
  paymentMethod: PaymentMethod;
}

export type Route = 'home' | 'shop' | 'pdp' | 'cart' | 'checkout' | 'profile' | 'track';

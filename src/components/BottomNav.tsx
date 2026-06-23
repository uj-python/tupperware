import React from 'react';
import { LayoutGrid, Sparkles, ShoppingCart, User } from 'lucide-react';
import { Route, CartItem } from '../types';

interface BottomProps {
  currentRoute: Route;
  setRoute: (route: Route) => void;
  cart: CartItem[];
}

export default function BottomNav({ currentRoute, setRoute, cart }: BottomProps) {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-4 pt-2 bg-white/90 backdrop-blur-md shadow-[0_-4px_20px_rgba(45,45,45,0.05)] rounded-t-xl border-t border-surface-container-high">
      <button 
        onClick={() => setRoute('shop')} 
        className={`flex flex-col items-center justify-center transition-all duration-200 scale-98 active:scale-95 py-1 px-3 rounded-full cursor-pointer ${
          currentRoute === 'shop' 
            ? 'bg-secondary-container text-on-secondary-container font-semibold' 
            : 'text-on-surface-variant hover:bg-soft-gray/20'
        }`}
        id="bottom-nav-shop"
      >
        <LayoutGrid className="w-5 h-5" />
        <span className="text-[10px] uppercase font-bold tracking-wider mt-0.5">Shop</span>
      </button>

      <button 
        onClick={() => setRoute('home')} 
        className={`flex flex-col items-center justify-center transition-all duration-200 scale-98 active:scale-95 py-1 px-3 rounded-full cursor-pointer ${
          currentRoute === 'home' || currentRoute === 'pdp'
            ? 'bg-secondary-container text-on-secondary-container font-semibold' 
            : 'text-on-surface-variant hover:bg-soft-gray/20'
        }`}
        id="bottom-nav-explore"
      >
        <Sparkles className="w-5 h-5" />
        <span className="text-[10px] uppercase font-bold tracking-wider mt-0.5">Explore</span>
      </button>

      <button 
        onClick={() => setRoute('cart')} 
        className={`relative flex flex-col items-center justify-center transition-all duration-200 scale-98 active:scale-95 py-1 px-3 rounded-full cursor-pointer ${
          currentRoute === 'cart' || currentRoute === 'checkout'
            ? 'bg-secondary-container text-on-secondary-container font-semibold' 
            : 'text-on-surface-variant hover:bg-soft-gray/20'
        }`}
        id="bottom-nav-cart"
      >
        <ShoppingCart className="w-5 h-5" />
        {totalItems > 0 && (
          <span className="absolute top-0 right-3 bg-primary text-white text-[9px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold">
            {totalItems}
          </span>
        )}
        <span className="text-[10px] uppercase font-bold tracking-wider mt-0.5">Cart</span>
      </button>

      <button 
        onClick={() => setRoute('profile')} 
        className={`flex flex-col items-center justify-center transition-all duration-200 scale-98 active:scale-95 py-1 px-3 rounded-full cursor-pointer ${
          currentRoute === 'profile' || currentRoute === 'track'
            ? 'bg-secondary-container text-on-secondary-container font-semibold' 
            : 'text-on-surface-variant hover:bg-soft-gray/20'
        }`}
        id="bottom-nav-profile"
      >
        <User className="w-5 h-5" />
        <span className="text-[10px] uppercase font-bold tracking-wider mt-0.5">Profile</span>
      </button>
    </nav>
  );
}

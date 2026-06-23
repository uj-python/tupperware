import React from 'react';
import { Menu, Search, ShoppingBag } from 'lucide-react';
import { Route, CartItem } from '../types';

interface HeaderProps {
  currentRoute: Route;
  setRoute: (route: Route) => void;
  cart: CartItem[];
  onBack?: () => void;
}

export default function Header({ currentRoute, setRoute, cart, onBack }: HeaderProps) {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md flex justify-between items-center px-5 h-16 w-full border-b border-surface-container-high">
      <div className="flex items-center gap-4">
        {onBack ? (
          <button 
            onClick={onBack}
            className="text-primary hover:opacity-80 transition-all p-1 hover:bg-surface-container rounded-full"
            id="back-button"
          >
            <span className="font-sans text-xl font-semibold flex items-center">&larr;</span>
          </button>
        ) : (
          <button 
             onClick={() => setRoute('home')}
             className="text-primary scale-95 active:scale-90 transition-transform cursor-pointer p-1"
             id="menu-button"
          >
            <Menu className="w-6 h-6" />
          </button>
        )}
        <h1 
          className="font-sans text-2xl font-black text-primary tracking-tighter cursor-pointer"
          onClick={() => setRoute('home')}
          id="app-title"
        >
          Tupperware
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setRoute('shop')} 
          className="text-on-surface-variant scale-95 active:scale-90 transition-transform cursor-pointer p-1 hover:text-primary"
          id="search-button"
        >
          <Search className="w-6 h-6" />
        </button>
        <div 
          className="relative cursor-pointer p-1"
          onClick={() => setRoute('cart')}
          id="cart-button-trigger"
        >
          <ShoppingBag className="w-6 h-6 text-on-surface-variant hover:text-primary transition-colors" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold animate-pulse">
              {totalItems}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}

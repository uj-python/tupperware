import React from 'react';
import { X, Plus, Minus, MoveRight, ShoppingCart, ShoppingBag, ShieldCheck } from 'lucide-react';
import { CartItem, Product, Route } from '../types';
import { products } from '../data';

interface CartScreenProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  setRoute: (route: Route) => void;
}

export default function CartScreen({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onAddToCart,
  setRoute
}: CartScreenProps) {
  // Upsell list
  const upsellProducts = products.filter(p => p.id === 'bottle-brush-basic' || p.id === 'silicone-divider');

  // Math equations
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = Number((subtotal * 0.08).toFixed(2));
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 4.99;
  const total = Number((subtotal + tax + shipping).toFixed(2));

  return (
    <div className="animate-fade-in pb-32">
      {/* Page Header */}
      <section className="px-5 pt-6 pb-2 max-w-7xl mx-auto">
        <h2 className="text-xl md:text-3xl font-black text-on-surface">Your Cart</h2>
        <p className="text-xs text-on-surface-variant/80 font-medium">
          {cart.length === 0 
            ? 'Your basket is currently empty' 
            : `${cart.reduce((acc, i) => acc + i.quantity, 0)} items ready for checkout`
          }
        </p>
      </section>

      {cart.length === 0 ? (
        /* Empty state view */
        <section className="px-5 py-16 text-center max-w-md mx-auto flex flex-col items-center">
          <div className="w-16 h-16 bg-warm-sand rounded-full flex items-center justify-center mb-4">
            <ShoppingCart className="w-8 h-8 text-on-surface-variant/60" />
          </div>
          <h3 className="text-lg font-bold mb-1">Your cart is feeling light</h3>
          <p className="text-on-surface-variant text-xs leading-relaxed mb-6">
            Discover our collection of sustainable, Japanese-minimalist kitchen storage units today and begin your organized lifestyle.
          </p>
          <button 
            onClick={() => setRoute('shop')}
            className="bg-primary hover:bg-heritage-red text-white text-xs font-bold tracking-widest px-8 py-3.5 rounded-full uppercase active:scale-95 transition-all cursor-pointer"
          >
            Explore Collective
          </button>
        </section>
      ) : (
        /* Stateful Cart Items View */
        <main className="max-w-xl mx-auto">
          {/* 1. Cart Items list */}
          <section className="px-5 space-y-4 mb-8 mt-4">
            {cart.map((item) => (
              <div 
                key={item.product.id}
                className="bg-white rounded-xl p-4 flex gap-4 japandi-shadow border border-soft-gray/15 transition-all duration-200 hover:border-outline-variant"
                id={`cart-item-${item.product.id}`}
              >
                {/* Product Thumbnail image */}
                <div className="w-24 h-24 bg-surface-container rounded-lg overflow-hidden flex-shrink-0 border border-soft-gray/10">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details stack */}
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-sans text-sm font-bold text-on-surface leading-tight truncate">
                        {item.product.name}
                      </h3>
                      <button 
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-on-surface-variant hover:text-primary transition-colors p-1"
                        title="Remove item"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-[10px] text-secondary font-bold tracking-wide flex items-center gap-1 mt-0.5 uppercase">
                      <ShieldCheck className="w-3.5 h-3.5 text-secondary fill-secondary/5" /> Sustainable Choice
                    </p>
                  </div>

                  {/* Pricing and quantities adjustments */}
                  <div className="flex justify-between items-center mt-2.5">
                    <div className="flex items-center bg-surface-container rounded-full px-2 py-1 gap-3.5 border border-soft-gray/20">
                      <button 
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="w-6 h-6 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all active:scale-90"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-sans text-xs font-black text-on-surface select-none">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="w-6 h-6 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all active:scale-90"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-sans text-sm font-black text-price-active">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* 2. Scrollable Upsell cross-sell Section */}
          <section className="mb-8 overflow-hidden pl-5">
            <h3 className="text-sm font-extrabold text-on-surface tracking-tight mb-4 select-none">
              You might also like
            </h3>
            <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-2 snap-x snap-mandatory">
              {upsellProducts.map((p) => (
                <div 
                  key={p.id}
                  className="flex-shrink-0 w-[180px] bg-warm-sand/40 hover:bg-warm-sand/55 rounded-xl p-3.5 snap-start border border-soft-gray/10 hover:border-outline-variant transition-all flex flex-col justify-between"
                >
                  <div className="w-full h-24 bg-white rounded-lg mb-3 relative overflow-hidden flex items-center justify-center border border-soft-gray/20">
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <button 
                      onClick={() => onAddToCart(p)}
                      className="absolute bottom-2.5 right-2.5 bg-primary hover:bg-heritage-red text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform cursor-pointer"
                      title="Add to bundle"
                    >
                      <span className="text-base font-bold font-sans">+</span>
                    </button>
                  </div>
                  <div>
                    <h4 className="font-bold text-[11px] text-on-surface-variant uppercase tracking-wider truncate mb-1">
                      {p.name}
                    </h4>
                    <p className="text-xs font-black text-price-active">
                      ${p.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Peek placeholder card */}
              <div className="flex-shrink-0 w-32 bg-warm-sand/15 rounded-xl border border-dashed border-soft-gray/30 p-3 h-full flex flex-col items-center justify-center select-none opacity-50">
                <ShoppingBag className="w-6 h-6 text-on-surface-variant/40 mb-1" />
                <span className="text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-widest text-center">New deals soon</span>
              </div>
            </div>
          </section>

          {/* 3. Calculations Order Summary card */}
          <section className="px-5 mb-12">
            <div className="bg-surface-container-low rounded-xl p-5 space-y-4 border border-soft-gray/25">
              <div className="flex justify-between items-center text-on-surface-variant text-xs font-semibold">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-on-surface-variant text-xs font-semibold">
                <span>Shipping</span>
                {shipping === 0 ? (
                  <span className="text-secondary font-bold font-sans uppercase">FREE</span>
                ) : (
                  <span>${shipping.toFixed(2)}</span>
                )}
              </div>
              <div className="flex justify-between items-center text-on-surface-variant text-xs font-semibold border-b border-soft-gray/30 pb-4">
                <span>Estimated Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-base font-extrabold text-on-surface">Total Order</span>
                <span className="text-2xl font-black text-price-active">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </section>

          {/* 4. Action floaters footer */}
          <div className="fixed bottom-0 left-0 w-full z-40 bg-gradient-to-t from-background via-background/95 to-transparent px-5 pb-8 pt-4">
            <button 
              onClick={() => setRoute('checkout')}
              className="w-full max-w-xl mx-auto bg-primary hover:bg-heritage-red text-white py-4 rounded-xl flex items-center justify-center gap-2 text-sm font-extrabold uppercase tracking-widest shadow-lg shadow-primary/20 duration-150 active:scale-98 transition-all group focus:outline-none"
              id="proceed-to-checkout-btn"
            >
              Proceed to Checkout
              <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </main>
      )}
    </div>
  );
}

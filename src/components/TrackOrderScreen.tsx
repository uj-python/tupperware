import React, { useState, useEffect } from 'react';
import { RefreshCw, PhoneCall, HelpCircle, ShieldCheck, MapPin, Truck, Check, AlertCircle, ShoppingBag, X } from 'lucide-react';
import { Route, Order, CartItem } from '../types';
import { mapsImage, pantryImage } from '../data';

interface TrackOrderScreenProps {
  lastOrder: Order | null;
  setRoute: (route: Route) => void;
}

export default function TrackOrderScreen({ lastOrder, setRoute }: TrackOrderScreenProps) {
  // If no last order exists, mock one to keep layout pristine as a fallback
  const mockOrder: Order = {
    id: 'TW-9823412',
    status: 'shipped',
    date: 'Oct 12',
    estimatedArrival: 'Today, by 6:00 PM',
    subtotal: 86.00,
    shipping: 0,
    tax: 4.56,
    total: 86.00,
    paymentMethod: 'card',
    address: {
      fullName: 'Sarah Chen',
      streetAddress: '124 Japandi Serenity Avenue, Apt 4B',
      city: 'Seattle',
      postalCode: '98101',
      phoneNumber: '+1 206-555-0143'
    },
    items: [
      {
        product: {
          id: 'eco-water-bottle-teal',
          name: 'Eco+ Water Bottle (750ml)',
          description: 'Sage Green water bottle',
          category: 'Hydration',
          price: 12.00,
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSZHjc4XKb2xdhdzCbvB6GKH6469e0Z8Y9DBq5aTg9Zo-uwTSLD7p0QIWqqaO3bqLA6BA2Va7cthBZMeUjlT1daneHwdQMFtyccx3zaCkYuNhXImY_NMhkS_e0UbD8BVCJEwO6hvuk5e5NmeqzoNTj6uQFVY2i9MPZXyKFlBt1nM1XyekuJi0asX0g2ZLjh3CUZYiBqKdz1XBZ_4zDJ_ZhwZUHTeVTiGCjBm3vpp94sCIZ6qFqz2Nk6eoy7TtjAAuxQ5LftVVq'
        },
        quantity: 2
      },
      {
        product: {
          id: 'modular-mates',
          name: 'Ultimate Silicone Bags',
          description: 'Terracotta Set',
          category: 'Conservation',
          price: 38.00,
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNmKRaq0Rs9QvPvMT964kc1hQJKtinPJcA7oWABD_huzH3jI9IprRo9b7zaKvhvIYmwkZwvdHQKbk2nXgQ6q_L4F6ow9cSOrmZhCW7AXu9cDTx0QNlmONjKHzvOBHiIixfU5SrAO8tB_9v9NShfHazFAdVcmMJc1D1MN7jG6c8lFfEwc_fZWdBSlLtR4_kp1WChAiiH27AONRjkq1PmBGlAPG-bLfr6QkgRDYCkE1b4U6iZZ9aMBGNp2a_hpV9ctKXtUgd9Og2'
        },
        quantity: 1
      }
    ]
  };

  const order = lastOrder || mockOrder;

  // Interactive map delivery van position state simulation
  const [vanPosition, setVanPosition] = useState({ x: 35, y: 55 });
  const [direction, setDirection] = useState(1);

  // Help support drawer
  const [helpOpen, setHelpOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setVanPosition(pos => {
        let nextX = pos.x + direction * 1.5;
        let nextDirection = direction;
        
        // Bounce back and forth on coordinate map path
        if (nextX > 68) {
          nextDirection = -1;
        } else if (nextX < 28) {
          nextDirection = 1;
        }

        return {
          x: nextX,
          y: 50 + Math.sin(nextX / 10) * 12 // smooth wiggle along road
        };
      });
    }, 700);

    return () => clearInterval(timer);
  }, [direction]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(8);
    }
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="animate-fade-in pb-28">
      {/* 1. Header Metadata Section */}
      <section className="px-5 pt-6 pb-2 max-w-xl mx-auto" id="tracking-header">
        <div className="flex justify-between items-end gap-4 select-none">
          <div>
            <p className="text-[10px] font-bold text-on-surface-variant/80 uppercase tracking-widest leading-none mb-1.5 font-mono">
              Order {order.id}
            </p>
            <h2 className="font-sans text-xl md:text-2xl font-black text-on-surface leading-none">
              Out for Delivery
            </h2>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-wider mb-1 leading-none">
              Estimated Arrival
            </p>
            <p className="font-sans text-sm md:text-base font-extrabold text-primary leading-none">
              {order.estimatedArrival}
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-xl mx-auto mt-4 px-5">
        
        {/* 2. Map Illustration Container */}
        <section className="relative h-48 w-full rounded-xl overflow-hidden japandi-shadow bg-surface-container mb-6 border border-soft-gray/25">
          {/* Map Base image */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center select-none"
            style={{ backgroundImage: `url('${mapsImage}')` }}
            referrerPolicy="no-referrer"
          />

          {/* Animated Delivery Van Icon indicator */}
          <div 
            style={{ left: `${vanPosition.x}%`, top: `${vanPosition.y}%` }}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-full shadow-lg border-2 border-white transition-all duration-700 animate-pulse pointer-events-none"
          >
            <Truck className="w-5 h-5 text-white fill-current" />
          </div>

          {/* Destination Home Icon marker */}
          <div className="absolute right-[22%] top-[38%] bg-secondary text-white p-1.5 rounded-full border border-white shadow shadow-secondary z-10 bounce-animation select-none">
            <Check className="w-3.5 h-3.5" />
          </div>

          {/* Carbon Neutral Delivery Badge overlay */}
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg flex items-center gap-1.5 border border-outline/10 shadow-sm select-none">
            <span className="text-eco-mint text-xs">🌱</span>
            <span className="text-[10px] font-extrabold text-on-surface uppercase tracking-wider">Carbon Neutral Delivery</span>
          </div>
        </section>

        {/* 3. Progress Milestones Stepper Track */}
        <section className="mb-8 bg-surface-container-lowest p-5 rounded-xl border border-outline/5 japandi-shadow select-none">
          <div className="relative flex justify-between">
            {/* Connector Line Background shadow */}
            <div className="absolute top-4 left-0 w-full h-[2px] bg-soft-gray z-0" />
            
            {/* Active Connector Line dynamic progress fill */}
            <div className="absolute top-4 left-0 w-3/4 h-[2px] bg-primary z-0" />
            
            {/* Step 1: Ordered */}
            <div className="relative z-10 flex flex-col items-center gap-2 w-1/4">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-sm">
                <Check className="w-4 h-4 stroke-[3px]" />
              </div>
              <span className="text-[9px] font-extrabold uppercase tracking-wide text-on-surface">Ordered</span>
              <span className="text-[9px] font-medium text-on-surface-variant/60 font-mono mt-0.5">{order.date}</span>
            </div>

            {/* Step 2: Packed */}
            <div className="relative z-10 flex flex-col items-center gap-2 w-1/4">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-sm">
                <Check className="w-4 h-4 stroke-[3px]" />
              </div>
              <span className="text-[9px] font-extrabold uppercase tracking-wide text-on-surface">Packed</span>
              <span className="text-[9px] font-medium text-on-surface-variant/60 font-mono mt-0.5">Oct 13</span>
            </div>

            {/* Step 3: Shipped */}
            <div className="relative z-10 flex flex-col items-center gap-2 w-1/4">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-sm animate-bounce">
                <Truck className="w-4 h-4 fill-current text-white" />
              </div>
              <span className="text-[9px] font-extrabold uppercase tracking-wide text-primary">Shipped</span>
              <span className="text-[9px] font-extrabold text-primary font-mono mt-0.5">Oct 14</span>
            </div>

            {/* Step 4: Delivered */}
            <div className="relative z-10 flex flex-col items-center gap-2 w-1/4 text-on-surface-variant/40">
              <div className="w-8 h-8 rounded-full bg-soft-gray text-on-surface-variant/60 flex items-center justify-center">
                <span className="text-xs font-bold">🏠</span>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wide">Delivered</span>
              <span className="text-[9px] font-medium font-mono mt-0.5">Pending</span>
            </div>
          </div>
        </section>

        {/* 4. Checkout Order Summary */}
        <section className="mb-6">
          <h3 className="text-sm font-extrabold text-on-surface tracking-tight mb-4 select-none">
            Order Summary
          </h3>
          
          <div className="bg-white rounded-xl border border-outline/10 shadow-sm overflow-hidden p-4.5 space-y-4">
            {order.items.map((item) => (
              <div key={item.product.id} className="flex gap-4 items-center">
                <div className="w-16 h-16 rounded-xl bg-warm-sand flex-shrink-0 overflow-hidden border border-soft-gray/20">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="flex-grow min-w-0 text-xs">
                  <h4 className="font-sans font-bold text-on-surface truncate">{item.product.name}</h4>
                  <p className="text-[10px] text-on-surface-variant font-mono mt-0.5">Qty: {item.quantity}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-on-surface font-sans">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}

            {/* Calculations specs list */}
            <div className="pt-4 border-t border-soft-gray/30 space-y-2.5 text-xs text-on-surface-variant">
              <div className="flex justify-between font-semibold">
                <span>Subtotal</span>
                <span className="text-on-surface font-bold">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Shipping</span>
                {order.shipping === 0 ? (
                  <span className="text-secondary font-bold font-sans uppercase">FREE</span>
                ) : (
                  <span className="text-on-surface font-bold">${order.shipping.toFixed(2)}</span>
                )}
              </div>
              <div className="flex justify-between font-semibold">
                <span>Tax Estimations</span>
                <span className="text-on-surface font-bold">${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-on-surface font-bold pt-3 border-t border-soft-gray/20">
                <span className="font-extrabold text-on-surface">Total Order Cost</span>
                <span className="text-base font-black text-primary font-sans">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Quick Actions Double Buttons node */}
        <section className="grid grid-cols-2 gap-4 mb-8">
          <button 
            onClick={() => {
              triggerToast('Items refilled inside cart! Directing to shop page...');
              setTimeout(() => {
                setRoute('shop');
              }, 1200);
            }}
            className="flex items-center justify-center gap-1.5 py-3.5 px-6 rounded-xl border border-primary text-primary font-bold text-[10px] uppercase tracking-wider hover:bg-primary/5 active:scale-95 transition-all cursor-pointer bg-white"
          >
            <RefreshCw className="w-3.5 h-3.5" /> REORDER
          </button>
          
          <button 
            onClick={() => setHelpOpen(true)}
            className="flex items-center justify-center gap-1.5 py-3.5 px-6 rounded-xl bg-primary text-white font-bold text-[10px] uppercase tracking-wider hover:bg-heritage-red shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-white" /> HELP
          </button>
        </section>

        {/* 6. Educational Pro Tip lifestyle layout */}
        <section className="mb-6 rounded-xl overflow-hidden relative group shadow-sm">
          <div 
            className="h-40 bg-cover bg-center select-none"
            style={{ backgroundImage: `url('${pantryImage}')` }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/10 to-transparent flex flex-col justify-center px-6 select-none pointer-events-none">
            <span className="text-white bg-primary text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full w-fit mb-1.5 leading-none">
              PRO TIP
            </span>
            <h4 className="text-white text-base md:text-lg font-bold w-[70%] leading-tight text-shadow-sm font-sans drop-shadow-sm">
              Keep your delivery fresh with Modular Mates.
            </h4>
          </div>
        </section>
      </main>

      {/* FAQs Chat/Help customer assistance drawer */}
      {helpOpen && (
        <div className="fixed inset-0 z-50 bg-black/45 flex items-end justify-center backdrop-blur-sm animate-fade-in pr-0 pl-0">
          <div className="bg-white rounded-t-2xl shadow-xl w-full max-w-md p-6 max-h-[80vh] overflow-y-auto z-10 animate-slide-up relative">
            <button 
              onClick={() => setHelpOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
            <h4 className="font-sans text-base font-bold text-on-surface mb-3 uppercase tracking-wider">Tupperware Customer Support</h4>
            <div className="space-y-4 text-xs mt-4">
              <div className="bg-surface-container-low p-3.5 rounded-xl">
                <p className="font-extrabold text-on-surface">How can I contact my delivery driver?</p>
                <p className="text-on-surface-variant mt-1 leading-relaxed">
                  As our delivery is integrated with sustainable third-party state dispatch hubs, you can reach out directly via toll-free help desk call: <strong>1-800-TUPP-HELP</strong>.
                </p>
              </div>
              <div className="bg-surface-container-low p-3.5 rounded-xl">
                <p className="font-extrabold text-on-surface">Is my packaging eco-friendly?</p>
                <p className="text-on-surface-variant mt-1 leading-relaxed">
                  Absolutely! 100% of the cushioning, cardboard, and sealing tapes are derived from fully organic, compostable, paper-lined honeyomb structures.
                </p>
              </div>
            </div>
            <button 
              onClick={() => {
                setHelpOpen(false);
                triggerToast("Customer assistance match initiated! We will call back shortly.");
              }}
              className="w-full py-3.5 bg-primary hover:bg-heritage-red text-white gap-2 flex items-center justify-center rounded-full font-bold text-[10px] uppercase tracking-wider mt-6 shadow"
            >
              <PhoneCall className="w-4 h-4 text-white fill-white" /> Request Call Assistance
            </button>
          </div>
        </div>
      )}

      {/* Floating Active Toast messages overlay */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-55 pointer-events-none transition-opacity duration-300">
          <div className="bg-neutral-900 border border-neutral-800 text-white px-5 py-3 rounded-full text-xs font-semibold shadow-xl flex items-center gap-2">
            <Check className="w-4 h-4 text-secondary stroke-[3px]" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}

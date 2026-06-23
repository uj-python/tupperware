import React from 'react';
import { Edit2, ShieldAlert, History, BookOpen, MapPin, MessageSquare, Plus, Check, HelpCircle } from 'lucide-react';
import { Route, Product, Order } from '../types';
import { userProfile, pinkCuratedStarterSetImage } from '../data';

interface ProfileScreenProps {
  setRoute: (route: Route) => void;
  setSelectedProductId: (id: string) => void;
  onAddToCart: (product: Product) => void;
  lastOrder: Order | null;
  ordersCount: number;
}

export default function ProfileScreen({
  setRoute,
  setSelectedProductId,
  onAddToCart,
  lastOrder,
  ordersCount
}: ProfileScreenProps) {
  
  // Calculate dynamic savings metrics based on order size
  const baseSaved = userProfile.plasticSavedBottles;
  const dynamicallySaved = baseSaved + (ordersCount * 12);

  const ownedProducts: Product[] = [
    {
      id: 'eco-water-bottle-teal',
      name: 'Eco+ Water Bottle',
      description: 'A premium Tupperware Eco+ Water Bottle in a soft, semi-transparent teal. Presented in a minimalist setting.',
      category: 'Hydration',
      price: 19.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZ3D_E5Yiu89hbgPFsiS_tDzJVmv6D8UBMNfLLfP3_iwW55sNu3fdwZEc_pF7jTrdFPmCu9KCQRP9FOiswER-48OvfsM-EFenDdI8pzPLC03k-Hsc3lbETjkFWu5z97lQl4nVBsKv1VoOtwG3cKIvO0xoWuQtRsA_MMHVUebs7GIoCWrQJ-N0dyrohlPgitb8xvQYkwxNe4__k__LgWsN2U7EJR82g_y6Y2z82NcjpPuqvDW42ZtfD2Uhz1x3sNla8Nm9hJace',
      isBpaFree: true,
      specs: { capacity: '750ml', material: 'ECO+ Resin', dimensions: '24cm h', dishwasherSafe: true }
    },
    {
      id: 'ventsmart-small-high',
      name: 'VentSmart Small High',
      description: 'A set of minimalist Tupperware VentSmart containers featuring clear bodies and soft grey lid system.',
      category: 'Conservation',
      price: 24.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU8NfgdbxhBTxVv7sg7zMGWHUT8Lpk1Ofngh8DeWvBQaWJUqaTyxzAyh3HLKOUte_a45Cw51xAGA3NmVaahODrmSIvotqBCayI63qxFO0LK2kda2iNlbqQwBo9HGI-0bquw9gqE4OFHgwrL16BUz7asMiicbOJeipyv3l6UjXKpAf7Tqs72Hx0o0LK1xu8_q9k-2D1M2MLY2xyqmD1MvGGT5jmhxi518x993z11EGkk8dH_0X54TvG9Eu-FizOdSmiYV38qu3X',
      isFridgeSafe: true,
      specs: { capacity: '1.6L', material: 'Tritan BPA-Free', dimensions: '15cm h', dishwasherSafe: true }
    },
    {
      id: 'clear-bowl',
      name: 'Clear Collection Bowl',
      description: 'Sleek Tupperware Clear Collection bowl featuring crystal-clear finish filled with fresh greens.',
      category: 'Conservation',
      price: 32.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAH2HTwcg84BUl-v8SU9hkBlHiVDXLooslgB5w4QWooLDNS2dim-Nf4hu_nz66QaLrlJHZ1hz1frBZiXI7wFiKN13LP-MINH-W7_gQow5W7eYrmgbwma3hDqIH4lA9tlU9KOxPRP_V00e_M_DC02V2f6GAt7feLX2t5o8Sl4pr82HiKe7K4lYYvRZ-WzTQWOe6hhZjOO-KezYgcWt6CnoTC4aEA1wUE9jHZ0YUWRi4-VorEk63UdeRqHvDdWRjBY-vmScNmBlJ5',
      isServing: true,
      specs: { capacity: '2.4L', material: 'Premium Acrylic', dimensions: '24cm d', dishwasherSafe: true }
    }
  ];

  const [addedId, setAddedId] = React.useState<string | null>(null);

  const handleReadd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedId(product.id);
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(8);
    }
    setTimeout(() => {
      setAddedId(null);
    }, 1200);
  };

  const [addressesOpen, setAddressesOpen] = React.useState(false);

  return (
    <div className="animate-fade-in pb-28">
      {/* 1. Profile Header with Editable Pen node */}
      <section className="flex flex-col items-center mt-6 space-y-3.5 select-none" id="profile-meta">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-warm-sand japandi-shadow">
            <img 
              src={userProfile.avatar} 
              alt={userProfile.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Absolute edit circles overlay */}
          <div 
            onClick={() => alert("Sarah Chen avatar customizations can be updated in personal account configuration!")}
            className="absolute bottom-0 right-0 bg-heritage-red text-white p-2 rounded-full cursor-pointer shadow-md active:scale-90 transition-transform"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="font-sans text-xl font-bold text-on-surface">{userProfile.name}</h3>
          <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider bg-warm-sand px-3 py-1 rounded-full inline-block mt-1">
            Premium Member since {userProfile.memberSince}
          </p>
        </div>
      </section>

      {/* 2. Dynamic Sustainability widget Tracker */}
      <section className="mt-8 px-5 max-w-xl mx-auto" id="sustainability-widget">
        <div className="bg-[#eaf7ef]/80 border border-eco-mint/35 rounded-xl p-5 flex items-center space-x-4.5 japandi-shadow relative">
          <div className="bg-eco-mint/20 p-3 rounded-full flex items-center justify-center shrink-0">
            <span className="text-2xl text-secondary">🍃</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest leading-none mb-1">
              Sustainability Impact
            </h3>
            <p className="text-xs text-on-surface leading-snug font-medium select-none">
              Single-use plastics saved: <span className="font-extrabold text-secondary text-sm">{dynamicallySaved} bottles</span>
            </p>
            <div className="w-full bg-soft-gray/30 h-1.5 rounded-full mt-3.5 relative overflow-hidden">
              <div 
                className="bg-secondary h-1.5 rounded-full transition-all duration-500" 
                style={{ width: `${Math.min(100, Math.max(30, (dynamicallySaved / 100) * 100))}%` }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Navigation Links Bento-Grid */}
      <section className="mt-6 px-5 max-w-xl mx-auto grid grid-cols-2 gap-4" id="bento-navigation-tabs">
        <div 
          onClick={() => {
            if (lastOrder) {
              setRoute('track');
            } else {
              alert("No ongoing orders currently. Explore our catalog and place an order to unlock instant delivery tracking!");
            }
          }}
          className="bg-white p-4.5 rounded-xl japandi-shadow flex flex-col justify-between h-28 hover:border-heritage-red/35 border border-transparent transition-all active:scale-95 cursor-pointer"
        >
          <History className="w-6 h-6 text-heritage-red stroke-[2.2]" />
          <div>
            <span className="font-bold text-[10px] text-on-surface-variant uppercase tracking-wider block">
              {lastOrder ? 'Active Delivery' : 'Order History'}
            </span>
            <span className="text-[9px] text-[#A8D5BA] font-extrabold uppercase mt-0.5 block tracking-wide">
              {lastOrder ? '● LIVE TRACKING' : '0 past orders'}
            </span>
          </div>
        </div>

        <div 
          onClick={() => alert("Special healthy cooking menus on steam preparing coming up inside our digital portal! Stay tuned!")}
          className="bg-white p-4.5 rounded-xl japandi-shadow flex flex-col justify-between h-28 hover:border-heritage-red/35 border border-transparent transition-all active:scale-95 cursor-pointer"
        >
          <BookOpen className="w-6 h-6 text-heritage-red stroke-[2.2]" />
          <div>
            <span className="font-bold text-[10px] text-on-surface-variant uppercase tracking-wider block">Saved Recipes</span>
            <span className="text-[9px] text-on-surface-variant/40 block leading-none mt-0.5">8 organic menus</span>
          </div>
        </div>

        <div 
          onClick={() => setAddressesOpen(true)}
          className="bg-white p-4.5 rounded-xl japandi-shadow flex flex-col justify-between h-28 hover:border-heritage-red/35 border border-transparent transition-all active:scale-95 cursor-pointer"
        >
          <MapPin className="w-6 h-6 text-heritage-red stroke-[2.2]" />
          <div>
            <span className="font-bold text-[10px] text-on-surface-variant uppercase tracking-wider block">Your Addresses</span>
            <span className="text-[9px] text-on-surface-variant/40 block leading-none mt-0.5">Edit home / work</span>
          </div>
        </div>

        <div 
          onClick={() => alert("Dynamic Consultant match connects you with local experts. Our agent match is loading...")}
          className="bg-white p-4.5 rounded-xl japandi-shadow flex flex-col justify-between h-28 hover:border-heritage-red/35 border border-transparent transition-all active:scale-95 cursor-pointer"
        >
          <MessageSquare className="w-6 h-6 text-heritage-red stroke-[2.2]" />
          <div>
            <span className="font-bold text-[10px] text-on-surface-variant uppercase tracking-wider block">Find Consultant</span>
            <span className="text-[9px] text-on-surface-variant/40 block leading-none mt-0.5">Connect locally</span>
          </div>
        </div>
      </section>

      {/* Address modal viewer */}
      {addressesOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-5 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm border border-soft-gray/30 japandi-shadow">
            <h4 className="font-sans text-base font-bold text-on-surface mb-3 uppercase tracking-wider">Registered Destinies</h4>
            <div className="p-3 bg-surface-container-low rounded-xl text-xs space-y-1 mb-5">
              <p className="font-extrabold text-on-surface">Sarah Chen &bull; Default Residence</p>
              <p className="text-on-surface-variant">124 Japandi Serenity Avenue, Apt 4B</p>
              <p className="text-on-surface-variant">Seattle, WA 98101</p>
            </div>
            <button 
              onClick={() => setAddressesOpen(false)}
              className="w-full py-3 bg-on-surface text-white rounded-full font-bold text-[10px] uppercase tracking-wider"
            >
              Close Panel
            </button>
          </div>
        </div>
      )}

      {/* 4. My Kitchen Collection (owned assets) */}
      <section className="mt-8 pl-5 max-w-xl mx-auto" id="kitchen-collection">
        <div className="flex justify-between items-center mb-4 pr-5 select-none">
          <h3 className="text-base font-extrabold text-on-surface tracking-tight">
            My Kitchen Collection
          </h3>
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest block border-b border-primary/20 pb-0.5 cursor-pointer">
            View All
          </span>
        </div>
        
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-3">
          {ownedProducts.map((p) => (
            <div key={p.id} className="flex-shrink-0 w-44 bg-white rounded-xl japandi-shadow border border-soft-gray/10 overflow-hidden group">
              <div 
                className="relative h-44 bg-warm-sand/80 flex items-center justify-center cursor-pointer"
                onClick={() => {
                  setSelectedProductId(p.id);
                  setRoute('pdp');
                }}
              >
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm px-2.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                  {p.isFridgeSafe ? '❄ FRIDGE SAFE' : p.isServing ? '🏺 SERVING' : '🍵 BPA FREE'}
                </div>
                
                <button 
                  onClick={(e) => handleReadd(p, e)}
                  className="absolute bottom-2 right-2 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-md group-active:scale-95 transition-all text-primary hover:bg-primary hover:text-white"
                >
                  {addedId === p.id ? <Check className="w-4 h-4 text-secondary" /> : <Plus className="w-4 h-4" />}
                </button>
              </div>
              
              <div className="p-3">
                <h4 className="font-sans font-bold text-xs truncate text-on-surface">{p.name}</h4>
                <p className="font-sans font-extrabold text-xs text-price-active mt-0.5">${p.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Pink Curated Starter Set promotional Banner */}
      <section className="mt-8 px-5 max-w-xl mx-auto mb-6" id="special-promotion">
        <div className="bg-warm-sand rounded-2xl p-6 relative overflow-hidden flex flex-col justify-end min-h-[180px] border border-outline/5 japandi-shadow">
          <div className="z-10 max-w-[62%] select-none">
            <h3 className="font-sans text-base font-black text-on-surface leading-tight">Curated Starter Set</h3>
            <p className="text-[10px] text-on-surface-variant font-medium mt-1 leading-relaxed">
              Upgrade your sustainable kitchen journey with our expert coordinated color choice kits.
            </p>
            <button 
              onClick={() => {
                setSelectedProductId('aquavibe'); 
                setRoute('pdp');
              }}
              className="mt-4 bg-primary text-white font-sans font-bold text-[10px] uppercase tracking-wider py-2.5 px-5 rounded-full active:scale-95 shadow-md shadow-primary/20 transition-transform cursor-pointer"
            >
              SHOP NOW
            </button>
          </div>
          
          <div className="absolute right-[-14%] top-0 bottom-0 w-[50%] opacity-85 select-none pointer-events-none">
            <img 
              src={pinkCuratedStarterSetImage} 
              alt="Curated Pink Set" 
              className="w-full h-full object-cover transform scale-110 translate-y-1" 
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

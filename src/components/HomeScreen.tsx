import React, { useRef, useState, useEffect } from 'react';
import { Star, Shield, ArrowRight, Check, Sparkles } from 'lucide-react';
import { Product, Route } from '../types';
import { products, seenInKitchenGallery, heroImage, starterSetBannerImage } from '../data';

interface HomeScreenProps {
  setRoute: (route: Route) => void;
  setSelectedProductId: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onTriggerQuickPeek: (product: Product) => void;
}

export default function HomeScreen({ 
  setRoute, 
  setSelectedProductId, 
  onAddToCart, 
  onTriggerQuickPeek 
}: HomeScreenProps) {
  
  // Highlight some featured products
  const featuredIds = ['aquavibe', 'modular-spice', 'air-fryer', 'ultra-clear-oval'];
  const recommendedProducts = products.filter(p => featuredIds.includes(p.id));
  const aquasafeProduct = products.find(p => p.id === 'aquasafe-500') || products[0];

  // Micro-interaction: Slide to add to cart state machine
  const [slideStatus, setSlideStatus] = useState<'idle' | 'success'>('idle');
  const [slideOffset, setSlideOffset] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);

  // Mouse/Touch sliding controller
  const handleStart = (clientX: number) => {
    if (slideStatus === 'success') return;
    isDragging.current = true;
    startX.current = clientX - slideOffset;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging.current || !trackRef.current || !handleRef.current) return;
    
    const trackWidth = trackRef.current.clientWidth;
    const handleWidth = handleRef.current.clientWidth;
    const maxMove = trackWidth - handleWidth - 8; // 8px padding factor
    
    let currentMove = clientX - startX.current;
    currentMove = Math.max(0, Math.min(currentMove, maxMove));
    
    setSlideOffset(currentMove);

    // Trigger success threshold (90% slide)
    if (currentMove >= maxMove * 0.92) {
      isDragging.current = false;
      setSlideOffset(maxMove);
      handleSuccess();
    }
  };

  const handleEnd = () => {
    isDragging.current = false;
    if (slideStatus === 'idle') {
      // snap back
      setSlideOffset(0);
    }
  };

  const handleSuccess = () => {
    onAddToCart(aquasafeProduct);
    setSlideStatus('success');
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(15);
    }
    // reset slide after 2.5 seconds
    setTimeout(() => {
      setSlideStatus('idle');
      setSlideOffset(0);
    }, 2500);
  };

  // Bind mouse move globally during dragging to handle out-of-bounds release
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onMouseUp = () => handleEnd();

    if (slideStatus === 'idle') {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [slideStatus, slideOffset]);

  // Fast Category Navigation Handler
  const handleCategoryClick = (category: string) => {
    // Navigate and let category filter apply
    setRoute('shop');
  };

  return (
    <div className="animate-fade-in pb-28">
      {/* 1. Hero Jumbotron */}
      <section className="relative w-full aspect-[4/5] md:aspect-[16/7] overflow-hidden" id="hero-banner">
        <img 
          src={heroImage} 
          alt="Modern Japandi Organized Food Pantry" 
          className="w-full h-full object-cover select-none"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent flex flex-col justify-end p-5 pb-12 md:pb-16 select-none md:px-12">
          <div className="max-w-xl">
            <h2 className="text-white text-3xl md:text-5xl font-extrabold tracking-tight mb-2 md:mb-4 animate-slide-up">
              Organized living, elevated.
            </h2>
            <p className="text-white/90 text-sm md:text-lg font-light mb-6 md:mb-8 max-w-sm md:max-w-md">
              Sustainable solutions for your modern home. Built to last a lifetime.
            </p>
            <button 
              onClick={() => setRoute('shop')}
              className="bg-primary hover:bg-heritage-red text-white text-xs font-bold tracking-widest uppercase px-8 py-4 rounded-full w-fit hover:shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              SHOP BEST SELLERS
            </button>
          </div>
        </div>
      </section>

      {/* 2. Fast Navigation Categories slider */}
      <section className="py-6 bg-white overflow-x-auto hide-scrollbar whitespace-nowrap border-b border-surface-container" id="fast-categories">
        <div className="flex gap-6 px-5 max-w-7xl mx-auto items-center">
          {[
            { name: 'New', icon: '✨', route: 'shop' },
            { name: 'Deals', icon: '🔥', route: 'shop' },
            { name: 'Conservation', icon: '🍃', route: 'shop' },
            { name: 'Lunch', icon: '🍱', route: 'shop' },
            { name: 'Cookware', icon: '🍳', route: 'shop' }
          ].map((cat, idx) => (
            <div 
              key={idx}
              onClick={() => handleCategoryClick(cat.name)}
              className="flex flex-col items-center gap-2 cursor-pointer group flex-shrink-0"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-warm-sand/80 group-hover:bg-warm-sand flex items-center justify-center group-active:scale-90 transition-transform shadow-sm">
                <span className="text-xl md:text-2xl">{cat.icon}</span>
              </div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-on-surface-variant group-hover:text-primary transition-colors">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Starter Set Curated Promo Banner */}
      <section className="px-5 py-6 max-w-4xl mx-auto" id="starter-set-bundle">
        <div className="bg-warm-sand rounded-xl p-6 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center min-h-[300px] md:min-h-0 min-w-0 japandi-shadow border border-soft-gray/35">
          <div className="relative z-10 max-w-xs md:max-w-md">
            <span className="bg-eco-mint text-on-secondary-fixed-variant text-[10px] font-bold px-3 py-1 rounded-full mb-3 inline-block tracking-wider uppercase">
              SUSTAINABLE CHOICE
            </span>
            <h3 className="text-xl md:text-3xl font-extrabold text-on-surface leading-tight mb-2">
              The Essentials Starter Set
            </h3>
            <p className="text-xs md:text-sm text-on-surface-variant mb-6 leading-relaxed max-w-[240px] md:max-w-xs">
              The perfect gift for new homeowners. Includes 8 core stackable pieces.
            </p>
            <div className="flex items-baseline gap-2 mb-4 md:mb-6">
              <span className="text-2xl font-black text-price-active">$45.00</span>
              <span className="text-price-strikethrough line-through text-sm">$54.00</span>
            </div>
            <button 
              onClick={() => {
                setSelectedProductId('modular-mates');
                setRoute('pdp');
              }}
              className="bg-on-surface text-white hover:bg-neutral-800 text-xs font-bold tracking-wider uppercase px-6 py-3 rounded-full transition-all active:scale-95"
            >
              VIEW BUNDLE
            </button>
          </div>
          <div className="absolute -right-8 bottom-0 md:relative md:-right-4 w-52 md:w-64 h-auto flex-shrink-0 z-0">
            <img 
              src={starterSetBannerImage} 
              alt="The Essentials Starter Set Collection" 
              className="w-full h-auto object-contain select-none"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* 4. Seen In Your Kitchen (Social UGC and reviews) */}
      <section className="py-6 border-b border-surface-container" id="seen-in-your-kitchen">
        <div className="px-5 max-w-7xl mx-auto mb-4 flex justify-between items-center">
          <h3 className="text-lg font-extrabold text-on-surface tracking-tight">
            Seen in Your Kitchen
          </h3>
          <span 
            onClick={() => setRoute('shop')}
            className="text-primary hover:text-heritage-red font-bold text-[10px] uppercase tracking-wider cursor-pointer border-b border-primary/20 pb-0.5"
          >
            VIEW GALLERY
          </span>
        </div>
        
        <div className="flex gap-4 overflow-x-auto px-5 max-w-7xl mx-auto hide-scrollbar">
          {seenInKitchenGallery.map((item, idx) => (
            <div key={idx} className="min-w-[180px] md:min-w-[240px] flex-shrink-0 group">
              <div className="w-full aspect-square rounded-xl overflow-hidden mb-3 bg-warm-sand japandi-shadow relative">
                <img 
                  src={item.image} 
                  alt={item.author} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex gap-0.5 text-amber-500 mb-1">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-[11px] font-normal text-on-surface-variant leading-relaxed line-clamp-2 italic mb-0.5">
                {item.quote}
              </p>
              <span className="text-[10px] font-semibold text-secondary tracking-wider block">
                {item.author}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Recommended for You Feed Grid */}
      <section className="px-5 py-6 max-w-7xl mx-auto" id="recommended-products">
        <h3 className="text-lg font-extrabold text-on-surface tracking-tight mb-5">
          Recommended for You
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recommendedProducts.map((p) => (
            <div key={p.id} className="bg-white rounded-xl overflow-hidden japandi-shadow border border-soft-gray/10 relative group flex flex-col justify-between">
              {/* Image box */}
              <div className="relative aspect-square w-full overflow-hidden bg-warm-sand flex items-center justify-center">
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                  onClick={() => {
                    setSelectedProductId(p.id);
                    setRoute('pdp');
                  }}
                  referrerPolicy="no-referrer"
                />
                
                {p.isBpaFree && (
                  <div className="absolute top-2.5 left-2.5">
                    <span className="bg-eco-mint/85 backdrop-blur-sm text-[9px] font-bold px-2 py-0.5 rounded-full text-secondary tracking-wide uppercase">
                      BPA FREE
                    </span>
                  </div>
                )}

                <button 
                  onClick={() => {
                    onAddToCart(p);
                    if (window.navigator && window.navigator.vibrate) window.navigator.vibrate(8);
                  }}
                  className="absolute bottom-2.5 right-2.5 bg-primary hover:bg-heritage-red text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform cursor-pointer"
                  title="Add directly to cart"
                >
                  <span className="text-lg font-sans">+</span>
                </button>
              </div>

              {/* textual info */}
              <div className="p-3.5 flex-grow flex flex-col justify-between">
                <div>
                  <h4 
                    onClick={() => {
                      setSelectedProductId(p.id);
                      setRoute('pdp');
                    }}
                    className="text-xs font-semibold text-on-surface-variant truncate hover:text-primary cursor-pointer mb-1"
                  >
                    {p.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-primary">${p.price.toFixed(2)}</span>
                    {p.originalPrice && (
                      <span className="text-price-strikethrough text-[10px] line-through">${p.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                </div>

                <button 
                  onClick={() => onTriggerQuickPeek(p)}
                  className="mt-3.5 w-full border border-soft-gray py-2 rounded-full text-[10px] uppercase font-extrabold tracking-wider text-on-surface-variant hover:border-primary hover:text-primary active:bg-soft-gray/10 transition-colors cursor-pointer"
                >
                  QUICK PEEK
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Swipe to Buy Interaction Section */}
      <section className="px-5 py-6 max-w-md mx-auto" id="swipe-to-add-cart-panel">
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-soft-gray/40 relative overflow-hidden">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-20 h-20 bg-warm-sand rounded-xl overflow-hidden flex-shrink-0 border border-soft-gray/20">
              <img 
                src={aquasafeProduct.image} 
                alt="Aquasafe 500ml product display" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="bg-eco-mint text-on-secondary-fixed-variant text-[9px] font-bold px-2.5 py-0.5 rounded-full inline-block uppercase tracking-wider mb-1">
                BEST SELLER
              </span>
              <h4 className="text-base font-extrabold text-on-surface">{aquasafeProduct.name}</h4>
              <p className="text-[11px] text-on-surface-variant mt-0.5">Hydration essential for clean drinking</p>
              <p className="text-sm font-black text-primary mt-1">${aquasafeProduct.price.toFixed(2)}</p>
            </div>
          </div>

          {/* Swipe Track Mechanism */}
          <div 
            ref={trackRef}
            className="relative h-14 w-full bg-soft-gray rounded-full overflow-hidden flex items-center justify-center select-none"
            id="swipe-to-buy-track"
          >
            <span className={`text-[10px] font-bold uppercase tracking-widest z-10 pointer-events-none transition-colors duration-200 ${slideStatus === 'success' ? 'text-white' : 'text-on-surface-variant'}`}>
              {slideStatus === 'success' ? 'ADDED TO CART!' : 'SLIDE TO ADD TO CART'}
            </span>

            {/* Simulated progress color filling */}
            <div 
              className="absolute left-0 top-0 h-full swipe-to-buy-track opacity-85 z-0 pointer-events-none"
              style={{ width: `${slideOffset + 20}px` }}
            />

            {/* Circular Handle */}
            <div 
              ref={handleRef}
              onMouseDown={(e) => handleStart(e.clientX)}
              onTouchStart={(e) => handleStart(e.touches[0].clientX)}
              onTouchMove={(e) => handleMove(e.touches[0].clientX)}
              onTouchEnd={handleEnd}
              style={{ transform: `translateX(${slideOffset}px)` }}
              className={`absolute left-1 w-12 h-12 rounded-full shadow-md flex items-center justify-center cursor-grab active:cursor-grabbing z-20 transition-transform duration-75 ${
                slideStatus === 'success' ? 'bg-white' : 'bg-white'
              }`}
            >
              {slideStatus === 'success' ? (
                <Check className="w-5 h-5 text-secondary stroke-[3px] animate-bounce" />
              ) : (
                <ArrowRight className="w-5 h-5 text-primary stroke-[3px]" />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

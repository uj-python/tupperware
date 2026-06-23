import React, { useState } from 'react';
import { Product, CartItem } from '../types';
import { products } from '../data';
import { Heart, Star, Trash2, Plus, Minus, ShieldCheck, RefreshCw, ChevronDown, ShoppingCart, Leaf } from 'lucide-react';

interface ProductDetailProps {
  productId: string;
  onAddToCart: (product: Product, quantity: number) => void;
  onPlaceOrder: (items: CartItem[]) => void;
  onGoBack: () => void;
}

export default function ProductDetail({ productId, onAddToCart, onPlaceOrder, onGoBack }: ProductDetailProps) {
  // Find product by id, default to standard aquavibe if not found
  const product = products.find(p => p.id === productId) || products[0];

  // Carousel images
  const carouselImages = [
    product.image,
    product.id === 'aquavibe' 
      ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuBH7aojjdZ-S7wKhP4IHQ0_gJ7ADDk5CD88KDNdIGFN0FfKpHg47AB6l9WHxj3wBPaWQ_rvg9NTDtmWj-df6IONhOxXpGdf3WoH2yTp2tSw7Uve645xsrgX8-rJEsLDkdkJMLXUkmyfPfeFdeV06g-Z03c4x1FT5RhzdrEnQv7-2wfsXQNRYZ6dWH94H8URNSYKyRNjd1_gNznJ4g46PWFJbRks2CuuBMcbCdKMf-aI-crlEbe0Jj_BkfvjeFqVvWcQqKyMpeV-'
      : product.image,
    product.id === 'aquavibe'
      ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3ZAbeQg_jFSVqShyP0TOdVOlYLiE5hrKITuoT_XeTiwxp30JVv-rYl_2UTnI-q5M4CBAdpGoQY7X5Z_Wzr6sX0ALrCzWg0YhZ8HdKRBv8lgFxHFsyxFohKEAB-XQVeHO2o6MSWnBDqYX6GMNKTI4ETEd6iplMROB3fC0OMsiUen4Mx_ZeRcGTYJVrDp-g_NwKQeVSMU7ZNkqOzCqZsnyP6X1mKWIB06FMH4TySMDgBNWe-tXVxyDWRpQVY2KpywSQRVkWvFEs'
      : product.image
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);

  // Specifications state
  const [specsOpen, setSpecsOpen] = useState(true);
  const [shippingOpen, setShippingOpen] = useState(false);

  // Bundle accessor state
  const [addBrush, setAddBrush] = useState(false);
  const [addStraws, setAddStraws] = useState(false);

  // Accessory products
  const brushProduct = products.find(p => p.id === 'eco-brush') || products[5];
  const strawsProduct = products.find(p => p.id === 'silicone-straws') || products[6];

  // Calculations for bundle
  const accessoryTotal = (addBrush ? brushProduct.price : 0) + (addStraws ? strawsProduct.price : 0);
  const bundleTotal = product.price * purchaseQuantity + accessoryTotal;

  // Floating Action button states
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleAddAllToCart = () => {
    // Add primary item
    onAddToCart(product, purchaseQuantity);

    // Add selected bundle accessories
    if (addBrush) onAddToCart(brushProduct, 1);
    if (addStraws) onAddToCart(strawsProduct, 1);

    // Trigger feedback and return
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
    }, 1500);
  };

  const handleBuyNow = () => {
    setCheckoutLoading(true);
    setTimeout(() => {
      setCheckoutLoading(false);
      
      // Compile checkout items
      const itemsToBuy: CartItem[] = [
        { product, quantity: purchaseQuantity }
      ];
      if (addBrush) itemsToBuy.push({ product: brushProduct, quantity: 1 });
      if (addStraws) itemsToBuy.push({ product: strawsProduct, quantity: 1 });

      onPlaceOrder(itemsToBuy);
    }, 850);
  };

  return (
    <div className="animate-fade-in pb-32">
      {/* 1. Header Hero Swipe Carousel */}
      <section className="relative w-full aspect-[4/5] overflow-hidden bg-warm-sand" id="product-carousel">
        <div className="flex h-full w-full">
          <img 
            src={carouselImages[activeImageIndex]} 
            alt={product.name} 
            className="w-full h-full object-cover transition-all duration-300"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* BPA Free Tag Overlay */}
        {product.isBpaFree && (
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-white/95 text-secondary font-bold text-[10px] tracking-wider px-3.5 py-1.5 rounded-full flex items-center gap-1 backdrop-blur-sm shadow-sm uppercase">
              <Leaf className="w-3.5 h-3.5 fill-current text-secondary" /> BPA-FREE
            </span>
          </div>
        )}

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-10 bg-black/15 px-3 py-1.5 rounded-full backdrop-blur-sm">
          {carouselImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveImageIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                activeImageIndex === i ? 'bg-primary scale-120' : 'bg-white/60 hover:bg-white'
              }`}
              title={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. Main Title & Price Information */}
      <section className="px-5 mt-6 max-w-xl mx-auto">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-secondary font-bold text-[10px] tracking-widest uppercase mb-1">
              Hydration Essentials
            </p>
            <h2 className="font-sans text-2xl md:text-3xl font-black leading-tight text-on-surface">
              {product.name}
            </h2>
          </div>
          <button 
            onClick={() => setFavorite(!favorite)}
            className={`p-2.5 rounded-full hover:bg-soft-gray/20 transition-all border ${
              favorite ? 'text-primary border-primary bg-primary/5' : 'text-on-surface-variant border-soft-gray'
            }`}
            title="Add to wishlist"
          >
            <Heart className={`w-5 h-5 ${favorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Rating Reviews */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex text-amber-500 fill-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
            ))}
          </div>
          <span className="text-xs font-semibold text-on-surface-variant/80">
            {product.ratings || '4.8'} ({product.reviewsCount || '124'} Reviews)
          </span>
        </div>

        {/* Purchase Quantities Counter & Price Tag */}
        <div className="mt-4 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-black text-heritage-red">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="text-on-surface-variant/60 line-through text-sm">${product.originalPrice.toFixed(2)}</span>
                <span className="bg-secondary-container text-on-secondary-container px-2.5 py-0.5 rounded text-[10px] font-extrabold tracking-wider uppercase">
                  SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              </>
            )}
          </div>

          <div className="flex items-center bg-surface-container rounded-full px-3 py-1.5 gap-4 shadow-sm border border-soft-gray/10">
            <button 
              onClick={() => setPurchaseQuantity(q => Math.max(1, q - 1))}
              className="w-6 h-6 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all active:scale-90"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-extrabold text-sm w-4 text-center select-none text-on-surface">{purchaseQuantity}</span>
            <button 
              onClick={() => setPurchaseQuantity(q => q + 1)}
              className="w-6 h-6 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all active:scale-90"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="mt-6 text-on-surface-variant text-sm leading-relaxed">
          {product.description}
        </p>
      </section>

      {/* 3. Japandi Eco-Story section */}
      <section className="mt-8 bg-warm-sand/90 py-8 px-5 border-t border-b border-soft-gray/30">
        <div className="max-w-md mx-auto text-center">
          <Leaf className="w-10 h-10 text-secondary mx-auto mb-3" />
          <h3 className="font-sans text-lg font-extrabold text-on-surface mb-2">
            The Material Story
          </h3>
          <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed mb-6">
            Crafted from sustainable ECO+ resin and medical-grade food-safe silicone. Our persistent promise to the planet means zero single-use plastics and 100% BPA-safe security for your family.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm text-center border border-soft-gray/25">
              <ShieldCheck className="w-6 h-6 text-secondary mx-auto mb-1.5" />
              <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">
                100% BPA-FREE
              </span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center border border-soft-gray/25">
              <Leaf className="w-6 h-6 text-secondary mx-auto mb-1.5" />
              <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">
                ECO-FRIENDLY
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Complete Your Set Bundle Builder */}
      <section className="mt-8 px-5 max-w-xl mx-auto" id="bundle-builder">
        <h3 className="text-base font-extrabold text-on-surface tracking-tight mb-4">
          Complete Your Set
        </h3>
        
        <div className="grid grid-col-2 gap-3.5">
          {/* Bundle Accessory Item 1 */}
          <div className={`bg-surface-container-low rounded-xl p-4 flex gap-4 items-center border transition-all duration-300 ${addBrush ? 'border-secondary-container shadow-sm' : 'border-transparent'}`}>
            <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0 border border-soft-gray/20">
              <img 
                src={brushProduct.image} 
                alt={brushProduct.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-grow">
              <h4 className="font-bold text-xs text-on-surface leading-snug">{brushProduct.name}</h4>
              <p className="text-heritage-red font-black text-xs mt-0.5">${brushProduct.price.toFixed(2)}</p>
              <button 
                onClick={() => setAddBrush(!addBrush)} 
                className={`mt-2 flex items-center gap-1 font-bold text-[9px] uppercase tracking-wider py-1 px-2.5 rounded-full border transition-all ${
                  addBrush 
                    ? 'bg-secondary text-white border-transparent' 
                    : 'text-primary border-primary/20 hover:border-primary bg-white'
                }`}
              >
                {addBrush ? 'Added &bull; Cancel' : '+ ADD TO BUNDLE'}
              </button>
            </div>
          </div>

          {/* Bundle Accessory Item 2 */}
          <div className={`bg-surface-container-low rounded-xl p-4 flex gap-4 items-center border transition-all duration-300 ${addStraws ? 'border-secondary-container shadow-sm' : 'border-transparent'}`}>
            <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0 border border-soft-gray/20">
              <img 
                src={strawsProduct.image} 
                alt={strawsProduct.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-grow">
              <h4 className="font-bold text-xs text-on-surface leading-snug">{strawsProduct.name}</h4>
              <p className="text-heritage-red font-black text-xs mt-0.5">${strawsProduct.price.toFixed(2)}</p>
              <button 
                onClick={() => setAddStraws(!addStraws)} 
                className={`mt-2 flex items-center gap-1 font-bold text-[9px] uppercase tracking-wider py-1 px-2.5 rounded-full border transition-all ${
                  addStraws 
                    ? 'bg-secondary text-white border-transparent' 
                    : 'text-primary border-primary/20 hover:border-primary bg-white'
                }`}
              >
                {addStraws ? 'Added &bull; Cancel' : '+ ADD TO BUNDLE'}
              </button>
            </div>
          </div>
        </div>

        {/* Bundle calculated box */}
        <div className="mt-4 p-4 rounded-xl border-2 border-dashed border-outline-variant bg-white flex justify-between items-center japandi-shadow">
          <div>
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Bundle Total</p>
            <p className="text-xl font-black text-heritage-red mt-0.5">${bundleTotal.toFixed(2)}</p>
          </div>
          <button 
            onClick={handleAddAllToCart}
            disabled={checkoutSuccess}
            className={`px-5 py-3 rounded-full font-bold uppercase text-[10px] tracking-wider transition-all disabled:opacity-85 ${
              checkoutSuccess 
                ? 'bg-secondary text-white' 
                : 'bg-primary text-white hover:bg-heritage-red active:scale-95 shadow-md shadow-primary/10'
            }`}
          >
            {checkoutSuccess ? 'SUCCESSFULLY ADDED!' : 'ADD ALL TO CART'}
          </button>
        </div>
      </section>

      {/* 5. Collapsible Accordions (Specs / Deliveries) */}
      <section className="mt-8 px-5 max-w-xl mx-auto border-t border-soft-gray/40">
        {/* Accordion Specs */}
        <div className="border-b border-soft-gray/40">
          <button 
            onClick={() => setSpecsOpen(!specsOpen)}
            className="w-full py-4 flex justify-between items-center text-sm font-extrabold uppercase tracking-widest text-on-surface hover:text-primary cursor-pointer"
          >
            <span>Product Specifications</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${specsOpen ? 'rotate-180 text-primary' : ''}`} />
          </button>
          
          {specsOpen && (
            <div className="pb-5 text-xs text-on-surface-variant space-y-2.5 animate-slide-up">
              <div className="flex justify-between border-b border-soft-gray/30 pb-2">
                <span>Capacity</span>
                <span className="font-semibold text-on-surface">{product.specs?.capacity || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b border-soft-gray/30 pb-2">
                <span>Material</span>
                <span className="font-semibold text-on-surface">{product.specs?.material || 'BPA-Free premium'}</span>
              </div>
              <div className="flex justify-between border-b border-soft-gray/30 pb-2">
                <span>Dimensions</span>
                <span className="font-semibold text-on-surface">{product.specs?.dimensions || 'Standard'}</span>
              </div>
              <div className="flex justify-between">
                <span>Dishwasher Safe</span>
                <span className="font-semibold text-on-surface">{product.specs?.dishwasherSafe ? 'Yes (Top Rack)' : 'Hand Wash Recommended'}</span>
              </div>
            </div>
          )}
        </div>

        {/* Accordion Shipping Info */}
        <div className="border-b border-soft-gray/40">
          <button 
            onClick={() => setShippingOpen(!shippingOpen)}
            className="w-full py-4 flex justify-between items-center text-sm font-extrabold uppercase tracking-widest text-on-surface hover:text-primary cursor-pointer"
          >
            <span>Shipping &amp; Returns</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${shippingOpen ? 'rotate-180 text-primary' : ''}`} />
          </button>
          
          {shippingOpen && (
            <div className="pb-5 text-xs text-on-surface-variant leading-relaxed space-y-2 animate-slide-up">
              <p>
                <strong>🌍 Sustainable Packing:</strong> All our deliveries use 100% biodegradable honeyomb padding wraps and recyclable boxes. Delivery is carbon neutral.
              </p>
              <p>
                <strong>⏱️ Estimated Shipping Time:</strong> Orders are dispatched from local state hubs within 24 hours. Custom standard transit is 2-4 days. Free shipping on bundles.
              </p>
              <p>
                <strong>🔄 30-Day Guarantee returns:</strong> Unopened items are fully acceptable for return inside 30 days. No restocking fees.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 6. Sticky Buy Action Bottom Bar */}
      <footer className="fixed bottom-0 left-0 w-full z-40 bg-white/95 backdrop-blur-md shadow-[0_-4px_22px_rgba(45,45,45,0.06)] px-4 pb-8 pt-4 flex gap-3 h-24 items-center">
        <button 
          onClick={handleAddAllToCart}
          className="flex-1 h-14 rounded-full border-2 border-primary text-primary font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 focus:outline-none transition-all active:scale-95"
        >
          <ShoppingCart className="w-4 h-4" /> Add to Cart
        </button>

        <button 
          onClick={handleBuyNow}
          disabled={checkoutLoading}
          className={`flex-[1.5] h-14 rounded-full text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center relative overflow-hidden group focus:outline-none transition-all active:scale-95 ${
            checkoutLoading ? 'bg-secondary' : 'bg-heritage-red hover:bg-primary shadow-heritage-red/25'
          }`}
          id="sticky-checkout-btn"
        >
          {checkoutLoading ? (
            <span className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" /> SECURING CHECKOUT...
            </span>
          ) : (
            <span>BUY NOW</span>
          )}
          <div className="absolute inset-0 bg-white/10 translate-x-full group-active:translate-x-0 transition-transform duration-300"></div>
        </button>
      </footer>
    </div>
  );
}

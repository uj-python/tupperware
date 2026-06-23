import React, { useState, useMemo } from 'react';
import { ChevronRight, SlidersHorizontal, ArrowUpDown, ShieldCheck, Check, Sparkles, AlertCircle } from 'lucide-react';
import { Product, Route } from '../types';
import { products } from '../data';

interface ShopScreenProps {
  setRoute: (route: Route) => void;
  setSelectedProductId: (id: string) => void;
  onAddToCart: (product: Product) => void;
}

export default function ShopScreen({ setRoute, setSelectedProductId, onAddToCart }: ShopScreenProps) {
  // Collection tabs
  const categories = ['All', 'Conservation', 'Hydration', 'Lunch', 'Cookware', 'Accessories'];
  const [selectedCategory, setSelectedCategory] = useState('Conservation');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [successAddId, setSuccessAddId] = useState<string | null>(null);

  // Filtered and sorted products catalog
  const filteredProducts = useMemo(() => {
    let result = products;
    if (selectedCategory !== 'All') {
      result = products.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => (b.ratings || 0) - (a.ratings || 0));
    }
    return result;
  }, [selectedCategory, sortBy]);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setSuccessAddId(product.id);
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(8);
    }
    setTimeout(() => {
      setSuccessAddId(null);
    }, 1200);
  };

  return (
    <div className="animate-fade-in pb-28">
      {/* Breadcrumb & Category Title */}
      <section className="px-5 pt-6 pb-4 max-w-7xl mx-auto">
        <nav className="flex text-xs text-tertiary gap-1 items-center mb-2 font-medium">
          <span 
            className="cursor-pointer hover:text-primary"
            onClick={() => setRoute('home')}
          >
            Home
          </span>
          <span className="flex items-center text-on-surface-variant/40">&rsaquo;</span>
          <span className="text-primary font-bold">Food Conservation</span>
        </nav>
        
        {/* Category Description */}
        <h2 className="text-3xl font-extrabold text-on-surface tracking-tight mt-1">
          {selectedCategory === 'All' ? 'Our Collections' : `${selectedCategory} Collection`}
        </h2>
        <p className="font-sans text-body-md text-on-surface-variant max-w-md mt-1 leading-relaxed">
          Engineered to keep your ingredients fresher for longer with our iconic airtight sealing technology.
        </p>
      </section>

      {/* Categories Horizontal Selector Row */}
      <div className="px-5 overflow-x-auto hide-scrollbar py-2 flex gap-2 border-b border-surface-container select-none max-w-7xl mx-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
              selectedCategory === cat 
                ? 'bg-primary text-white shadow-sm shadow-primary/20' 
                : 'bg-warm-sand/50 text-on-surface-variant hover:bg-warm-sand'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sticky Filter & Sort Bar */}
      <nav className="sticky top-16 z-40 bg-surface/90 backdrop-blur-sm px-5 py-4 flex items-center justify-between border-b border-surface-container-high max-w-7xl mx-auto">
        <div className="flex gap-2">
          {/* Sorting switcher */}
          <div className="relative group">
            <select 
              value={sortBy}
              className="appearance-none flex items-center gap-2 pl-4 pr-10 py-2.5 rounded-full border border-outline text-on-surface-variant font-bold text-[10px] tracking-wider uppercase bg-white cursor-pointer select-none focus:outline-none focus:ring-1 focus:ring-primary/25"
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none flex items-center justify-center text-on-surface-variant/70">
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </div>
          </div>

          <button 
            onClick={() => setSortBy('featured')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-outline text-on-surface-variant font-bold text-[10px] tracking-wider uppercase bg-white hover:bg-warm-sand/20 cursor-pointer active:scale-95 transition-all"
          >
            <ArrowUpDown className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
        
        <span className="text-xs font-semibold text-on-surface-variant/80">
          {filteredProducts.length} Items Listed
        </span>
      </nav>

      {/* Product Grid Stage */}
      <section className="px-5 mt-6 max-w-7xl mx-auto">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-soft-gray/30 p-10 flex flex-col items-center">
            <AlertCircle className="w-12 h-12 text-primary/80 mb-3" />
            <h3 className="font-bold text-lg text-on-surface mb-1">No items found</h3>
            <p className="text-on-surface-variant text-sm">We are expanding our product catalog currently. Check out other tabs!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredProducts.map((p, index) => (
              <React.Fragment key={p.id}>
                {/* Insert standard Interstitial Promo Banner on the 3rd index during Conservation flow */}
                {selectedCategory === 'Conservation' && index === 2 && (
                  <div className="col-span-2 bg-warm-sand rounded-2xl p-6 flex flex-col justify-center items-center text-center gap-4 my-2 overflow-hidden relative japandi-shadow border border-soft-gray/30">
                    <div className="z-10">
                      <span className="font-bold text-[10px] text-secondary tracking-widest block mb-2 uppercase">
                        HERITAGE COLLECTION
                      </span>
                      <h3 className="text-lg md:text-2xl font-black text-on-surface">
                        Sustainable by Design
                      </h3>
                      <p className="text-xs text-on-surface-variant max-w-xs mx-auto mt-1 leading-relaxed">
                        Our products are designed to last a lifetime, reducing single-use packaging wastes for a healthier, clean tomorrow.
                      </p>
                      <button 
                        onClick={() => setSelectedCategory('All')}
                        className="mt-4 px-6 py-2.5 bg-secondary hover:bg-emerald-950 text-white font-bold text-[10px] tracking-wider uppercase rounded-full shadow-sm active:scale-95 transition-all"
                      >
                        Explore Our Ethics
                      </button>
                    </div>
                    {/* Glowing eco watermark */}
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-[0.035] pointer-events-none transform translate-x-12 scale-120 z-0">
                      <ShieldCheck className="w-[180px] h-[180px]" />
                    </div>
                  </div>
                )}

                {/* Product Card */}
                <div 
                  onClick={() => {
                    setSelectedProductId(p.id);
                    setRoute('pdp');
                  }}
                  className="group flex flex-col justify-between bg-white rounded-xl overflow-hidden japandi-shadow border border-soft-gray/10 p-1 cursor-pointer transition-all hover:border-soft-gray/30"
                >
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-warm-sand flex items-center justify-center">
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    
                    {p.isBpaFree && (
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        <span className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded text-[8px] font-extrabold text-secondary flex items-center gap-1 shadow-sm uppercase tracking-wider">
                          <ShieldCheck className="w-3.5 h-3.5 text-secondary" /> BPA-FREE
                        </span>
                      </div>
                    )}

                    <button 
                      onClick={(e) => handleQuickAdd(p, e)}
                      disabled={successAddId === p.id}
                      className={`absolute bottom-2.5 right-2.5 w-9 h-9 text-white rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer ${
                        successAddId === p.id 
                          ? 'bg-secondary' 
                          : 'bg-heritage-red hover:bg-primary active:scale-90 scale-100'
                      }`}
                    >
                      {successAddId === p.id ? (
                        <Check className="w-4 h-4 animate-bounce" />
                      ) : (
                        <span className="text-xl font-bold font-sans">+</span>
                      )}
                    </button>
                  </div>

                  <div className="p-3 flex-grow flex flex-col justify-between pt-4">
                    <div>
                      <h3 className="font-sans text-xs font-bold text-on-surface truncate group-hover:text-primary">
                        {p.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-extrabold text-price-active">${p.price.toFixed(2)}</span>
                        {p.originalPrice && (
                          <span className="text-price-strikethrough text-[10px] line-through">${p.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
      </section>

      {/* Loading Spinner for Infinite Scroll imitation */}
      {filteredProducts.length > 0 && (
        <div className="w-full py-12 flex flex-col gap-2 justify-center items-center">
          <div className="w-8 h-8 border-4 border-surface-container border-t-primary rounded-full animate-spin"></div>
          <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">Loading Premium Collection...</p>
        </div>
      )}
    </div>
  );
}

// category helper defaults
function selectedProductIdToTitle(pId: string | null) {
  return '';
}
function selectedProductIdForCategory(pId: string | null) {
  return '';
}
function selectedProductIdForCategoryTitle(pId: string | null) {
  return '';
}
function selectedProductIdForCategoryTitleValue(pId: string | null) {
  return '';
}
function selectedProductIdIdSwitch(pId: string | null) {
  return '';
}
function selectedProductIdValueSelector(pId: string | null) {
  return '';
}
function selectedProductIdForCategoryTextSelector(pId: string | null) {
  return '';
}
function selectedProductIdForCategoryTitleValueSelector(pId: string | null) {
  return '';
}
function selectedProductIdDetails(pId: string | null) {
  return '';
}
function selectedProductIdForHeaderSwitch(pId: string | null) {
  return '';
}
function selectedProductIdForCategoryHeader(pId: string | null) {
  return '';
}
function selectedProductIdForCategoryTitleValueValue(pId: string | null) {
  return '';
}

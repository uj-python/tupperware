import React from 'react';
import { X, Check, ShoppingCart, ShieldCheck, Leaf } from 'lucide-react';
import { Product } from '../types';

interface QuickPeekModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function QuickPeekModal({ product, onClose, onAddToCart }: QuickPeekModalProps) {
  if (!product) return null;

  const [added, setAdded] = React.useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-end justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer content */}
      <div 
        className="relative bg-white w-full max-w-md rounded-t-2xl shadow-xl z-10 overflow-y-auto max-h-[85vh] animate-slide-up border-t border-soft-gray/20"
        id="quick-peek-drawer"
      >
        {/* Header handle for mobile tactile feel */}
        <div className="flex justify-center pt-3 pb-2 cursor-pointer" onClick={onClose}>
          <div className="w-12 h-1.5 bg-soft-gray rounded-full" />
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-all p-2 rounded-full hover:bg-surface-container"
          id="quick-peek-close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content body */}
        <div className="px-5 pb-8 pt-2">
          {/* Product Image Stage */}
          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-warm-sand mb-4 japandi-shadow flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.isBpaFree && (
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[10px] font-bold px-2.5 py-1 rounded-full text-secondary flex items-center gap-1 shadow-sm uppercase tracking-wider">
                <ShieldCheck className="w-3 h-3 text-secondary fill-secondary/10" /> BPA FREE
              </span>
            )}
          </div>

          {/* Product basic details */}
          <span className="text-secondary uppercase text-[10px] font-bold tracking-widest block mb-1">
            {product.category}
          </span>
          <h3 className="font-sans text-xl font-bold text-on-surface leading-tight mb-2">
            {product.name}
          </h3>
          
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-black text-heritage-red">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-price-strikethrough line-through text-sm">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Product Specifications Specifications */}
          {product.specs && (
            <div className="bg-surface-container-low rounded-xl p-4 mb-6 text-xs space-y-2.5 border border-soft-gray/20">
              <h4 className="font-bold text-[10px] uppercase tracking-wider text-secondary mb-1">
                Specifications
              </h4>
              <div className="flex justify-between border-b border-soft-gray/30 pb-2">
                <span className="text-on-surface-variant">Capacity</span>
                <span className="font-semibold text-on-surface">{product.specs.capacity || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b border-soft-gray/30 pb-2">
                <span className="text-on-surface-variant">Material</span>
                <span className="font-semibold text-on-surface">{product.specs.material || 'Premium BPA-free'}</span>
              </div>
              <div className="flex justify-between border-b border-soft-gray/30 pb-2">
                <span className="text-on-surface-variant">Dimensions</span>
                <span className="font-semibold text-on-surface">{product.specs.dimensions || 'Standard'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Dishwasher Safe</span>
                <span className="font-semibold text-on-surface">{product.specs.dishwasherSafe ? 'Yes (Top Rack)' : 'Hand Wash Recommended'}</span>
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <button 
            onClick={handleAdd}
            disabled={added}
            className={`w-full py-4 rounded-full font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 transition-all ${
              added 
                ? 'bg-secondary text-white border-transparent' 
                : 'bg-primary text-white hover:bg-heritage-red shadow-md active:scale-98'
            }`}
            id="quick-peek-add-to-cart"
          >
            {added ? (
              <>
                <Check className="w-4 h-4 animate-bounce" /> Added to Cart!
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" /> Add to Cart — ${product.price.toFixed(2)}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomeScreen from './components/HomeScreen';
import ProductDetailScreen from './components/ProductDetailScreen';
import ShopScreen from './components/ShopScreen';
import CartScreen from './components/CartScreen';
import CheckoutScreen from './components/CheckoutScreen';
import ProfileScreen from './components/ProfileScreen';
import TrackOrderScreen from './components/TrackOrderScreen';
import QuickPeekModal from './components/QuickPeekModal';

import { Route, CartItem, Product, Address, PaymentMethod, Order } from './types';

export default function App() {
  // Global React Navigation routes
  const [route, setRoute] = useState<Route>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('aquavibe');
  
  // Persistence initialization for basket cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('tupperware_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });

  // Track completed orders count dynamically for impact metrics in Profile page
  const [ordersCount, setOrdersCount] = useState<number>(() => {
    const saved = localStorage.getItem('tupperware_orders_count');
    return saved ? parseInt(saved, 10) : 0;
  });

  // User contact destination state parameters for checkout persistence
  const [address, setAddress] = useState<Address>(() => {
    const saved = localStorage.getItem('tupperware_address');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return {
      fullName: 'Sarah Chen',
      streetAddress: '124 Japandi Serenity Avenue, Apt 4B',
      city: 'Seattle',
      postalCode: '98101',
      phoneNumber: '+1 206-555-0143'
    };
  });

  // Active payment gateway toggles
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');

  // Completed purchase order trace
  const [lastOrder, setLastOrder] = useState<Order | null>(() => {
    const saved = localStorage.getItem('tupperware_last_order');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return null;
  });

  // Active Quick Peek state modal parameters
  const [quickPeekProduct, setQuickPeekProduct] = useState<Product | null>(null);

  // Sync state modifications onto client-side storage directories hook
  useEffect(() => {
    localStorage.setItem('tupperware_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('tupperware_orders_count', ordersCount.toString());
  }, [ordersCount]);

  useEffect(() => {
    localStorage.setItem('tupperware_address', JSON.stringify(address));
  }, [address]);

  useEffect(() => {
    if (lastOrder) {
      localStorage.setItem('tupperware_last_order', JSON.stringify(lastOrder));
    } else {
      localStorage.removeItem('tupperware_last_order');
    }
  }, [lastOrder]);

  // Scroll back to page top window coordinates during routes shifting
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [route, selectedProductId]);

  // Add item into basket handler
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const matchIdx = prev.findIndex(item => item.product.id === product.id);
      if (matchIdx > -1) {
        const next = [...prev];
        next[matchIdx].quantity += quantity;
        return next;
      }
      return [...prev, { product, quantity }];
    });
  };

  // Modify baskets quantity delta selector
  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: Math.max(1, newQty) };
        }
        return item;
      });
    });
  };

  // Remove individual item node
  const handleRemoveItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  // Clear entire cart hook
  const handleClearCart = () => {
    setCart([]);
  };

  // Buy Now direct set order checkout
  const handleSingleItemBuyNow = (itemsToBuy: CartItem[]) => {
    // Set checkout cart to just this item temporarily
    setCart(itemsToBuy);
    setRoute('checkout');
  };

  // Global Dynamic Back nav mapping handler
  const handleBackNavigation = () => {
    if (route === 'pdp') {
      setRoute('home');
    } else if (route === 'checkout') {
      setRoute('cart');
    } else if (route === 'track') {
      setRoute('home');
    } else {
      setRoute('home');
    }
  };

  const showBackBtn = route === 'pdp' || route === 'checkout' || route === 'track';

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col antialiased selection:bg-secondary-container selection:text-on-secondary-container">
      {/* Primary fixed header interface screen component */}
      <Header 
        currentRoute={route}
        setRoute={setRoute}
        cart={cart}
        onBack={showBackBtn ? handleBackNavigation : undefined}
      />

      {/* Main Container screen views space */}
      <div className="flex-grow pt-16" id="app-body-wrapper">
        {route === 'home' && (
          <HomeScreen 
            setRoute={setRoute}
            setSelectedProductId={setSelectedProductId}
            onAddToCart={handleAddToCart}
            onTriggerQuickPeek={setQuickPeekProduct}
          />
        )}

        {route === 'shop' && (
          <ShopScreen 
            setRoute={setRoute}
            setSelectedProductId={setSelectedProductId}
            onAddToCart={handleAddToCart}
          />
        )}

        {route === 'pdp' && (
          <ProductDetailScreen 
            productId={selectedProductId}
            onAddToCart={handleAddToCart}
            onPlaceOrder={handleSingleItemBuyNow}
            onGoBack={handleBackNavigation}
          />
        )}

        {route === 'cart' && (
          <CartScreen 
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onAddToCart={handleAddToCart}
            setRoute={setRoute}
          />
        )}

        {route === 'checkout' && (
          <CheckoutScreen 
            cart={cart}
            address={address}
            setAddress={setAddress}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            onClearCart={handleClearCart}
            setRoute={setRoute}
            setLastOrder={(order) => {
              setLastOrder(order);
              setOrdersCount(prev => prev + 1);
            }}
          />
        )}

        {route === 'profile' && (
          <ProfileScreen 
            setRoute={setRoute}
            setSelectedProductId={setSelectedProductId}
            onAddToCart={handleAddToCart}
            lastOrder={lastOrder}
            ordersCount={ordersCount}
          />
        )}

        {route === 'track' && (
          <TrackOrderScreen 
            lastOrder={lastOrder}
            setRoute={setRoute}
          />
        )}
      </div>

      {/* Primary sticky bottom navigation elements bar */}
      <BottomNav 
        currentRoute={route}
        setRoute={setRoute}
        cart={cart}
      />

      {/* Quick peek specifications drawers overlay trigger */}
      <QuickPeekModal 
        product={quickPeekProduct}
        onClose={() => setQuickPeekProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

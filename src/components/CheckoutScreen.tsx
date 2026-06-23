import React, { useState } from 'react';
import { Truck, CreditCard, ShieldCheck, HelpCircle, CheckCircle, RefreshCw, Smartphone, Globe, Landmark } from 'lucide-react';
import { Address, PaymentMethod, CartItem, Route } from '../types';

interface CheckoutScreenProps {
  cart: CartItem[];
  address: Address;
  setAddress: (address: Address) => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  onClearCart: () => void;
  setRoute: (route: Route) => void;
  setLastOrder: (order: any) => void;
}

export default function CheckoutScreen({
  cart,
  address,
  setAddress,
  paymentMethod,
  setPaymentMethod,
  onClearCart,
  setRoute,
  setLastOrder
}: CheckoutScreenProps) {
  
  // Local state for step tracker: 'shipping' | 'payment' | 'review'
  const [activeStep, setActiveStep] = useState<'shipping' | 'payment' | 'review'>('shipping');

  // Local state for input form validations
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Card sub-form parameters
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');

  // Math equations
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = Number((subtotal * 0.08).toFixed(2));
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 4.99;
  const total = Number((subtotal + tax + shipping).toFixed(2));

  // Form input setters
  const handleInputChange = (field: keyof Address, value: string) => {
    setAddress({ ...address, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  // Shipping validation
  const validateShippingForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!address.fullName.trim()) tempErrors.fullName = 'Full Name is required';
    if (!address.streetAddress.trim()) tempErrors.streetAddress = 'Street Address is required';
    if (!address.city.trim()) tempErrors.city = 'City is required';
    if (!address.postalCode.trim()) tempErrors.postalCode = 'Postal Code is required';
    if (!address.phoneNumber.trim()) tempErrors.phoneNumber = 'Phone Number is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNextStep = () => {
    if (activeStep === 'shipping') {
      if (validateShippingForm()) {
        setActiveStep('payment');
      }
    } else if (activeStep === 'payment') {
      // Validate card if chosen
      if (paymentMethod === 'card') {
        if (!cardNumber || !cardExpiry || !cardCVV) {
          alert('Please fill out card attributes');
          return;
        }
      }
      setActiveStep('review');
    }
  };

  const handlePlaceOrder = () => {
    setLoading(true);
    
    // Simulate payment transaction validation
    setTimeout(() => {
      setLoading(false);
      
      const newOrder = {
        id: `TW-${Math.floor(1000000 + Math.random() * 9000000)}`,
        status: 'ordered',
        items: cart,
        subtotal,
        shipping,
        tax,
        total,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        estimatedArrival: 'Today, by 6:00 PM',
        address,
        paymentMethod
      };

      setLastOrder(newOrder);
      onClearCart();
      
      // Haptic vibes logic
      if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate([30, 50, 30]);
      }

      setRoute('track');
    }, 1500);
  };

  return (
    <div className="animate-fade-in pb-36">
      {/* 1. Progress Step Tracker Stepper */}
      <nav className="bg-white px-5 pt-4 pb-2 border-b border-surface-container-high transition-all">
        <div className="flex justify-between items-center max-w-xl mx-auto relative select-none">
          <button 
            onClick={() => setActiveStep('shipping')}
            className={`flex-1 text-center pb-3 relative text-[10px] font-bold uppercase tracking-wider ${
              activeStep === 'shipping' 
                ? "text-primary border-b-2 border-primary" 
                : "text-on-surface-variant/60"
            }`}
          >
            Shipping
          </button>
          
          <button 
            onClick={() => {
              if (validateShippingForm()) setActiveStep('payment');
            }}
            className={`flex-1 text-center pb-3 relative text-[10px] font-bold uppercase tracking-wider ${
              activeStep === 'payment' 
                ? "text-primary border-b-2 border-primary" 
                : "text-on-surface-variant/60"
            }`}
          >
            Payment
          </button>
          
          <button 
            onClick={() => {
              if (validateShippingForm()) setActiveStep('review');
            }}
            className={`flex-1 text-center pb-3 relative text-[10px] font-bold uppercase tracking-wider ${
              activeStep === 'review' 
                ? "text-primary border-b-2 border-primary" 
                : "text-on-surface-variant/60"
            }`}
          >
            Review
          </button>
        </div>
      </nav>

      <main className="max-w-xl mx-auto px-5 mt-6">
        
        {/* Dynamic step view router */}
        {activeStep === 'shipping' && (
          <section className="space-y-6 animate-slide-up">
            <div className="flex items-center gap-2 mb-2">
              <Truck className="w-5 h-5 text-secondary" />
              <h2 className="font-sans text-lg font-black text-on-surface">Shipping Address</h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* Full Name Form */}
              <div className="relative">
                <input 
                  type="text"
                  value={address.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Full Name"
                  className={`w-full h-14 px-4 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm text-on-surface placeholder:text-on-surface-variant/40 ${
                    errors.fullName ? 'ring-2 ring-red-500/50 bg-red-50/20' : ''
                  }`}
                />
                {errors.fullName && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">{errors.fullName}</p>}
              </div>

              {/* Street Form */}
              <div className="relative">
                <input 
                  type="text"
                  value={address.streetAddress}
                  onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                  placeholder="Street Address"
                  className={`w-full h-14 px-4 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm text-on-surface placeholder:text-on-surface-variant/40 ${
                    errors.streetAddress ? 'ring-2 ring-red-500/50 bg-red-50/20' : ''
                  }`}
                />
                {errors.streetAddress && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">{errors.streetAddress}</p>}
              </div>

              {/* City and Postal Forms grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <input 
                    type="text"
                    value={address.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="City"
                    className={`w-full h-14 px-4 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm text-on-surface placeholder:text-on-surface-variant/40 ${
                      errors.city ? 'ring-2 ring-red-500/50 bg-red-50/20' : ''
                    }`}
                  />
                  {errors.city && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">{errors.city}</p>}
                </div>
                
                <div className="relative">
                  <input 
                    type="text"
                    value={address.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    placeholder="Postal Code"
                    className={`w-full h-14 px-4 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm text-on-surface placeholder:text-on-surface-variant/40 ${
                      errors.postalCode ? 'ring-2 ring-red-500/50 bg-red-50/20' : ''
                    }`}
                  />
                  {errors.postalCode && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">{errors.postalCode}</p>}
                </div>
              </div>

              {/* Phone Form */}
              <div className="relative">
                <input 
                  type="tel"
                  value={address.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  placeholder="Phone Number"
                  className={`w-full h-14 px-4 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all font-sans text-sm text-on-surface placeholder:text-on-surface-variant/40 ${
                    errors.phoneNumber ? 'ring-2 ring-red-500/50 bg-red-50/20' : ''
                  }`}
                />
                {errors.phoneNumber && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">{errors.phoneNumber}</p>}
              </div>
            </div>
            
            <button 
              onClick={handleNextStep}
              className="w-full mt-6 bg-secondary text-white py-3.5 rounded-full font-bold uppercase text-xs tracking-wider active:scale-95 shadow-md shadow-secondary/10"
            >
              Continue to Payment &rsaquo;
            </button>
          </section>
        )}

        {activeStep === 'payment' && (
          <section className="space-y-6 animate-slide-up">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-5 h-5 text-secondary" />
              <h2 className="font-sans text-lg font-black text-on-surface">Payment Method</h2>
            </div>

            {/* Payment Nodes Option Selector */}
            <div className="grid grid-cols-1 gap-3">
              {/* Option 1: Mobile UPI */}
              <label className={`flex items-start justify-between p-4 bg-surface-container-low rounded-xl cursor-pointer border-2 transition-all ${
                paymentMethod === 'upi' ? 'border-secondary bg-white' : 'border-transparent'
              }`}>
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-on-surface-variant" />
                  <div>
                    <span className="font-bold text-xs text-on-surface block">UPI / Google Pay</span>
                    <span className="text-[10px] text-on-surface-variant/80">Pay instantly using dynamic UPI applications</span>
                  </div>
                </div>
                <input 
                  type="radio" 
                  name="payment" 
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                  className="text-secondary focus:ring-secondary mt-1" 
                />
              </label>

              {/* Option 2: Credit Card */}
              <div className={`p-4 bg-surface-container-low rounded-xl cursor-pointer border-2 transition-all ${
                paymentMethod === 'card' ? 'border-secondary bg-white' : 'border-transparent animate-fade-in'
              }`}>
                <label className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-on-surface-variant" />
                    <div>
                      <span className="font-bold text-xs text-on-surface block">Credit / Debit Card</span>
                      <span className="text-[10px] text-on-surface-variant/80">Support VISA, Mastercard, Amex, RuPay</span>
                    </div>
                  </div>
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="text-secondary focus:ring-secondary mt-1" 
                  />
                </label>

                {/* Credit Card inputs sub-form */}
                {paymentMethod === 'card' && (
                  <div className="mt-4 pt-4 border-t border-soft-gray/30 space-y-3 animate-slide-up">
                    <input 
                      type="text" 
                      placeholder="Card Number (4000 1234 5678 9010)"
                      value={cardNumber}
                      maxLength={19}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full h-11 px-3 bg-surface-container-low border-none rounded-lg text-xs font-mono font-medium focus:ring-2 focus:ring-primary/25 placeholder:font-sans"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        placeholder="MM/YY"
                        value={cardExpiry}
                        maxLength={5}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full h-11 px-3 bg-surface-container-low border-none rounded-lg text-xs font-mono font-medium focus:ring-2 focus:ring-primary/25 placeholder:font-sans"
                      />
                      <input 
                        type="password" 
                        placeholder="CVV"
                        value={cardCVV}
                        maxLength={4}
                        onChange={(e) => setCardCVV(e.target.value)}
                        className="w-full h-11 px-3 bg-surface-container-low border-none rounded-lg text-xs font-mono font-medium focus:ring-2 focus:ring-primary/25 placeholder:font-sans"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Option 3: Net Banking */}
              <label className={`flex items-start justify-between p-4 bg-surface-container-low rounded-xl cursor-pointer border-2 transition-all ${
                paymentMethod === 'netbanking' ? 'border-secondary bg-white' : 'border-transparent'
              }`}>
                <div className="flex items-center gap-3">
                  <Landmark className="w-5 h-5 text-on-surface-variant" />
                  <div>
                    <span className="font-bold text-xs text-on-surface block">Net Banking</span>
                    <span className="text-[10px] text-on-surface-variant/80">Support for all major national banks</span>
                  </div>
                </div>
                <input 
                  type="radio" 
                  name="payment" 
                  checked={paymentMethod === 'netbanking'}
                  onChange={() => setPaymentMethod('netbanking')}
                  className="text-secondary focus:ring-secondary mt-1" 
                />
              </label>
            </div>
            
            <button 
              onClick={handleNextStep}
              className="w-full mt-6 bg-secondary text-white py-3.5 rounded-full font-bold uppercase text-xs tracking-wider active:scale-95 shadow-md shadow-secondary/10"
            >
              Confirm Payment &rsaquo;
            </button>
          </section>
        )}

        {activeStep === 'review' && (
          <section className="space-y-6 animate-slide-up">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-secondary" />
              <h2 className="font-sans text-lg font-black text-on-surface">Order Certification</h2>
            </div>

            {/* Address Review panel */}
            <div className="bg-surface-container-low rounded-xl p-4.5 space-y-2 border border-soft-gray/20 text-xs">
              <h4 className="font-bold text-[10px] uppercase text-secondary tracking-widest border-b border-soft-gray/30 pb-2 mb-2">
                Deliver Destination
              </h4>
              <p className="text-on-surface font-extrabold">{address.fullName}</p>
              <p className="text-on-surface-variant">{address.streetAddress}</p>
              <p className="text-on-surface-variant">{address.city}, {address.postalCode}</p>
              <p className="text-on-surface-variant/70 font-mono mt-1">{address.phoneNumber}</p>
            </div>

            {/* Payment Review Panel */}
            <div className="bg-surface-container-low rounded-xl p-4.5 space-y-2 border border-soft-gray/20 text-xs">
              <h4 className="font-bold text-[10px] uppercase text-secondary tracking-widest border-b border-soft-gray/30 pb-2 mb-2">
                Payment Channel
              </h4>
              <p className="text-on-surface font-extrabold uppercase">
                {paymentMethod === 'upi' && 'UPI / Google Pay'}
                {paymentMethod === 'card' && 'Credit Credit (VISA/Mastercard)'}
                {paymentMethod === 'netbanking' && 'Net Banking (National Bank)'}
              </p>
              <p className="text-on-surface-variant text-[10px]">Secure integration processed with 256-bit AES encryption.</p>
            </div>
          </section>
        )}

        {/* Dynamic Summary Cards Overlay (Always displayed during inputs) */}
        <section className="mt-8 mb-6 p-5 bg-white rounded-xl border border-soft-gray/20 japandi-shadow animate-fade-in">
          <div className="flex items-center justify-between mb-4 border-b border-soft-gray/30 pb-3">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-on-surface-variant">
              Basket Overview
            </h3>
            <span className="text-[11px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-full font-mono uppercase tracking-wide">
              {cart.reduce((acc, i) => acc + i.quantity, 0)} Items
            </span>
          </div>

          <div className="space-y-4 max-h-40 overflow-y-auto pr-1 hide-scrollbar">
            {cart.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3.5">
                <div className="w-12 h-12 bg-warm-sand rounded-lg overflow-hidden flex-shrink-0 border border-soft-gray/20">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="flex-grow text-xs truncate pr-2">
                  <p className="font-sans font-bold text-on-surface truncate">{item.product.name}</p>
                  <p className="text-[10px] text-on-surface-variant/75 mt-0.5 font-sans">
                    Qty: {item.quantity} &bull; ${item.product.price.toFixed(2)} each
                  </p>
                </div>
                <p className="text-xs font-bold text-price-active font-sans shrink-0">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
            
            {cart.length === 0 && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-warm-sand rounded-lg flex items-center justify-center text-primary-fixed">
                  🏷️
                </div>
                <div>
                  <p className="text-xs font-bold">Eco+ To-Go Set</p>
                  <p className="text-[10px] text-on-surface-variant">Heritage Red</p>
                </div>
                <span className="ml-auto text-xs font-bold text-price-active">$24.99</span>
              </div>
            )}
          </div>
        </section>

        {/* secure trust labels */}
        <div className="flex justify-center gap-6 py-6 opacity-65 grayscale hover:grayscale-0 transition-all duration-300 select-none border-t border-soft-gray/20">
          <div className="flex flex-col items-center text-center gap-1.5 min-w-[70px]">
            <ShieldCheck className="w-5 h-5 text-secondary" />
            <span className="text-[10px] font-bold text-on-surface uppercase tracking-wide">SECURE SSL</span>
          </div>
          <div className="flex flex-col items-center text-center gap-1.5 min-w-[70px]">
            <span className="w-5 h-5 rounded-full bg-secondary text-white text-[10px] font-black flex items-center justify-center">R</span>
            <span className="text-[10px] font-bold text-on-surface uppercase tracking-wide">ECO+ RESIN</span>
          </div>
          <div className="flex flex-col items-center text-center gap-1.5 min-w-[70px]">
            <span className="w-5 h-5 rounded-full border border-secondary text-secondary text-[11px] font-black flex items-center justify-center">B</span>
            <span className="text-[10px] font-bold text-on-surface uppercase tracking-wide">BPA FREE</span>
          </div>
        </div>
      </main>

      {/* Fixed Sticky Footer Panel for Finalization */}
      <footer className="fixed bottom-0 left-0 w-full z-45 bg-white/95 backdrop-blur-md shadow-[0_-4px_22px_rgba(45,45,45,0.06)] px-5 pb-8 pt-4">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-6 h-16">
          <div className="flex flex-col">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant/85 select-none leading-none mb-1">
              Order Total
            </span>
            <span className="text-xl md:text-2xl font-black text-on-surface leading-none">
              ${total === 0 ? '24.99' : total.toFixed(2)}
            </span>
          </div>
          
          <button 
            disabled={loading}
            onClick={activeStep === 'review' ? handlePlaceOrder : handleNextStep}
            className={`flex-grow h-14 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg flex items-center justify-center transition-all ${
              loading 
                ? 'bg-secondary' 
                : 'bg-heritage-red hover:bg-primary shadow-heritage-red/15 active:scale-98 cursor-pointer'
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" /> PLACING ORDER...
              </span>
            ) : activeStep === 'review' ? (
              'Place Order'
            ) : (
              'Submit Step'
            )}
          </button>
        </div>
      </footer>
    </div>
  );
}

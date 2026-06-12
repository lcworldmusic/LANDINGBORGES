import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CartItem, LicenseType } from '../types';
import { X, ShoppingCart, Download, CreditCard, Wallet, Bitcoin, Check, Lock, AlertCircle, Loader } from './Icons';

// Initialize Stripe with your test key
const stripePromise = loadStripe('pk_test_51Sc7gNHvjKsxsT83u0edKbEm49swN5Ff9FUHbcK6FGchNYhf7tNg8gtN4WnDWeq3DdYihVswE5njk1kLp2zvMffw00pxbUfWRI');

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateLicense: (id: string, license: LicenseType) => void;
}

type PaymentMethod = 'card' | 'paypal' | 'crypto';

// Inner component to use Stripe hooks
const CheckoutForm: React.FC<{ 
  total: number, 
  onClose: () => void,
  paymentMethod: PaymentMethod,
  setPaymentMethod: (m: PaymentMethod) => void
}> = ({ total, onClose, paymentMethod, setPaymentMethod }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (paymentMethod !== 'card') {
      alert("Método no implementado en demo. Por favor usa Tarjeta.");
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
        setIsProcessing(false);
        return;
    }

    const { error: paymentMethodError, paymentMethod: paymentMethodResult } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (paymentMethodError) {
      setError(paymentMethodError.message || 'Error en el pago');
      setIsProcessing(false);
    } else {
      setTimeout(() => {
          setIsProcessing(false);
          setIsSuccess(true);
          setTimeout(() => {
              onClose();
              setIsSuccess(false); 
          }, 3000);
      }, 2000);
    }
  };

  const cardStyle = {
    style: {
      base: {
        color: "#C8CDD8",
        fontFamily: '"Share Tech Mono", monospace',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#4a5568"
        },
        iconColor: "#7A5A20"
      },
      invalid: {
        color: "#ef4444",
        iconColor: "#ef4444"
      }
    }
  };

  if (isSuccess) {
      return (
          <div className="p-8 text-center bg-[#08263E]/20 border border-[#0D3A5C]/30 animate-in fade-in zoom-in">
              <div className="w-16 h-16 bg-[#0D3A5C] rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(13,58,92,0.4)]">
                  <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#C8CDD8] mb-2 uppercase tracking-wide font-rubik">¡PAGO EXITOSO!</h3>
              <p className="text-neutral-500 text-xs font-tech uppercase tracking-widest">Tus archivos BORGES están listos.</p>
          </div>
      )
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 pt-2 bg-[#030305] border-t border-[#0D3A5C]/20">
      
      {/* Payment Method Selector */}
      <div className="mb-6">
        <h3 className="text-[10px] font-tech font-bold text-neutral-500 uppercase tracking-[0.2em] mb-3">SISTEMA DE PAGO</h3>
        <div className="grid grid-cols-3 gap-3">
            <button 
            type="button"
            onClick={() => setPaymentMethod('card')}
            className={`flex flex-col items-center justify-center gap-2 p-3 border transition-all ${
                paymentMethod === 'card' 
                ? 'bg-[#08263E]/40 border-[#7A5A20] text-white' 
                : 'bg-[#030305] border-[#0D3A5C]/10 text-neutral-500 hover:border-[#0D3A5C]/30'
            }`}
            >
            <CreditCard className={`w-5 h-5 ${paymentMethod === 'card' ? 'text-[#7A5A20]' : ''}`} />
            <span className="text-[9px] font-tech font-bold uppercase tracking-widest">Tarjeta</span>
            </button>
            <button 
            type="button"
            onClick={() => setPaymentMethod('paypal')}
            className={`flex flex-col items-center justify-center gap-2 p-3 border transition-all ${
                paymentMethod === 'paypal' 
                ? 'bg-[#08263E]/40 border-[#0D3A5C] text-white' 
                : 'bg-[#030305] border-[#0D3A5C]/10 text-neutral-500 hover:border-[#0D3A5C]/30'
            }`}
            >
            <Wallet className={`w-5 h-5 ${paymentMethod === 'paypal' ? 'text-[#0D3A5C]' : ''}`} />
            <span className="text-[9px] font-tech font-bold uppercase tracking-widest">PayPal</span>
            </button>
            <button 
            type="button"
            onClick={() => setPaymentMethod('crypto')}
            className={`flex flex-col items-center justify-center gap-2 p-3 border transition-all ${
                paymentMethod === 'crypto' 
                ? 'bg-[#08263E]/40 border-[#7A5A20] text-white' 
                : 'bg-[#030305] border-[#0D3A5C]/10 text-neutral-500 hover:border-[#0D3A5C]/30'
            }`}
            >
            <Bitcoin className={`w-5 h-5 ${paymentMethod === 'crypto' ? 'text-[#7A5A20]' : ''}`} />
            <span className="text-[9px] font-tech font-bold uppercase tracking-widest">Crypto</span>
            </button>
        </div>
      </div>

      {/* Card Input Section */}
      {paymentMethod === 'card' && (
          <div className="mb-6 space-y-3 animate-in slide-in-from-top-2">
             <label className="text-[10px] font-tech font-bold text-neutral-500 uppercase tracking-widest">Credenciales Bancarias</label>
             <div className="p-4 bg-[#030305] border border-[#0D3A5C]/20 focus-within:border-[#7A5A20]/50 transition-colors">
                 <CardElement options={cardStyle} />
             </div>
             <div className="flex items-center gap-2 text-[10px] text-neutral-500 font-tech uppercase tracking-widest">
                 <Lock className="w-3 h-3 text-[#0D3A5C]" />
                 <span>Encripción BORGES_SSL Activa</span>
             </div>
          </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-900/10 border border-red-500/30 text-red-400 text-[10px] font-tech flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {error}
        </div>
      )}

      {/* Checkout Button */}
      <div className="mt-4">
        <div className="flex justify-between items-end mb-4 py-4 border-t border-[#0D3A5C]/10 border-dashed">
            <span className="text-neutral-500 font-tech font-bold uppercase tracking-widest text-[10px]">TOTAL SISTEMA</span>
            <span className="text-3xl font-bold text-[#C8CDD8] font-tech tracking-tighter">${total.toFixed(2)}</span>
        </div>
        
        <button 
            type="submit"
            disabled={!stripe || isProcessing}
            className={`w-full py-4 font-tech font-bold text-sm uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2 ${
                isProcessing 
                ? 'bg-neutral-900 text-neutral-600 cursor-not-allowed' 
                : 'bg-[#0D3A5C] hover:bg-[#124d7a] text-white'
            }`}
        >
            {isProcessing ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Sincronizando...</span>
                </>
            ) : (
                <>
                  <span>Confirmar Pedido</span>
                </>
            )}
        </button>
      </div>
    </form>
  );
};

export const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onRemoveItem,
  onUpdateLicense
}) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#030305]/80 backdrop-blur-md" onClick={onClose} />
      
      {/* Drawer */}
      <div className="relative w-full max-w-lg bg-[#030305] border-l border-[#0D3A5C]/20 shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-500">
        <div className="p-6 border-b border-[#0D3A5C]/20 flex items-center justify-between bg-[#08263E]/40">
          <h2 className="text-2xl font-bold text-[#C8CDD8] flex items-center gap-3 font-rubik uppercase tracking-tighter">
            <ShoppingCart className="w-6 h-6 text-[#7A5A20]" />
            CARRITO
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-[#0D3A5C]/20 rounded-full transition-colors">
            <X className="w-6 h-6 text-neutral-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-neutral-600 space-y-6">
              <div className="w-24 h-24 rounded-full bg-[#08263E]/10 flex items-center justify-center border border-[#0D3A5C]/10">
                <ShoppingCart className="w-10 h-10 opacity-20 text-[#0D3A5C]" />
              </div>
              <p className="text-xs font-tech uppercase tracking-[0.3em]">Sistema vacío</p>
              <button onClick={onClose} className="px-8 py-3 bg-[#0D3A5C] hover:bg-[#124d7a] text-white font-tech font-bold uppercase tracking-widest text-[10px]">
                Ver Catálogo
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-[#08263E]/10 p-4 border border-[#0D3A5C]/10 flex gap-4 transition-all hover:border-[#0D3A5C]/30">
                  <img 
                    src={item.coverUrl} 
                    alt={item.title} 
                    className="w-24 h-24 object-cover border border-[#0D3A5C]/20 grayscale hover:grayscale-0 transition-all"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-[#C8CDD8] text-lg uppercase truncate tracking-tighter font-rubik">{item.title}</h3>
                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          className="text-neutral-600 hover:text-[#7A5A20] transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[10px] text-[#0D3A5C] font-tech font-bold uppercase tracking-widest">Activo Digital</p>
                    </div>
                    
                    <div className="flex items-end justify-between gap-4">
                      <select 
                        value={item.licenseType}
                        onChange={(e) => onUpdateLicense(item.id, e.target.value as LicenseType)}
                        className="bg-[#030305] text-[10px] text-neutral-400 border border-[#0D3A5C]/20 p-2 focus:outline-none focus:border-[#7A5A20]/40 uppercase font-tech font-bold w-full max-w-[140px]"
                      >
                        {Object.values(LicenseType).map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <div className="text-[#7A5A20] font-bold text-xl font-tech">
                        ${item.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
            <Elements stripe={stripePromise}>
                <CheckoutForm 
                    total={total} 
                    onClose={onClose} 
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                />
            </Elements>
        )}
      </div>
    </div>
  );
};
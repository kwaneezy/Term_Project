import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/button';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function Cart() {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingBag className="size-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
          <Button onClick={() => navigate('/')}>Browse Products</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm p-4 flex gap-4">
              <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="mb-1">{item.name}</h3>
                <div className="text-sm text-gray-600 mb-2">
                  {item.color && <span className="mr-4">Color: {item.color}</span>}
                  {item.storage && <span>Storage: {item.storage}</span>}
                </div>
                <div className="text-blue-600">${item.price}</div>
              </div>

              <div className="flex flex-col items-end justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="size-4" />
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="size-8"
                  >
                    <Minus className="size-3" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="size-8"
                  >
                    <Plus className="size-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${(total * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg">
                <span>Total</span>
                <span className="text-blue-600">${(total * 1.08).toFixed(2)}</span>
              </div>
            </div>

            <Button onClick={() => navigate('/checkout')} className="w-full" size="lg">
              Proceed to Checkout
            </Button>
            
            <Button onClick={() => navigate('/')} variant="outline" className="w-full mt-3">
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

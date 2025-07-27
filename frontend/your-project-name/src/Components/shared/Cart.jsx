import React, { useState } from "react";
import { X, Plus, Minus, ShoppingBag, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CartItem, User } from "@/entities/all";

export default function Cart({ isOpen, onClose, items, onItemsChange }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      await removeItem(itemId);
      return;
    }

    setIsUpdating(true);
    try {
      await CartItem.update(itemId, { quantity: newQuantity });
      onItemsChange();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
    setIsUpdating(false);
  };

  const removeItem = async (itemId) => {
    setIsUpdating(true);
    try {
      await CartItem.delete(itemId);
      onItemsChange();
    } catch (error) {
      console.error("Error removing item:", error);
    }
    setIsUpdating(false);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const proceedToWhatsApp = () => {
    const orderSummary = items.map(item => 
      `${item.product_name} (${item.size || 'No size'}, ${item.color || 'No color'}) - Qty: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
    
    const total = getTotalPrice();
    const message = `Hi! I'd like to place an order:\n\n${orderSummary}\n\nTotal: $${total.toFixed(2)}\n\nPlease let me know about delivery/pickup options.`;
    
    const phoneNumber = "1234567890"; // Replace with actual WhatsApp number
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md clay-element clay-mint">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="clay-element clay-blue p-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-blue-700 flex items-center">
              <ShoppingBag className="w-6 h-6 mr-2" />
              Shopping Cart
            </h2>
            <button
              onClick={onClose}
              className="clay-element clay-pink p-2 hover:scale-110 transition-transform"
            >
              <X className="w-5 h-5 text-pink-600" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="clay-element clay-peach text-center py-16">
                <ShoppingBag className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-orange-700 mb-2">Your cart is empty</h3>
                <p className="text-orange-600">Add some beautiful pieces to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="clay-element clay-lavender p-4 hover:scale-[1.02] transition-transform">
                    <div className="flex gap-4">
                      <div className="clay-element clay-blue p-1 w-16 h-16 shrink-0">
                        <img
                          src={item.product_image || "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"}
                          alt={item.product_name}
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <h4 className="font-bold text-purple-700">{item.product_name}</h4>
                        
                        <div className="flex gap-2">
                          {item.size && (
                            <Badge className="clay-element clay-pink text-pink-700 border-0">
                              {item.size}
                            </Badge>
                          )}
                          {item.color && (
                            <Badge className="clay-element clay-peach text-orange-700 border-0">
                              {item.color}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={isUpdating}
                              className="clay-element clay-blue w-8 h-8 flex items-center justify-center hover:scale-110 transition-transform"
                            >
                              <Minus className="w-4 h-4 text-blue-600" />
                            </button>
                            <span className="font-bold text-gray-800 px-3">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={isUpdating}
                              className="clay-element clay-blue w-8 h-8 flex items-center justify-center hover:scale-110 transition-transform"
                            >
                              <Plus className="w-4 h-4 text-blue-600" />
                            </button>
                          </div>
                          
                          <div className="text-right">
                            <p className="font-bold text-green-600">${(item.price * item.quantity).toFixed(2)}</p>
                            <button
                              onClick={() => removeItem(item.id)}
                              disabled={isUpdating}
                              className="text-red-500 text-sm hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="clay-element clay-pink p-6 space-y-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span className="text-pink-700">Total:</span>
                <span className="text-green-600">${getTotalPrice().toFixed(2)}</span>
              </div>
              
              <Button
                onClick={proceedToWhatsApp}
                className="clay-button w-full text-green-700 hover:scale-105 transition-transform"
                disabled={isUpdating}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Order via WhatsApp
              </Button>
              
              <p className="text-sm text-pink-600 text-center">
                Complete your order through WhatsApp for personalized service
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
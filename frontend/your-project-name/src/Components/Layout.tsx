import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ShoppingBag, Menu, X, Heart, User, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CartItem, User as UserEntity } from "@/entities/all";
import Cart from "../components/shared/Cart";

const navigationItems = [
  { title: "Home", url: createPageUrl("Home") },
  { title: "Products", url: createPageUrl("Products") },
  { title: "About", url: createPageUrl("About") },
  { title: "Contact", url: createPageUrl("Contact") },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
    loadCartItems();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await UserEntity.me();
      setUser(currentUser);
    } catch (error) {
      // User not logged in
    }
  };

  const loadCartItems = async () => {
    try {
      const currentUser = await UserEntity.me();
      const items = await CartItem.filter({ user_email: currentUser.email });
      setCartItems(items);
    } catch (error) {
      // User not logged in or no items
    }
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <style>{`
        :root {
          --clay-lavender: #E6E0FF;
          --clay-mint: #E0FFF4;
          --clay-blue: #E0F4FF;
          --clay-pink: #FFE0F0;
          --clay-peach: #FFEEE0;
          --clay-shadow-light: rgba(255, 255, 255, 0.8);
          --clay-shadow-dark: rgba(0, 0, 0, 0.1);
        }
        
        .clay-element {
          background: var(--clay-lavender);
          border-radius: 20px;
          box-shadow: 
            8px 8px 16px var(--clay-shadow-dark),
            -8px -8px 16px var(--clay-shadow-light),
            inset 2px 2px 4px var(--clay-shadow-light),
            inset -2px -2px 4px var(--clay-shadow-dark);
          transition: all 0.3s ease;
        }
        
        .clay-element:hover {
          transform: translateY(-2px);
          box-shadow: 
            12px 12px 24px var(--clay-shadow-dark),
            -12px -12px 24px var(--clay-shadow-light),
            inset 2px 2px 4px var(--clay-shadow-light),
            inset -2px -2px 4px var(--clay-shadow-dark);
        }
        
        .clay-mint {
          background: var(--clay-mint);
        }
        
        .clay-blue {
          background: var(--clay-blue);
        }
        
        .clay-pink {
          background: var(--clay-pink);
        }
        
        .clay-peach {
          background: var(--clay-peach);
        }
        
        .clay-button {
          background: linear-gradient(145deg, var(--clay-lavender), #D4C5FF);
          border: none;
          border-radius: 16px;
          padding: 12px 24px;
          box-shadow: 
            6px 6px 12px var(--clay-shadow-dark),
            -6px -6px 12px var(--clay-shadow-light);
          transition: all 0.2s ease;
        }
        
        .clay-button:hover {
          transform: translateY(-1px);
          box-shadow: 
            8px 8px 16px var(--clay-shadow-dark),
            -8px -8px 16px var(--clay-shadow-light);
        }
        
        .clay-button:active {
          transform: translateY(1px);
          box-shadow: 
            2px 2px 6px var(--clay-shadow-dark),
            -2px -2px 6px var(--clay-shadow-light);
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 clay-element clay-mint mb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center space-x-2">
              <div className="clay-element clay-pink w-10 h-10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-pink-600" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Boutique
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    location.pathname === item.url
                      ? "clay-element clay-blue text-blue-700 font-medium"
                      : "text-gray-700 hover:text-purple-600"
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="clay-element clay-peach p-3 relative hover:scale-105 transition-transform"
              >
                <ShoppingBag className="w-5 h-5 text-orange-600" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-pink-500 text-white min-w-[20px] h-5 flex items-center justify-center text-xs">
                    {cartCount}
                  </Badge>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden clay-element p-3 hover:scale-105 transition-transform"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/20">
              <nav className="flex flex-col space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.url}
                    className={`px-4 py-3 rounded-2xl transition-all duration-300 ${
                      location.pathname === item.url
                        ? "clay-element clay-blue text-blue-700 font-medium"
                        : "text-gray-700 hover:bg-white/30"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="clay-element clay-mint mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="clay-element clay-pink w-12 h-12 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-pink-600" />
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Boutique
                </span>
              </div>
              <p className="text-gray-600 mb-6 max-w-md">
                Discover your unique style with our carefully curated collection of fashion pieces. 
                Quality, comfort, and elegance in every item.
              </p>
              <div className="flex space-x-3">
                <div className="clay-element clay-blue w-10 h-10 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
                  <span className="text-blue-600 font-bold">f</span>
                </div>
                <div className="clay-element clay-pink w-10 h-10 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
                  <span className="text-pink-600 font-bold">@</span>
                </div>
                <div className="clay-element clay-peach w-10 h-10 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
                  <span className="text-orange-600 font-bold">in</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.title}>
                    <Link
                      to={item.url}
                      className="text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>123 Fashion St, Style City</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>hello@boutique.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; 2025 Boutique. All rights reserved. Made with ❤️ for fashion lovers.</p>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onItemsChange={loadCartItems}
      />
    </div>
  );
}
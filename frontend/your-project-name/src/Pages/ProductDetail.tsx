import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Product, CartItem, User } from "@/entities/all";
import { ArrowLeft, Heart, ShoppingBag, Star, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProductDetail() {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadProduct();
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
    } catch (error) {
      // User not logged in
    }
  };

  const loadProduct = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
      navigate(createPageUrl("Products"));
      return;
    }

    try {
      const products = await Product.filter({ id: productId });
      if (products.length > 0) {
        const productData = products[0];
        setProduct(productData);
        if (productData.sizes && productData.sizes.length > 0) {
          setSelectedSize(productData.sizes[0]);
        }
        if (productData.colors && productData.colors.length > 0) {
          setSelectedColor(productData.colors[0]);
        }
      } else {
        navigate(createPageUrl("Products"));
      }
    } catch (error) {
      console.error("Error loading product:", error);
      navigate(createPageUrl("Products"));
    }
    setIsLoading(false);
  };

  const addToCart = async () => {
    if (!user) {
      await User.loginWithRedirect(window.location.href);
      return;
    }

    setIsAddingToCart(true);
    try {
      await CartItem.create({
        product_id: product.id,
        product_name: product.name,
        product_image: product.image_url,
        price: product.price,
        quantity: quantity,
        size: selectedSize,
        color: selectedColor,
        user_email: user.email
      });
      
      // Show success feedback
      const button = document.querySelector('[data-add-to-cart]');
      const originalText = button.textContent;
      button.textContent = 'Added to Cart!';
      button.classList.add('clay-element', 'clay-mint');
      
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('clay-element', 'clay-mint');
      }, 2000);
      
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
    setIsAddingToCart(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="clay-element animate-pulse">
              <div className="h-96 bg-gray-200 rounded-2xl"></div>
            </div>
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded-full animate-pulse w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded-full animate-pulse w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="clay-element clay-pink text-center p-8">
          <h2 className="text-2xl font-bold text-pink-700 mb-4">Product not found</h2>
          <Button onClick={() => navigate(createPageUrl("Products"))} className="clay-button">
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Button
          onClick={() => navigate(createPageUrl("Products"))}
          className="clay-element clay-blue text-blue-700 mb-8 hover:scale-105 transition-transform"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="clay-element clay-mint p-4 hover:scale-105 transition-transform">
              <img
                src={product.image_url || "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                alt={product.name}
                className="w-full h-96 object-cover rounded-2xl"
              />
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {Array(4).fill(0).map((_, index) => (
                <div key={index} className="clay-element clay-blue p-2 hover:scale-105 transition-transform cursor-pointer">
                  <img
                    src={product.image_url || "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-20 object-cover rounded-2xl"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                {product.featured && (
                  <Badge className="clay-element clay-peach text-orange-700 border-0">
                    Featured
                  </Badge>
                )}
                <Badge className="clay-element clay-blue text-blue-700 border-0">
                  {product.category?.replace(/_/g, ' ')}
                </Badge>
              </div>
              
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-green-600">${product.price}</span>
                <div className="flex items-center clay-element clay-peach px-3 py-1">
                  <Star className="w-4 h-4 text-orange-500 fill-current mr-1" />
                  <span className="text-orange-700 font-medium">4.8 (124 reviews)</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="clay-element clay-pink p-6 hover:scale-105 transition-transform">
                <h3 className="text-lg font-bold text-pink-700 mb-4">Size</h3>
                <div className="grid grid-cols-4 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`p-3 rounded-2xl font-medium transition-all ${
                        selectedSize === size
                          ? "clay-element clay-blue text-blue-700"
                          : "clay-element clay-lavender text-purple-700 hover:scale-110"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="clay-element clay-mint p-6 hover:scale-105 transition-transform">
                <h3 className="text-lg font-bold text-green-700 mb-4">Color</h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 rounded-full border-4 transition-all hover:scale-110 ${
                        selectedColor === color ? "border-purple-500" : "border-white"
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                </div>
                <p className="text-green-600 mt-2 font-medium">Selected: {selectedColor}</p>
              </div>
            )}

            {/* Quantity */}
            <div className="clay-element clay-peach p-6 hover:scale-105 transition-transform">
              <h3 className="text-lg font-bold text-orange-700 mb-4">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="clay-element clay-blue w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <span className="text-blue-700 font-bold">-</span>
                </button>
                <span className="text-2xl font-bold text-gray-800 px-4">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="clay-element clay-blue w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <span className="text-blue-700 font-bold">+</span>
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <Button
                onClick={addToCart}
                disabled={isAddingToCart || !product.in_stock}
                data-add-to-cart
                className="clay-button w-full text-lg py-4 text-purple-700 hover:scale-105 transition-transform"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                {isAddingToCart ? "Adding..." : "Add to Cart"}
              </Button>
              
              <Button className="clay-element clay-pink w-full text-lg py-4 text-pink-700 hover:scale-105 transition-transform">
                <Heart className="w-5 h-5 mr-2" />
                Add to Wishlist
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="clay-element clay-blue text-center p-4 hover:scale-105 transition-transform">
                <Truck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-blue-700 font-medium text-sm">Free Delivery</p>
              </div>
              <div className="clay-element clay-mint text-center p-4 hover:scale-105 transition-transform">
                <RotateCcw className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-green-700 font-medium text-sm">Easy Returns</p>
              </div>
              <div className="clay-element clay-peach text-center p-4 hover:scale-105 transition-transform">
                <Shield className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-orange-700 font-medium text-sm">Quality Guarantee</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16 clay-element clay-lavender p-8 hover:scale-105 transition-transform">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-purple-700 mb-6">Product Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-gray-800 mb-3">Materials & Care</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• 100% Premium Cotton</li>
                  <li>• Machine wash cold</li>
                  <li>• Tumble dry low</li>
                  <li>• Iron on low heat if needed</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-3">Size Guide</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• XS: 32-34" bust, 24-26" waist</li>
                  <li>• S: 34-36" bust, 26-28" waist</li>
                  <li>• M: 36-38" bust, 28-30" waist</li>
                  <li>• L: 38-40" bust, 30-32" waist</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
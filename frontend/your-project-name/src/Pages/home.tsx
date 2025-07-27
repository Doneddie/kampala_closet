import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Product } from "@/entities/Product";
import { ArrowRight, Star, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "../Components/products/ProductCard";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const products = await Product.filter({ featured: true }, "-created_date", 6);
      setFeaturedProducts(products);
    } catch (error) {
      console.error("Error loading featured products:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="clay-element clay-pink inline-flex items-center px-4 py-2 hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4 text-pink-600 mr-2" />
                <span className="text-pink-700 font-medium">New Collection</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent leading-tight">
                Discover Your
                <br />
                Perfect Style
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Curated fashion pieces that celebrate your individuality. 
                From everyday elegance to statement pieces, find your signature look.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={createPageUrl("Products")}>
                  <Button className="clay-button w-full sm:w-auto px-8 py-4 text-lg font-medium text-purple-700 hover:scale-105 transition-transform">
                    Shop Collection
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to={createPageUrl("About")}>
                  <Button className="clay-element clay-blue w-full sm:w-auto px-8 py-4 text-lg font-medium text-blue-700 hover:scale-105 transition-transform">
                    Our Story
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="clay-element clay-mint p-8 hover:scale-105 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Fashion collection"
                  className="w-full h-96 object-cover rounded-2xl"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 clay-element clay-peach p-4 hover:scale-105 transition-transform">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-orange-500 fill-current" />
                  <span className="font-bold text-orange-700">4.9/5</span>
                  <span className="text-orange-600">Reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="clay-element clay-blue inline-flex items-center px-4 py-2 mb-4 hover:scale-105 transition-transform">
              <TrendingUp className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-blue-700 font-medium">Trending Now</span>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Featured Collection
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of must-have pieces that define this season's trends
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill(0).map((_, index) => (
                <div key={index} className="clay-element animate-pulse">
                  <div className="h-64 bg-gray-200 rounded-t-2xl"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded-full"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to={createPageUrl("Products")}>
              <Button className="clay-button px-8 py-4 text-lg font-medium text-purple-700 hover:scale-105 transition-transform">
                View All Products
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="clay-element clay-mint text-center p-8 hover:scale-105 transition-transform">
              <div className="clay-element clay-blue w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-bold text-green-700 mb-3">Free Delivery</h3>
              <p className="text-green-600">Fast and free delivery on orders over $50. We'll bring style right to your doorstep.</p>
            </div>

            <div className="clay-element clay-pink text-center p-8 hover:scale-105 transition-transform">
              <div className="clay-element clay-peach w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-xl font-bold text-pink-700 mb-3">Premium Quality</h3>
              <p className="text-pink-600">Carefully selected materials and craftsmanship that stands the test of time.</p>
            </div>

            <div className="clay-element clay-peach text-center p-8 hover:scale-105 transition-transform">
              <div className="clay-element clay-mint w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-orange-700 mb-3">Personal Service</h3>
              <p className="text-orange-600">Dedicated support to help you find the perfect pieces for your unique style.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
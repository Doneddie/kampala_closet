import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProductCard({ product, viewMode = "grid" }) {
  const isListView = viewMode === "list";

  if (isListView) {
    return (
      <div className="clay-element clay-mint p-6 flex gap-6 hover:scale-[1.02] transition-transform">
        <div className="clay-element clay-blue p-2 w-32 h-32 shrink-0">
          <img
            src={product.image_url || "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"}
            alt={product.name}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
        
        <div className="flex-1 space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{product.description}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">${product.price}</p>
              <Badge className="clay-element clay-peach text-orange-700 border-0 mt-1">
                {product.category?.replace(/_/g, ' ')}
              </Badge>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {product.sizes?.slice(0, 3).map((size) => (
                <span key={size} className="clay-element clay-pink px-2 py-1 text-xs font-medium text-pink-700">
                  {size}
                </span>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Button className="clay-button text-purple-700 hover:scale-105 transition-transform">
                <Eye className="w-4 h-4 mr-2" />
                View
              </Button>
              <Button className="clay-element clay-blue text-blue-700 hover:scale-105 transition-transform">
                <ShoppingBag className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="clay-element clay-mint group hover:scale-105 transition-transform duration-300">
      {/* Image */}
      <div className="relative clay-element clay-blue p-2 mb-4">
        <img
          src={product.image_url || "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"}
          alt={product.name}
          className="w-full h-64 object-cover rounded-2xl"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-2 bg-black bg-opacity-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Button className="clay-element clay-lavender text-purple-700 hover:scale-110 transition-transform">
            <Eye className="w-4 h-4" />
          </Button>
          <Button className="clay-element clay-peach text-orange-700 hover:scale-110 transition-transform">
            <Heart className="w-4 h-4" />
          </Button>
          <Button className="clay-element clay-pink text-pink-700 hover:scale-110 transition-transform">
            <ShoppingBag className="w-4 h-4" />
          </Button>
        </div>

        {/* Badges */}
        {product.featured && (
          <Badge className="absolute top-4 left-4 clay-element clay-peach text-orange-700 border-0">
            Featured
          </Badge>
        )}
        {!product.in_stock && (
          <Badge className="absolute top-4 right-4 clay-element bg-gray-400 text-white border-0">
            Out of Stock
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-purple-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <p className="text-2xl font-bold text-green-600">${product.price}</p>
          <Badge className="clay-element clay-blue text-blue-700 border-0">
            {product.category?.replace(/_/g, ' ')}
          </Badge>
        </div>

        {/* Sizes */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="flex gap-2 mb-4 flex-wrap">
            {product.sizes.slice(0, 4).map((size) => (
              <span key={size} className="clay-element clay-pink px-3 py-1 text-sm font-medium text-pink-700">
                {size}
              </span>
            ))}
            {product.sizes.length > 4 && (
              <span className="clay-element clay-lavender px-2 py-1 text-xs text-purple-700">
                +{product.sizes.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex gap-2 mb-4">
            {product.colors.slice(0, 5).map((color, index) => (
              <div
                key={color}
                className="w-6 h-6 rounded-full clay-element"
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
              />
            ))}
          </div>
        )}

        <Link to={createPageUrl(`ProductDetail?id=${product.id}`)}>
          <Button className="clay-button w-full text-purple-700 hover:scale-105 transition-transform">
            <ShoppingBag className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

export default function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange
}) {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="clay-element clay-mint p-6 hover:scale-105 transition-transform">
        <h3 className="text-lg font-bold text-green-700 mb-4">Categories</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`w-full text-left p-3 rounded-2xl transition-all duration-300 ${
                selectedCategory === category.id
                  ? "clay-element clay-blue text-blue-700 font-medium"
                  : "hover:bg-white/50 text-gray-700"
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{category.name}</span>
                <Badge className="clay-element clay-peach text-orange-700 border-0">
                  {category.count}
                </Badge>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="clay-element clay-pink p-6 hover:scale-105 transition-transform">
        <h3 className="text-lg font-bold text-pink-700 mb-4">Price Range</h3>
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          <Slider
            value={priceRange}
            onValueChange={onPriceRangeChange}
            max={1000}
            min={0}
            step={10}
            className="w-full"
          />
          <div className="text-center">
            <Badge className="clay-element clay-lavender text-purple-700 border-0">
              ${priceRange[0]} - ${priceRange[1]}
            </Badge>
          </div>
        </div>
      </div>

      {/* Size Filter */}
      <div className="clay-element clay-peach p-6 hover:scale-105 transition-transform">
        <h3 className="text-lg font-bold text-orange-700 mb-4">Sizes</h3>
        <div className="grid grid-cols-3 gap-2">
          {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
            <button
              key={size}
              className="clay-element clay-blue p-2 text-sm font-medium text-blue-700 hover:scale-110 transition-transform"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Filters */}
      <div className="clay-element clay-lavender p-6 hover:scale-105 transition-transform">
        <h3 className="text-lg font-bold text-purple-700 mb-4">Quick Filters</h3>
        <div className="space-y-2">
          <button className="w-full text-left p-2 rounded-2xl hover:bg-white/30 text-gray-700 transition-all">
            New Arrivals
          </button>
          <button className="w-full text-left p-2 rounded-2xl hover:bg-white/30 text-gray-700 transition-all">
            On Sale
          </button>
          <button className="w-full text-left p-2 rounded-2xl hover:bg-white/30 text-gray-700 transition-all">
            Best Sellers
          </button>
          <button className="w-full text-left p-2 rounded-2xl hover:bg-white/30 text-gray-700 transition-all">
            In Stock Only
          </button>
        </div>
      </div>
    </div>
  );
}
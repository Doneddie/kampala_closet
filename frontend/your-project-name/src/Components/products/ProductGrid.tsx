import React from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, viewMode = "grid", isLoading = false }) {
  if (isLoading) {
    return (
      <div className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}>
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
    );
  }

  if (products.length === 0) {
    return (
      <div className="clay-element clay-mint text-center py-16">
        <p className="text-2xl text-green-700 mb-2">No products found</p>
        <p className="text-green-600">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}>
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          viewMode={viewMode}
        />
      ))}
    </div>
  );
}
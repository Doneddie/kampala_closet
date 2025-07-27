import React, { useState, useEffect } from "react";
import { Product } from "@/entities/Product";
import { Filter, Grid, List, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProductCard from "../Components/products/ProductCard";
import ProductFilters from "../Components/products/ProductFilters";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, selectedCategory, priceRange]);

  const loadProducts = async () => {
    try {
      const allProducts = await Product.list("-created_date");
      setProducts(allProducts);
    } catch (error) {
      console.error("Error loading products:", error);
    }
    setIsLoading(false);
  };

  const filterProducts = () => {
    let filtered = products;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(filtered);
  };

  const categories = [
    { id: "all", name: "All Products", count: products.length },
    { id: "dresses", name: "Dresses", count: products.filter(p => p.category === "dresses").length },
    { id: "tops", name: "Tops", count: products.filter(p => p.category === "tops").length },
    { id: "bottoms", name: "Bottoms", count: products.filter(p => p.category === "bottoms").length },
    { id: "accessories", name: "Accessories", count: products.filter(p => p.category === "accessories").length },
    { id: "shoes", name: "Shoes", count: products.filter(p => p.category === "shoes").length },
    { id: "outerwear", name: "Outerwear", count: products.filter(p => p.category === "outerwear").length },
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Our Collection
          </h1>
          <p className="text-xl text-gray-600">
            Discover {products.length} carefully curated pieces that celebrate your unique style
          </p>
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 clay-element border-0 text-gray-700 placeholder-gray-500"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              className="clay-button text-purple-700 hover:scale-105 transition-transform"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            
            <div className="clay-element flex">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-l-2xl transition-all ${
                  viewMode === "grid" ? "clay-element clay-blue" : ""
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-r-2xl transition-all ${
                  viewMode === "list" ? "clay-element clay-blue" : ""
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-80 shrink-0`}>
            <ProductFilters
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {isLoading ? (
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
            ) : filteredProducts.length === 0 ? (
              <div className="clay-element clay-mint text-center py-16">
                <p className="text-2xl text-green-700 mb-2">No products found</p>
                <p className="text-green-600">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}>
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
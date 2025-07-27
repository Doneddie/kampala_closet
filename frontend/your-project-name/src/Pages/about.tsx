import React from "react";
import { Heart, Users, Award, Sparkles } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="clay-element clay-pink inline-flex items-center px-6 py-3 mb-6 hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 text-pink-600 mr-2" />
            <span className="text-pink-700 font-medium">Our Story</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Fashion with Purpose
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Born from a passion for timeless elegance and sustainable fashion, our boutique celebrates 
            individuality while respecting our planet and the artisans who create beauty in every stitch.
          </p>
        </div>

        {/* Story Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="clay-element clay-mint p-2 hover:scale-105 transition-transform duration-500">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Boutique interior"
              className="w-full h-80 object-cover rounded-2xl"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Crafting Stories Through Style
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Founded in 2020, our boutique began as a dream to create a space where fashion meets conscience. 
              We believe that every piece of clothing tells a story – from the hands that crafted it to the 
              moments you'll create while wearing it.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our carefully curated collection features emerging designers and established brands who share 
              our commitment to quality, sustainability, and ethical production. Each item is selected not 
              just for its beauty, but for the values it represents.
            </p>
            <div className="clay-element clay-blue p-4 hover:scale-105 transition-transform">
              <p className="text-blue-700 font-medium italic">
                "Style is a way to say who you are without having to speak." - Rachel Zoe
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="clay-element clay-peach text-center p-8 hover:scale-105 transition-transform">
              <div className="clay-element clay-mint w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-orange-700 mb-4">Quality First</h3>
              <p className="text-orange-600">
                We believe in investing in pieces that last. Every item is chosen for its superior 
                craftsmanship and timeless appeal.
              </p>
            </div>

            <div className="clay-element clay-blue text-center p-8 hover:scale-105 transition-transform">
              <div className="clay-element clay-pink w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Users className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-700 mb-4">Community Focus</h3>
              <p className="text-blue-600">
                Supporting local artisans and small businesses while building a community of 
                fashion-conscious individuals.
              </p>
            </div>

            <div className="clay-element clay-mint text-center p-8 hover:scale-105 transition-transform">
              <div className="clay-element clay-peach w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-green-700 mb-4">Sustainable Style</h3>
              <p className="text-green-600">
                Committed to environmentally conscious practices and supporting brands that 
                prioritize sustainability.
              </p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="clay-element clay-pink p-6 hover:scale-105 transition-transform">
              <div className="clay-element clay-blue w-20 h-20 mx-auto mb-4 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b4c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                  alt="Sarah Johnson"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <h3 className="font-bold text-pink-700 mb-2">Sarah Johnson</h3>
              <p className="text-pink-600 text-sm mb-2">Founder & Creative Director</p>
              <p className="text-gray-600 text-sm">
                With 10+ years in fashion, Sarah brings vision and passion to every collection.
              </p>
            </div>

            <div className="clay-element clay-mint p-6 hover:scale-105 transition-transform">
              <div className="clay-element clay-peach w-20 h-20 mx-auto mb-4 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                  alt="Michael Chen"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <h3 className="font-bold text-green-700 mb-2">Michael Chen</h3>
              <p className="text-green-600 text-sm mb-2">Operations Manager</p>
              <p className="text-gray-600 text-sm">
                Ensuring every customer experience is seamless and every delivery is perfect.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="clay-element clay-lavender p-8 text-center hover:scale-105 transition-transform">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">Our Mission</h2>
          <p className="text-purple-600 text-lg leading-relaxed max-w-3xl mx-auto">
            To empower individuals to express their unique style through thoughtfully curated, 
            high-quality fashion that celebrates both personal expression and social responsibility. 
            We're not just selling clothes – we're sharing stories, supporting dreams, and building 
            a more conscious fashion future.
          </p>
        </div>
      </div>
    </div>
  );
}
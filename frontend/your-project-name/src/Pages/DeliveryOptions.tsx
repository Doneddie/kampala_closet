import React, { useState } from "react";
import { MapPin, Truck, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function DeliveryOptions() {
  const [selectedOption, setSelectedOption] = useState("delivery");
  const [deliveryData, setDeliveryData] = useState({
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    specialInstructions: ""
  });

  const deliveryZones = [
    { area: "Downtown", time: "Same day", price: "Free" },
    { area: "Suburbs", time: "1-2 days", price: "Free" },
    { area: "Extended Area", time: "2-3 days", price: "$5.99" }
  ];

  const handleInputChange = (field, value) => {
    setDeliveryData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Delivery & Pickup Options
          </h1>
          <p className="text-xl text-gray-600">
            Choose how you'd like to receive your beautiful new pieces
          </p>
        </div>

        {/* Option Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <button
            onClick={() => setSelectedOption("delivery")}
            className={`clay-element p-8 text-left hover:scale-105 transition-transform ${
              selectedOption === "delivery" ? "clay-blue" : "clay-mint"
            }`}
          >
            <div className="flex items-center mb-4">
              <div className="clay-element clay-peach w-12 h-12 flex items-center justify-center mr-4">
                <Truck className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className={`text-2xl font-bold ${
                selectedOption === "delivery" ? "text-blue-700" : "text-green-700"
              }`}>
                Home Delivery
              </h3>
            </div>
            <p className={`text-lg ${
              selectedOption === "delivery" ? "text-blue-600" : "text-green-600"
            }`}>
              We'll bring your order right to your doorstep. Free delivery on orders over $50.
            </p>
          </button>

          <button
            onClick={() => setSelectedOption("pickup")}
            className={`clay-element p-8 text-left hover:scale-105 transition-transform ${
              selectedOption === "pickup" ? "clay-blue" : "clay-pink"
            }`}
          >
            <div className="flex items-center mb-4">
              <div className="clay-element clay-mint w-12 h-12 flex items-center justify-center mr-4">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <h3 className={`text-2xl font-bold ${
                selectedOption === "pickup" ? "text-blue-700" : "text-pink-700"
              }`}>
                Store Pickup
              </h3>
            </div>
            <p className={`text-lg ${
              selectedOption === "pickup" ? "text-blue-600" : "text-pink-600"
            }`}>
              Visit our boutique to collect your order. Get personalized styling advice too!
            </p>
          </button>
        </div>

        {/* Delivery Form */}
        {selectedOption === "delivery" && (
          <div className="clay-element clay-lavender p-8 mb-8 hover:scale-105 transition-transform">
            <h2 className="text-2xl font-bold text-purple-700 mb-6">Delivery Details</h2>
            
            {/* Delivery Zones */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Delivery Areas & Times</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {deliveryZones.map((zone, index) => (
                  <div key={index} className="clay-element clay-mint p-4 text-center hover:scale-105 transition-transform">
                    <h4 className="font-bold text-green-700">{zone.area}</h4>
                    <div className="flex items-center justify-center mt-2 text-green-600">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">{zone.time}</span>
                    </div>
                    <p className="text-green-700 font-medium mt-1">{zone.price}</p>
                  </div>
                ))}
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address
                  </label>
                  <Input
                    value={deliveryData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="clay-element border-0"
                    placeholder="123 Fashion Street"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <Input
                    value={deliveryData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="clay-element border-0"
                    placeholder="Style City"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code
                  </label>
                  <Input
                    value={deliveryData.zipCode}
                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    className="clay-element border-0"
                    placeholder="12345"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    value={deliveryData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="clay-element border-0"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Instructions
                </label>
                <Textarea
                  value={deliveryData.specialInstructions}
                  onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                  className="clay-element border-0 h-24"
                  placeholder="Any special delivery instructions..."
                />
              </div>
            </form>
          </div>
        )}

        {/* Pickup Information */}
        {selectedOption === "pickup" && (
          <div className="clay-element clay-peach p-8 mb-8 hover:scale-105 transition-transform">
            <h2 className="text-2xl font-bold text-orange-700 mb-6">Pickup Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="clay-element clay-mint p-3">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Store Location</h3>
                    <p className="text-gray-600">
                      123 Fashion Street<br />
                      Style City, SC 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="clay-element clay-blue p-3">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Store Hours</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>Monday - Friday: 10:00 AM - 8:00 PM</p>
                      <p>Saturday: 10:00 AM - 6:00 PM</p>
                      <p>Sunday: 12:00 PM - 5:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="clay-element clay-pink p-3">
                    <Phone className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Contact</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>

              <div className="clay-element clay-mint p-6">
                <h3 className="text-lg font-bold text-green-700 mb-4">Pickup Benefits</h3>
                <ul className="text-green-600 space-y-3">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Personal styling consultation
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Try before you take home
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Immediate availability
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Meet our friendly team
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 clay-element clay-blue p-4 text-center">
              <p className="text-blue-700 font-medium">
                💡 Pro Tip: Call ahead to ensure your order is ready for pickup!
              </p>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="text-center">
          <Button className="clay-button px-12 py-4 text-lg text-purple-700 hover:scale-105 transition-transform">
            Confirm {selectedOption === "delivery" ? "Delivery" : "Pickup"} Option
          </Button>
        </div>
      </div>
    </div>
  );
}
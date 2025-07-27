import React from "react";

export default function LoadingSpinner({ size = "md", color = "purple" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  const colorClasses = {
    purple: "border-purple-500",
    blue: "border-blue-500",
    pink: "border-pink-500",
    green: "border-green-500"
  };

  return (
    <div className={`animate-spin rounded-full ${sizeClasses[size]} border-2 border-gray-200 ${colorClasses[color]} border-t-transparent`} />
  );
}
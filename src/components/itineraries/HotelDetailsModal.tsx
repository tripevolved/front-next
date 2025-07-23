"use client";

import { useState } from "react";
import Image from "next/image";

interface HotelDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotel: {
    name: string;
    description: string;
    image: string;
    details?: {
      description: string;
      highlight: string;
      images: string[];
      includedServices: string[];
    };
  };
}

export function HotelDetailsModal({ isOpen, onClose, hotel }: HotelDetailsModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !hotel.details) return null;

  const images = [hotel.image, ...hotel.details.images];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-baloo font-bold text-secondary-900">
            {hotel.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image Carousel */}
          <div className="relative mb-6">
            <div className="relative h-80 rounded-xl overflow-hidden">
              <Image
                src={images[currentImageIndex]}
                alt={hotel.name}
                fill
                className="object-cover"
              />
            </div>
            
            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Image Indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex ? "bg-white" : "bg-white bg-opacity-50"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Hotel Information */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Description */}
            <div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                Sobre o hotel
              </h3>
              <p className="text-secondary-700 leading-relaxed mb-6">
                {hotel.details.description}
              </p>

              {/* Highlight */}
              <div className="bg-primary-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-primary-900 mb-2">
                  Destaque
                </h4>
                <p className="text-primary-700">
                  {hotel.details.highlight}
                </p>
              </div>
            </div>

            {/* Right Column - Services */}
            <div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                Serviços incluídos
              </h3>
              <div className="space-y-3">
                {hotel.details.includedServices.map((service, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full flex-shrink-0"></div>
                    <span className="text-secondary-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export interface MapProps {
  apiKey: string;
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: string;
  width?: string;
  className?: string;
  showControls?: boolean;
}

const Map: React.FC<MapProps> = ({
  apiKey,
  center = { lat: 0, lng: 0 },
  zoom = 10,
  height = '400px',
  width = '100%',
  className = '',
  showControls = true,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize Google Maps API
  useEffect(() => {
    const loader = new Loader({
      apiKey,
      version: 'weekly',
    });

    loader
      .load()
      .then((google) => {
        setIsLoading(false);
        
        if (mapRef.current) {
          const mapInstance = new google.maps.Map(mapRef.current, {
            center,
            zoom,
            disableDefaultUI: !showControls,
            zoomControl: showControls,
            mapTypeControl: showControls,
            scaleControl: showControls,
            streetViewControl: showControls,
            rotateControl: showControls,
            fullscreenControl: showControls,
          });
          
          setMap(mapInstance);
        }
      })
      .catch((err) => {
        console.error('Error loading Google Maps API:', err);
        setError(err.message);
        setIsLoading(false);
      });
  }, [apiKey, center, zoom, showControls]);

  if (error) {
    return (
      <div 
        style={{ height, width }} 
        className={`${className} flex items-center justify-center bg-red-50 text-red-600`}
      >
        Error loading map: {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div 
        style={{ height, width }} 
        className={`${className} flex items-center justify-center bg-gray-100`}
      >
        Loading map...
      </div>
    );
  }

  return (
    <div 
      ref={mapRef}
      style={{ height, width }} 
      className={className}
    />
  );
};

export default Map;

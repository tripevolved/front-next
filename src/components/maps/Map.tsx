'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export interface MapMarker {
  id: string;
  position: {
    lat: number;
    lng: number;
  };
  title?: string;
  info?: string;
  icon?: string;
}

export interface MapProps {
  apiKey: string;
  center?: { lat: number; lng: number };
  zoom?: number;
  markers?: MapMarker[];
  height?: string;
  width?: string;
  className?: string;
  onMarkerClick?: (marker: MapMarker) => void;
  onMapClick?: (position: { lat: number; lng: number }) => void;
  showControls?: boolean;
  mapTypeId?: string;
  styles?: any[];
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
}

const Map: React.FC<MapProps> = ({
  apiKey,
  center = { lat: 0, lng: 0 },
  zoom = 10,
  markers = [],
  height = '400px',
  width = '100%',
  className = '',
  onMarkerClick,
  onMapClick,
  showControls = true,
  mapTypeId = 'roadmap',
  styles = [],
  loadingComponent = <div className="flex items-center justify-center h-full">Loading map...</div>,
  errorComponent = <div className="flex items-center justify-center h-full text-red-500">Error loading map</div>
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [mapMarkers, setMapMarkers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [googleMaps, setGoogleMaps] = useState<any>(null);

  // Initialize Google Maps API
  useEffect(() => {
    const loader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['places']
    });

    loader
      .load()
      .then((google) => {
        setGoogleMaps(google);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error loading Google Maps API:', err);
        setError(err.message);
        setIsLoading(false);
      });
  }, [apiKey]);

  // Initialize map
  useEffect(() => {
    if (!googleMaps || !mapRef.current) return;

    const mapInstance = new googleMaps.maps.Map(mapRef.current, {
      center,
      zoom,
      mapTypeId,
      styles,
      disableDefaultUI: !showControls,
      zoomControl: showControls,
      mapTypeControl: showControls,
      scaleControl: showControls,
      streetViewControl: showControls,
      rotateControl: showControls,
      fullscreenControl: showControls
    });

    setMap(mapInstance);

    // Add click listener to map
    if (onMapClick) {
      mapInstance.addListener('click', (event: any) => {
        if (event.latLng) {
          onMapClick({
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
          });
        }
      });
    }
  }, [googleMaps, center, zoom, mapTypeId, styles, showControls, onMapClick]);

  // Update markers when markers prop changes
  useEffect(() => {
    if (!map || !googleMaps) return;

    // Clear existing markers
    mapMarkers.forEach(marker => marker.setMap(null));
    setMapMarkers([]);

    // Add new markers
    const newMarkers = markers.map((markerData) => {
      const marker = new googleMaps.maps.Marker({
        position: markerData.position,
        map,
        title: markerData.title,
        icon: markerData.icon
      });

      // Add click listener to marker
      if (onMarkerClick) {
        marker.addListener('click', () => {
          onMarkerClick(markerData);
        });
      }

      // Add info window if info is provided
      if (markerData.info) {
        const infoWindow = new (googleMaps.maps as any).InfoWindow({
          content: `
            <div class="p-2">
              <h3 class="font-semibold text-gray-900">${markerData.title || ''}</h3>
              <p class="text-gray-700">${markerData.info}</p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      }

      return marker;
    });

    setMapMarkers(newMarkers);
  }, [map, googleMaps, markers, onMarkerClick]);

  // Update map center and zoom when props change
  useEffect(() => {
    if (!map) return;

    map.setCenter(center);
    map.setZoom(zoom);
  }, [map, center, zoom]);

  if (error) {
    return (
      <div 
        style={{ height, width }} 
        className={`${className}`}
      >
        {errorComponent}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div 
        style={{ height, width }} 
        className={`${className}`}
      >
        {loadingComponent}
      </div>
    );
  }

  return (
    <div 
      ref={mapRef}
      style={{ height, width }} 
      className={`${className}`}
    />
  );
};

export default Map;

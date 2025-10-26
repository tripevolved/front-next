"use client";

import React, { useState, useEffect } from "react";
import CruiseCarousel from "./CruiseCarousel";
import { CruisesApiService } from "@/clients/cruises";
import { CruiseType, CruiseCardData } from "@/clients/cruises/cruises";
import Button from "../common/Button";

interface CruiseSectionsProps {
  handleClick: () => void;
}

const cruiseTypeConfig = {
  relax: {
    label: "Bem-estar e tranquilidade",
    description: "Cruzeiros focados em relaxamento e bem-estar"
  },
  destination: {
    label: "Experiências nos destinos",
    description: "Cruzeiros com foco em destinos únicos e experiências gastronômicas"
  },
  expedition: {
    label: "Expedições únicas",
    description: "Cruzeiros de aventura e exploração"
  },
  river: {
    label: "Fluviais",
    description: "Cruzeiros fluviais por rios icônicos do mundo"
  }
};

export default function CruiseSections({ handleClick }: CruiseSectionsProps) {
  const [activeType, setActiveType] = useState<CruiseType>('relax');
  const [cruises, setCruises] = useState<Record<CruiseType, CruiseCardData[]>>({
    relax: [],
    destination: [],
    expedition: [],
    river: []
  });
  const [loading, setLoading] = useState<Record<CruiseType, boolean>>({
    relax: false,
    destination: false,
    expedition: false,
    river: false
  });
  const [error, setError] = useState<string | null>(null);

  const fetchCruises = async (type: CruiseType) => {
    if (cruises[type].length > 0) return; // Already loaded
    
    setLoading(prev => ({ ...prev, [type]: true }));
    setError(null);
    
    try {
      const response = await CruisesApiService.getCruisesByType({
        type,
        limit: 10
      });
      
      setCruises(prev => ({
        ...prev,
        [type]: response.cruises
      }));
    } catch (err) {
      console.error(`Error fetching ${type} cruises:`, err);
      setError(`Houve um problema ao carregar seus cruzeiros. Por favor, tente novamente.`);
    } finally {
      setLoading(prev => ({ ...prev, [type]: false }));
    }
  };

  useEffect(() => {
    fetchCruises(activeType);
  }, [activeType]);

  const handleTypeChange = (type: CruiseType) => {
    setActiveType(type);
  };

  return (
    <div className="flex flex-col">
      {/* Main Section Title */}
      <div className="text-center py-8">
        <h1 className="font-baloo text-4xl md:text-5xl font-bold text-gray-800">
          O que você busca no seu próximo cruzeiro?
        </h1>
      </div>

      {/* Type Toggle Buttons */}
      <div className="flex flex-wrap justify-center gap-3 p-4">
        {Object.entries(cruiseTypeConfig).map(([type, config]) => (
          <Button
            key={type}
            onClick={() => handleTypeChange(type as CruiseType)}
            className={`px-4 py-2 rounded-full font-baloo font-semibold text-sm transition-all duration-300 ${
              activeType === type
                ? 'bg-primary-500 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {config.label}
          </Button>
        ))}
      </div>

      {/* Active Section */}
      <section className="md:p-8 p-5 flex flex-col gap-7 container mx-auto mt-6">
        
        {error && (
          <div className="text-center py-8">
            <p className="text-red-500 font-comfortaa text-lg">{error}</p>
            <button
              onClick={() => fetchCruises(activeType)}
              className="mt-4 px-6 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        )}
        
        {loading[activeType] && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            <p className="mt-2 text-gray-600 font-comfortaa">Carregando cruzeiros...</p>
          </div>
        )}
        
        {!loading[activeType] && !error && (
          <CruiseCarousel 
            handleClick={handleClick} 
            cruises={cruises[activeType]}
          />
        )}
      </section>
    </div>
  );
}

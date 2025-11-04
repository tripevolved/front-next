"use client";

import React from "react";

interface CruiseConsultancyProcessProps {}

const processSteps = [
  {
    step: "1",
    title: "Reunião de 45 minutos",
    description: "Conversamos sobre seus sonhos de viagem, preferências e expectativas para entender exatamente o que você busca."
  },
  {
    step: "2", 
    title: "Contratação da Voyage Evolved",
    description: "Após a reunião, você contrata a consultoria especializada da Trip Evolved, e nós cuidamos de todos os detalhes para você."
  },
  {
    step: "3",
    title: "Sua viagem cuidada em todos os detalhes",
    description: "Muito além do cruzeiro: voos, hotéis, transfers, experiências únicas e muito mais."
  }
];

export default function CruiseConsultancyProcess({}: CruiseConsultancyProcessProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {processSteps.map((step, index) => (
        <div key={index} className="text-center">
          {/* Step Number */}
          <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="font-baloo text-2xl font-bold text-white">
              {step.step}
            </span>
          </div>
          
          {/* Step Content */}
          <h3 className="font-baloo text-2xl font-bold mb-4">
            {step.title}
          </h3>
          <p className="font-comfortaa text-lg text-white/90 leading-relaxed">
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );
}

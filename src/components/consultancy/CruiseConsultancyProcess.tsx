"use client";

import React from "react";

interface CruiseConsultancyProcessProps {}

const processSteps = [
  {
    step: "1",
    title: "Conversa inicial",
    description: "Via telefone, reunião ou whatsapp, falamos sobre seus sonhos de viagem, preferências e expectativas para entender o que você busca."
  },
  {
    step: "2", 
    title: "Escolha do seu cruzeiro ideal",
    description: "Em até 24h, você recebe 3 opções de cruzeiros, com todas as informações, fotos, vídeos e porque entendemos que é a melhor escolha para você."
  },
  {
    step: "3",
    title: "Sua viagem cuidada em todos os detalhes",
    description: "Muito além do cruzeiro: voos, pré e pós-cruzeiro, transfers, concierge para excursões em terra, experiências únicas e muito mais."
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

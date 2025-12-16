"use client";

import React from "react";
import { useState, useEffect } from "react";
import LeadForm from "@/components/LeadForm";
import { TripsApiService } from "@/clients/trips";
import { PaymentsApiService } from "@/clients/payments";
import { LocalStorageService } from "@/clients/local";

import type { CreatePaymentRequest } from "@/clients/payments/payments";

interface CheckoutPageProps {
  params: Promise<{
    service: string;
  }>;
}

interface ServiceConfig {
  title: string;
  description: string;
  price: string;
  originalPrice: string | null;
  isAdvance?: boolean;
  features: string[];
  steps: string[];
}

const serviceConfig: Record<string, ServiceConfig> = {
  "jornada-evolved": {
    title: "Jornada Evolved",
    description: "Para quem quer tudo resolvido nos mínimos detalhes",
    price: "R$ 1.200,00",
    originalPrice: null,
    features: [
      "Planejamento completo personalizado",
      "Hotéis, voos e transfers reservados",
      "Reservas de restaurantes e atividades",
      "Experiências exclusivas incluídas",
      "Concierge durante toda a viagem",
      "Benefícios exclusivos",
      "Suporte 24/7 durante a viagem"
    ],
    steps: [
      "Preencha seus dados no formulário abaixo",
      "Crie uma senha para sua conta",
      "Será redirecionado para a página de pagamento",
      "Após o pagamento, começaremos a planejar sua viagem"
    ]
  },
  "plano-evolved": {
    title: "Plano Evolved",
    description: "Para quem prefere liberdade, mas quer contar com a ajuda de especialistas",
    price: "R$ 500,00",
    originalPrice: null,
    isAdvance: true,
    features: [
      "Voos e hotéis reservados",
      "Transfers aeroporto/hotel/aeroporto",
      "Consultoria especializada",
      "Dicas de destinos e roteiros",
      "Liberdade para explorar no seu ritmo",
      "Suporte 24/7 para itens reservados conosco"
    ],
    steps: [
      "Preencha seus dados no formulário abaixo",
      "Crie uma senha para sua conta",
      "Será redirecionado para a página de pagamento",
      "Após o pagamento, receberá seu plano personalizado"
    ]
  }
};

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const resolvedParams = React.use(params);
  const service = serviceConfig[resolvedParams.service as keyof typeof serviceConfig];
  const [isCreatingTrip, setIsCreatingTrip] = useState(false);
  const [redirectAfterSignUp, setRedirectAfterSignUp] = useState<string | undefined>();
  const [travelerState, setTravelerState] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  
  // Get traveler state from localStorage only on client side
  useEffect(() => {
    setIsClient(true);
    const state = LocalStorageService.getTravelerState();
    setTravelerState(state);
  }, []);
  
  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Serviço não encontrado</h1>
          <p className="text-gray-600">O serviço solicitado não está disponível.</p>
        </div>
      </div>
    );
  }

  const handleFormSubmit = async (formData: { name: string; email: string; phone: string }) => {
    setIsCreatingTrip(true);
    
    try {
      // Use travelerId from travelerState if available, otherwise from traveler
      const travelerId = travelerState?.id || LocalStorageService.getTraveler()?.id;
      if (!travelerId) {
        throw new Error("Traveler not found in local storage");
      }

      // Create empty trip with CONSULTANCY mode
      const tripResponse = await TripsApiService.createEmptyTrip(travelerId);

      // Create payment
      const paymentRequest: CreatePaymentRequest = {
        travelerId: travelerId,
        tripId: tripResponse.id,
        items: [
          {
            amount: resolvedParams.service === "jornada-evolved" ? 1200 : 500,
            type: resolvedParams.service === "jornada-evolved" ? "CONSULTANCY" : "PLANNING"
          }
        ]
      };

      const paymentResponse = await PaymentsApiService.createPayment(paymentRequest);

      // Set redirect path
      setRedirectAfterSignUp(`/app/checkout/${paymentResponse.paymentId}`);
      
    } catch (error) {
      console.error("Error creating trip and payment:", error);
      // Continue with normal flow if creation fails
    } finally {
      setIsCreatingTrip(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  {service.description}
                </p>
                
                {/* Pricing */}
                <div className="flex items-baseline space-x-4 mb-8">
                  <span className="text-4xl font-bold text-secondary-600">{service.price}</span>
                  {service.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">{service.originalPrice}</span>
                  )}
                  {service.isAdvance && (
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                      Adiantamento
                    </span>
                  )}
                </div>
                {service.isAdvance && (
                  <p className="text-sm text-gray-600 mb-6">
                    Este valor é um adiantamento do preço total da viagem.
                  </p>
                )}
                
                <p className="text-sm text-gray-600 mb-6">
                  <strong>Importante:</strong> O valor da viagem não está incluído. O preço da viagem será discutido em uma proposta após o início do serviço.
                </p>
              </div>

              {/* Steps */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Como funciona:
                </h3>
                <div className="space-y-3">
                  {service.steps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-secondary-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <p className="text-gray-700">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  O que está incluído:
                </h3>
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Evolved Experiências Bonus for Jornada Evolved */}
              {resolvedParams.service === "jornada-evolved" && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">
                    Bônus Especial
                  </h3>
                  <h4 className="text-xl font-bold text-purple-900 mb-2">
                    Evolved Experiências
                  </h4>
                  <p className="text-purple-700 mb-3">
                    Roteiro de experiências exclusivas
                  </p>
                  <div className="flex items-baseline space-x-4">
                    <span className="text-lg text-gray-500 line-through">R$ 300,00/dia</span>
                    <span className="text-2xl font-bold text-purple-600">R$ 0,00</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Form or Welcome Message */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
              {isClient && travelerState ? (
                // Show welcome message for existing users
                <div className="text-center">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Olá, {travelerState.name}! 👋
                    </h2>
                    <p className="text-gray-600">
                      Que bom ter você de volta! Continue para o pagamento do serviço
                    </p>
                  </div>
                  
                  <button
                    onClick={() => handleFormSubmit({ name: "", email: "", phone: "" })}
                    disabled={isCreatingTrip}
                    className="w-full bg-secondary-600 text-white font-baloo py-3 px-6 rounded-full text-lg font-semibold hover:bg-secondary-700 transition-colors disabled:opacity-70"
                  >
                    {isCreatingTrip ? "Criando viagem..." : "Continuar para Pagamento"}
                  </button>
                </div>
              ) : (
                // Show LeadForm for new users
                <>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Comece sua jornada
                    </h2>
                    <p className="text-gray-600">
                      Preencha seus dados para continuar com o pagamento do serviço
                    </p>
                  </div>
                  
                  <LeadForm
                    submitButtonText={isCreatingTrip ? "Criando viagem..." : "Continuar para Pagamento"}
                    onSuccess={() => handleFormSubmit({ name: "", email: "", phone: "" })}
                    additionalMetadata={[
                      {
                        key: "service",
                        value: resolvedParams.service,
                        keyDescription: "Serviço Selecionado"
                      },
                      {
                        key: "page_type",
                        value: "checkout_landing",
                        keyDescription: "Tipo de Página"
                      }
                    ]}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Por que escolher nossos serviços?
            </h2>
            <p className="text-xl text-gray-600">
              Oferecemos planejamento de viagens personalizado e profissional
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Personalizado</h3>
              <p className="text-gray-600">Cada viagem é planejada de acordo com suas preferências e necessidades</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Apoio de especialistas</h3>
              <p className="text-gray-600">Conte com nossa equipe de especialistas em viagens para orientação completa</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Suporte</h3>
              <p className="text-gray-600">Acompanhamento durante toda a viagem e suporte quando precisar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
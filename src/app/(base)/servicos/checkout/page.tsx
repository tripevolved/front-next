"use client";

import Link from "next/link";

interface ServiceOption {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice: string | null;
  isAdvance?: boolean;
  features: string[];
  popular?: boolean;
}

const serviceOptions: ServiceOption[] = [
  {
    id: "jornada-evolved",
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
    ]
  },
  {
    id: "plano-evolved",
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
    ]
  }
];

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Escolha seu serviço
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Selecione o serviço que melhor atende às suas necessidades de planejamento de viagem
            </p>
          </div>

          {/* Service Options */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {serviceOptions.map((service) => (
              <div
                key={service.id}
                className="relative bg-white rounded-lg shadow-lg border-2 border-gray-200 hover:border-secondary-300 transition-all duration-300 hover:shadow-xl"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                    service.id === "jornada-evolved" 
                      ? "bg-secondary-600 text-white" 
                      : "bg-green-600 text-white"
                  }`}>
                    {service.id === "jornada-evolved" ? "Serviço Completo" : "Liberdade Guiada"}
                  </span>
                </div>

                                  <div className="p-8">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {service.title}
                      </h2>
                      <p className="text-gray-600 mb-4">
                        {service.description}
                      </p>
                      
                      {/* Pricing */}
                      <div className="flex items-baseline justify-center space-x-4 mb-4">
                        <span className="text-3xl font-bold text-secondary-600">{service.price}</span>
                        {service.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">{service.originalPrice}</span>
                        )}
                      </div>
                      
                      {service.isAdvance && (
                        <div className="mb-4">
                          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                            Adiantamento
                          </span>
                          <p className="text-xs text-gray-600 mt-2">
                            Este valor é um adiantamento do preço total da viagem
                          </p>
                        </div>
                      )}
                      
                      <p className="text-xs text-gray-600 mb-4">
                        <strong>Importante:</strong> O valor da viagem não está incluído. O preço da viagem será discutido em uma proposta após o início do serviço.
                      </p>
                    </div>

                  {/* Features */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      O que está incluído:
                    </h3>
                    <ul className="space-y-3">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Evolved Experiências Bonus for Jornada Evolved */}
                  {service.id === "jornada-evolved" && (
                    <div className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
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

                  {/* CTA Button */}
                  <Link
                    href={`/servicos/checkout/${service.id}`}
                    className={`w-full block text-center py-3 px-6 rounded-full font-semibold transition-colors ${
                      service.id === "jornada-evolved"
                        ? "bg-secondary-600 text-white hover:bg-secondary-700"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    Escolher {service.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Information */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Como funciona o processo?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-secondary-600 font-bold text-lg">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Escolha o serviço</h3>
                <p className="text-sm text-gray-600">Selecione entre Jornada ou Plano Evolved</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-secondary-600 font-bold text-lg">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Preencha seus dados</h3>
                <p className="text-sm text-gray-600">Informe nome, email e telefone</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-secondary-600 font-bold text-lg">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Crie sua conta</h3>
                <p className="text-sm text-gray-600">Defina uma senha para sua conta</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-secondary-600 font-bold text-lg">4</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Faça o pagamento</h3>
                <p className="text-sm text-gray-600">Pague pelo serviço escolhido</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Perguntas Frequentes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                O que é o Jornada Evolved?
              </h3>
              <p className="text-gray-600">
                É a jornada dos seus sonhos, assinada por nossos especialistas, pensada e entregue para você. Tudo: hotéis, voos, atividades, reservas de restaurantes, experiências, spa, tudo reservado para você de forma 100% personalizada. Ideal para quem quer ter todos os detalhes cuidados de forma personalizada.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                O que é o Plano Evolved?
              </h3>
              <p className="text-gray-600">
                Cuidamos dos elementos principais da sua viagem: voo, hotéis e transfers aeroporto/hotel/aeroporto (ou outra forma de transporte) e deixamos o restante livre para você explorar no seu ritmo.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                O que está incluído no Jornada Evolved?
              </h3>
              <p className="text-gray-600">
                Além de todo o planejamento, você recebe como bônus o acesso ao &ldquo;Evolved Experiências&rdquo; e terá um Trip Concierge disponível durante toda a viagem para qualquer necessidade.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                O pagamento é seguro?
              </h3>
              <p className="text-gray-600">
                Sim, utilizamos as mais modernas tecnologias de segurança para proteger seus dados e informações de pagamento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
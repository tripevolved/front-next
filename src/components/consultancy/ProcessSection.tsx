'use client'

import Button from '@/components/common/Button'

interface ProcessSectionProps {
  title?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  eventSource?: string;
  id?: string;
}

export default function ProcessSection({ 
  title = "A Jornada Evolved tem um processo pensado para minimizar o seu esforço",
  ctaText = "Começar minha jornada",
  onCtaClick,
  eventSource = "Process Section",
  id
}: ProcessSectionProps) {
  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    }
  };

  return (
    <section id={id} className="py-24 bg-secondary-100">
      <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
        <div className="text-center mb-16">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6 text-secondary-900">
            {title.includes('Jornada Evolved') ? (
              <>
                A <span className="text-accent-500">Jornada Evolved</span> tem um processo pensado para minimizar o seu esforço
              </>
            ) : (
              title
            )}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="text-center">
            <div className="bg-accent-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              1
            </div>
            <h3 className="font-baloo text-xl font-bold mb-4 text-secondary-900">
              Primeiro Contato
            </h3>
            <p className="text-secondary-600 mb-4">
              Você clica em &quot;Começar minha jornada&quot;, preenche um formulário rápido e vamos te chamar no WhatsApp para marcar uma conversa
            </p>
            <div className="bg-accent-50 p-4 rounded-lg">
              <p className="text-sm text-accent-700 font-semibold">
                Menos de 5 minutos para preencher
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="bg-accent-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              2
            </div>
            <h3 className="font-baloo text-xl font-bold mb-4 text-secondary-900">
              Conversa de 45 minutos com um especialista
            </h3>
            <p className="text-secondary-600 mb-4">
              Em uma conversa online, entendemos você e sua viagem: objetivos, viagens passadas, preferências, orçamento...
            </p>
            <div className="bg-accent-50 p-4 rounded-lg">
              <p className="text-sm text-accent-700 font-semibold">
                Em horário conveniente para você
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="bg-accent-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              3
            </div>
            <h3 className="font-baloo text-xl font-bold mb-4 text-secondary-900">
              Pagamento da taxa de consultoria de viagem
            </h3>
            <p className="text-secondary-600 mb-4">
              Com um pagamento de R$1200,00, você garante o nosso cuidado e atenção para criar a melhor viagem da sua vida.
            </p>
            <div className="bg-accent-50 p-4 rounded-lg">
              <p className="text-sm text-accent-700 font-semibold">
                A partir daqui, começamos o planejamento
              </p>
            </div>
          </div>

          {/* Step 4 - Plan Sprint */}
          <div className="text-center">
            <div className="bg-accent-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              4
            </div>
            <h3 className="font-baloo text-xl font-bold mb-4 text-secondary-900">
              Semana de planejamento
            </h3>
            <p className="text-secondary-600 mb-4">
              Criamos o itinerário personalizado, com a curadoria de voos, hotéis e experiências. Tudo pensado para você viver.
            </p>
            <div className="bg-accent-50 p-4 rounded-lg">
              <p className="text-sm text-accent-700 font-semibold">
                Você recebe a primeira proposta em até 48 horas
              </p>
            </div>
          </div>

          {/* Step 5 - Decision + Payment */}
          <div className="text-center">
            <div className="bg-accent-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              5
            </div>
            <h3 className="font-baloo text-xl font-bold mb-4 text-secondary-900">
              Reunião de apresentação e decisão
            </h3>
            <p className="text-secondary-600 mb-4">
              Apresentamos o itinerário, explicamos o porquê das escolhas. Confirmamos se está alinhado com suas expectativas.
            </p>
            <div className="bg-accent-50 p-4 rounded-lg">
              <p className="text-sm text-accent-700 font-semibold">
                Se não estivermos alinhados após duas revisões, devolvemos a taxa de consultoria de viagem.
              </p>
            </div>
          </div>

          {/* Step 6 - Reservations */}
          <div className="text-center">
            <div className="bg-accent-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              6
            </div>
            <h3 className="font-baloo text-xl font-bold mb-4 text-secondary-900">
              Reservas e Pagamentos
            </h3>
            <p className="text-secondary-600 mb-4">
              Gerenciamos todas as reservas e pagamentos da viagem, incluindo voos, hospedagens, experiências e mais.
            </p>
            <div className="bg-accent-50 p-4 rounded-lg">
              <p className="text-sm text-accent-700 font-semibold">
                Pagamento único ou parcelado no cartão de crédito
              </p>
            </div>
          </div>

          {/* Step 7 - Concierge Onboarding */}
          <div className="text-center">
            <div className="bg-accent-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              7
            </div>
            <h3 className="font-baloo text-xl font-bold mb-4 text-secondary-900">
              Criamos momentos únicos
            </h3>
            <p className="text-secondary-600 mb-4">
              Construção do seu roteiro de viagem detalhado, checklist de documentos, consultoria de &quot;o que levar&quot;, reservas de restaurantes e passeios.
            </p>
            <div className="bg-accent-50 p-4 rounded-lg">
              <p className="text-sm text-accent-700 font-semibold">
                Roteiro no seu ritmo e com plano B, para mudança de planos ou chuvas
              </p>
            </div>
          </div>

          {/* Step 8 - Travel Execution */}
          <div className="text-center">
            <div className="bg-accent-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              8
            </div>
            <h3 className="font-baloo text-xl font-bold mb-4 text-secondary-900">
              Execução da Viagem
            </h3>
            <p className="text-secondary-600 mb-4">
              Check-ins proativos (partida, chegada, meio da viagem) e suporte rápido se houver problemas.
            </p>
            <div className="bg-accent-50 p-4 rounded-lg">
              <p className="text-sm text-accent-700 font-semibold">
                E você recebe tudo organizado em um kit viagem antes do seu embarque
              </p>
            </div>
          </div>

          {/* Step 9 - Post-trip Debrief */}
          <div className="text-center">
            <div className="bg-accent-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              9
            </div>
            <h3 className="font-baloo text-xl font-bold mb-4 text-secondary-900">
              Pós-Viagem
            </h3>
            <p className="text-secondary-600 mb-4">
              Chamada de 15 minutos para prepararmos o seu livro de memórias e começarmos o itinerário da próxima viagem.
            </p>
            <div className="bg-accent-50 p-4 rounded-lg">
              <p className="text-sm text-accent-700 font-semibold">
                O nosso bônus para você é o itinerário da sua próxima viagem
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button 
            onClick={handleCtaClick}
            event="pre_agendar"
            eventOptions={{
              source: eventSource
            }}
            className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  )
}

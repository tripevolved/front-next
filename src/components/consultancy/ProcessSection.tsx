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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="text-center">
            <div className="bg-accent-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              1
            </div>
            <h3 className="font-baloo text-xl font-bold mb-4 text-secondary-900">
              Primeiro Contato
            </h3>
            <p className="text-secondary-600 mb-4">
              Você clica em &quot;Começar minha jornada&quot; e preenche um formulário rápido com suas preferências de viagem
            </p>
            <div className="bg-accent-50 p-4 rounded-lg">
              <p className="text-sm text-accent-700 font-semibold">
                ⏱️ Menos de 5 minutos para preencher
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="bg-accent-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              2
            </div>
            <h3 className="font-baloo text-xl font-bold mb-4 text-secondary-900">
              Dossiê da Viagem
            </h3>
            <p className="text-secondary-600 mb-4">
              Nossos especialistas preparam um dossiê personalizado com a primeira proposta da sua viagem dos sonhos
            </p>
            <div className="bg-accent-50 p-4 rounded-lg">
              <p className="text-sm text-accent-700 font-semibold">
                📋 Em até 48 horas
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="bg-accent-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              3
            </div>
            <h3 className="font-baloo text-xl font-bold mb-4 text-secondary-900">
              Contratação
            </h3>
            <p className="text-secondary-600 mb-4">
              Você contrata a Jornada Evolved pagando a taxa de consultoria de R$ 1.200,00 e começamos a criar sua viagem
            </p>
            <div className="bg-accent-50 p-4 rounded-lg">
              <p className="text-sm text-accent-700 font-semibold">
                💳 Pagamento único e sem surpresas
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

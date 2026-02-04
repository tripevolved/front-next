import { DetailsCard } from '@/components/cruises/DetailsCard'

export default function JornadaGuidingCards() {
  return (
    <>
      <div className="flex md:grid md:grid-cols-3 flex-col items-center gap-10 md:max-w-5xl mx-auto">
        <DetailsCard
          message={
            <>
              Economia de <span className="font-bold text-accent-500">tempo</span>: você recebe 3 opções de cruzeiros em 24 horas
            </>
          }
          icon={
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <DetailsCard
          message={
            <>
              <span className="font-bold text-accent-500">Transparência</span> total: não trabalhamos com comissões, colocando milhares de reais de volta no seu bolso
            </>
          }
          icon={
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          }
        />
        <DetailsCard
          message={
            <>
              Ajuda de <span className="font-bold text-accent-500">especialistas</span>: planejamento com confiança e sem erros
            </>
          }
          icon={
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          }
        />
      </div>
      <div className="w-full flex flex-col items-center gap-6 mt-8">
        <h2 className="font-baloo text-2xl md:text-3xl font-bold text-inherit">
          E você também recebe:
        </h2>
        <div className="flex md:grid md:grid-cols-2 flex-col items-center gap-10 md:max-w-4xl mx-auto">
          <DetailsCard
            message={
              <>
                Design completo da viagem: <span className="font-bold text-accent-500">pré e pós-cruzeiro</span>, voos e todos os detalhes incluídos
              </>
            }
            icon={
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            }
          />
          <DetailsCard
            message={
              <>
                Concierge para excursões em terra: <span className="font-bold text-accent-500">guia de portos exclusivo</span>, feito especialmente para você
              </>
            }
            icon={
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
          />
        </div>
      </div>
    </>
  )
}

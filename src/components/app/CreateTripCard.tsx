'use client'

export function CreateTripCard() {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-white rounded-lg shadow-md p-6 border border-gray-100 opacity-90 aspect-square">
      <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <svg
          className="w-7 h-7 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      </div>
      <div className="flex items-center justify-center gap-2 flex-wrap mb-1">
        <h3 className="text-lg font-semibold text-gray-900">
          Coleções de jornada
        </h3>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
          em breve
        </span>
      </div>
      <p className="text-sm text-gray-600">
        Ideias e roteiros selecionados para inspirar suas próximas viagens — sem substituir o cuidado do seu
        travel designer.
      </p>
    </div>
  )
}

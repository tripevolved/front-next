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
            d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-3 1.5V22l4-1 4 1v-1.5L13 19v-5.5l8 2.5z"
          />
        </svg>
      </div>
      <div className="flex items-center justify-center gap-2 flex-wrap mb-1">
        <h3 className="text-lg font-semibold text-gray-900">
          Criar minha viagem
        </h3>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
          em breve
        </span>
      </div>
      <p className="text-sm text-gray-600">
        Em breve você poderá criar e planejar sua viagem por aqui.
      </p>
    </div>
  )
}

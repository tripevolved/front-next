"use client";

type Props = {
  onOpen?: () => void;
};

export function DestinationsExploreCard({ onOpen }: Props) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex flex-col items-center justify-center text-center bg-white rounded-lg shadow-md p-6 border border-gray-100 aspect-square w-full cursor-pointer transition hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-60 disabled:cursor-not-allowed"
      disabled={!onOpen}
    >
      <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <svg
          className="w-7 h-7 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Explorar destinos</h3>
      <p className="text-sm text-gray-600">
        Descubra lugares e comece a construir sua próxima jornada.
      </p>
    </button>
  );
}

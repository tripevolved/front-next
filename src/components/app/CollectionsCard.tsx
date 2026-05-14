"use client";

type Props = {
  onOpen?: () => void;
};

export function CollectionsCard({ onOpen }: Props) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex flex-col items-center justify-center text-center bg-white rounded-lg shadow-md p-6 aspect-square w-full cursor-pointer transition hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-60 disabled:cursor-not-allowed"
      disabled={!onOpen}
    >
      <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <svg className="w-7 h-7 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      </div>
      <div className="flex items-center justify-center gap-2 flex-wrap mb-1">
        <h3 className="text-lg font-semibold text-gray-900">Coleções</h3>
      </div>
      <p className="text-sm text-gray-600">
        Coleções de hospedagens selecionadas pela nossa curadoria para suas próximas viagens.
      </p>
    </button>
  );
}

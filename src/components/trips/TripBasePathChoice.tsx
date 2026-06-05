"use client";

import Image from "next/image";

type Props = {
  onSelectCollections: () => void;
  onSelectDestination: () => void;
};

export function TripBasePathChoice({ onSelectCollections, onSelectDestination }: Props) {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="font-baloo text-2xl font-bold text-secondary-900">O que vai guiar sua viagem?</h2>
        <p className="font-comfortaa text-secondary-600">
          Escolha uma coleção para se inspirar ou um destino que você já tem em mente. Depois você define a
          hospedagem.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={onSelectCollections}
          className="group flex flex-col overflow-hidden rounded-2xl border-2 border-secondary-200 bg-white text-left transition-all hover:border-accent-500 hover:shadow-md"
        >
          <div className="relative h-36 bg-secondary-100">
            <Image
              src="/assets/experiences/california/lake-tahoe-2.png"
              alt=""
              fill
              className="object-cover opacity-90 group-hover:scale-[1.02] transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/60 to-transparent" />
          </div>
          <div className="p-5 space-y-2">
            <span className="inline-block font-baloo text-xs font-semibold uppercase tracking-wide text-accent-600">
              Coleções
            </span>
            <h3 className="font-baloo text-lg font-bold text-secondary-900">Quero inspiração em coleções</h3>
            <p className="font-comfortaa text-sm text-secondary-600">
              Explore curadorias e use uma coleção como ponto de partida da sua viagem.
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={onSelectDestination}
          className="group flex flex-col overflow-hidden rounded-2xl border-2 border-secondary-200 bg-white text-left transition-all hover:border-accent-500 hover:shadow-md"
        >
          <div className="relative h-36 bg-secondary-100">
            <Image
              src="/assets/consultoria/viagens-cenicas/casal-sicilia.jpg"
              alt=""
              fill
              className="object-cover opacity-80 group-hover:scale-[1.02] transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/60 to-transparent" />
          </div>
          <div className="p-5 space-y-2">
            <span className="inline-block font-baloo text-xs font-semibold uppercase tracking-wide text-accent-600">
              Destino
            </span>
            <h3 className="font-baloo text-lg font-bold text-secondary-900">Já tenho um destino</h3>
            <p className="font-comfortaa text-sm text-secondary-600">
              Selecione o destino da viagem e siga para escolher a hospedagem.
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}

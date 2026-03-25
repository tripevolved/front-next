"use client";

import Link from "next/link";

/** Shown after successful Círculo Evolved checkout; urges registering subscription travelers. */
export function CirculoEvolvedPaymentTravelersPrompt() {
  return (
    <div className="p-5 rounded-xl border border-accent-200 bg-accent-50/80 ring-1 ring-accent-100 text-left space-y-2">
      <p className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold font-comfortaa bg-accent-500/20 text-accent-900 border border-accent-300/50">
        Próximo passo importante
      </p>
      <h3 className="font-baloo text-lg font-bold text-secondary-900">
        Cadastre quem viaja com você
      </h3>
      <p className="font-comfortaa text-sm text-secondary-700 leading-relaxed">
        Apenas pessoas cadastradas como viajantes da sua assinatura têm direito aos benefícios do Círculo Evolved
        nas viagens. Reserve um minuto para registrar sua família direta.
      </p>
      <Link
        href="/app/admin/circulo-evolved"
        className="inline-block mt-2 font-baloo bg-accent-500 text-secondary-900 px-6 py-2.5 rounded-full font-semibold hover:bg-accent-600 transition-colors text-center text-sm"
      >
        Cadastrar viajantes agora
      </Link>
    </div>
  );
}

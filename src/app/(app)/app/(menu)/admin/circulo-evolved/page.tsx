"use client";

import Link from "next/link";
import { useAppStore } from "@/core/store";

function formatDate(value: Date | string): string {
  const d = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function CirculoEvolvedAdminPage() {
  const travelerState = useAppStore((state) => state.travelerState);
  const subscription = travelerState?.subscription;

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <header className="mb-8">
          <h1 className="font-baloo text-2xl md:text-3xl font-bold text-secondary-900">
            Círculo Evolved
          </h1>
          <p className="font-comfortaa text-secondary-600 mt-1">
            Informações da sua assinatura
          </p>
        </header>

        <section className="bg-white rounded-2xl border border-secondary-200 p-6 md:p-8 shadow-sm space-y-6">
          {subscription ? (
            <div>
              <h2 className="font-baloo text-lg font-bold text-secondary-900 mb-4">
                {subscription.status === "Active" ? "Assinatura ativa" : "Assinatura Inativa"}
              </h2>
              <p className="font-comfortaa text-secondary-700">
                De {formatDate(subscription.dateFrom)} até {formatDate(subscription.dateTo)}
              </p>
            </div>
          ) : (
            <p className="font-comfortaa text-secondary-600">
              Nenhuma assinatura encontrada.
            </p>
          )}

          <div className="pt-4">
            <Link
              href="/app"
              className="inline-block font-comfortaa px-4 py-2 text-secondary-700 hover:bg-secondary-100 rounded-lg transition-colors border border-secondary-200"
            >
              Voltar
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { TripPendenciasDrawer } from "@/components/trips/TripPendenciasDrawer";

const CARD_SHELL =
  "flex flex-col items-start text-left w-full min-h-[7.5rem] p-4 rounded-lg bg-white shadow-md border border-gray-100 transition";

type NavCardProps = {
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  external?: boolean;
  disabled?: boolean;
  stat?: string | number;
  badge?: string;
};

function NavCard({
  title,
  icon,
  href,
  onClick,
  external = false,
  disabled = false,
  stat,
  badge,
}: NavCardProps) {
  const content = (
    <>
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-3 text-gray-500">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-gray-900 mb-1">{title}</h3>
      {stat !== undefined ? (
        <p className="text-2xl font-bold text-gray-900 leading-none">{stat}</p>
      ) : null}
      {badge ? (
        <span className="mt-1 inline-block text-xs font-medium text-gray-500 uppercase tracking-wide">
          {badge}
        </span>
      ) : null}
    </>
  );

  if (disabled) {
    return (
      <div className={`${CARD_SHELL} opacity-70 cursor-default`} aria-disabled>
        {content}
      </div>
    );
  }

  const className = `${CARD_SHELL} hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600`;

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {content}
      </button>
    );
  }

  if (!href) {
    return (
      <div className={`${CARD_SHELL} opacity-70 cursor-default`} aria-disabled>
        {content}
      </div>
    );
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

type Props = {
  tripId: string;
  destination?: string;
};

export function TripNavigationCards({ tripId, destination }: Props) {
  const [pendenciasOpen, setPendenciasOpen] = useState(false);
  const base = `/app/viagens/${encodeURIComponent(tripId)}`;
  const whatsappMessage = `Olá! Gostaria de falar com um especialista sobre minha viagem${destination ? ` para ${destination}` : ""}.`;
  const whatsappUrl = `https://wa.me/5551993582462?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 w-full">
        <NavCard
          title="Pendências"
          onClick={() => setPendenciasOpen(true)}
          stat={0}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          }
        />
        <NavCard
          title="Detalhes"
          href="#details"
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
              />
            </svg>
          }
        />
        <NavCard
          title="Documentos"
          disabled
          badge="Em breve"
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          }
        />
        <NavCard
          title="Itinerário"
          href={`${base}/itinerario`}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"
              />
            </svg>
          }
        />
        <NavCard
          title="Falar com especialista"
          href={whatsappUrl}
          external
          icon={
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
            </svg>
          }
        />
      </div>

      <TripPendenciasDrawer isOpen={pendenciasOpen} onClose={() => setPendenciasOpen(false)} />
    </>
  );
}

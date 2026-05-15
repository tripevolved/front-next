"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function TripPendenciasDrawer({ isOpen, onClose }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[70]">
      <button
        type="button"
        aria-label="Fechar"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <aside className="fixed right-0 inset-y-0 z-10 flex h-full w-full flex-col bg-white shadow-2xl md:w-2/3">
        <header className="shrink-0 border-b border-secondary-200 p-5">
          <div className="grid grid-cols-[1fr,auto] items-center gap-4">
            <div className="min-w-0">
              <p className="font-comfortaa text-xs text-secondary-500">Sua viagem</p>
              <h2 className="font-baloo text-xl font-bold text-secondary-900 leading-tight">Pendências</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 rounded-full border border-secondary-200 text-secondary-700 hover:bg-secondary-50 transition-colors inline-flex items-center justify-center shrink-0"
              aria-label="Fechar"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </header>

        <div className="flex-1 min-h-0 overflow-y-auto flex flex-col items-center justify-center px-6 py-12 text-center">
          <Image
            src="/assets/states/success-state.svg"
            alt=""
            width={200}
            height={200}
            className="object-contain mb-6"
          />
          <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-2">Tudo certo!</h3>
          <p className="font-comfortaa text-sm text-secondary-600 max-w-sm">
            Sua viagem não possui qualquer pendência
          </p>
        </div>
      </aside>
    </div>,
    document.body
  );
}

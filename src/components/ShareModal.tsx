"use client";

import { useState } from "react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  link: string;
  message: string;
}

export function ShareModal({ isOpen, onClose, link, message }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [customMessage, setCustomMessage] = useState(message);

  const handleShareWhatsApp = () => {
    const shareMessage = `${customMessage} ${link}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage)}`, "_blank");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <h2 className="text-xl font-baloo font-bold text-secondary-900 mb-4">Compartilhar</h2>

        <div className="space-y-5">
          <div className="flex items-center gap-3 p-3 bg-secondary-50 rounded-xl">
            <input
              type="text"
              value={link}
              readOnly
              className="flex-1 bg-transparent border-none focus:ring-0 text-secondary-700"
            />
            <button
              onClick={handleCopyLink}
              className="text-primary-600 font-baloo font-semibold text-sm"
            >
              {copied ? "Copiado!" : "Copiar"}
            </button>
          </div>

          <div>
            <textarea
              className="w-full h-24 p-3 bg-secondary-50 rounded-xl border-none focus:ring-0 text-secondary-700 resize-none"
              placeholder="Customize sua mensagem para compartilhar"
              defaultValue={message}
              onChange={(e) => setCustomMessage(e.target.value)}
            />
          </div>

          <div className="flex justify-center gap-4">
            <button onClick={handleShareWhatsApp} className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <span className="text-xs font-comfortaa text-secondary-700">WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

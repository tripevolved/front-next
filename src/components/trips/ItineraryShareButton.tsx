"use client";

import { useCallback, useState } from "react";
import { TripsApiService } from "@/clients/trips";
import { ShareModal } from "@/components/ShareModal";
import { getPublicItineraryShareUrl } from "@/utils/itinerary-share-url";

type Props = {
  tripId: string;
  tripTitle?: string;
  className?: string;
  /**
   * `ctaSecondary` — outline pill next to primary “Ver itinerário” on the hero.
   * `compact` — smaller control (e.g. top bar).
   */
  variant?: "ctaSecondary" | "compact";
};

const variantClasses: Record<NonNullable<Props["variant"]>, string> = {
  ctaSecondary:
    "inline-flex items-center justify-center gap-2 shrink-0 border-2 border-white text-white bg-transparent px-6 py-3 rounded-full font-baloo font-semibold hover:bg-white/15 transition-colors disabled:opacity-60",
  compact:
    "inline-flex items-center gap-1.5 bg-white/10 border border-white text-white hover:bg-white/20 disabled:opacity-60 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
};

export function ItineraryShareButton({
  tripId,
  tripTitle,
  className,
  variant = "ctaSecondary",
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const defaultMessage = tripTitle
    ? `Confira o itinerário da viagem "${tripTitle}" na Trip Evolved:`
    : "Confira o itinerário da nossa viagem na Trip Evolved:";

  const handleShare = useCallback(async () => {
    if (!tripId || loading) return;
    setLoading(true);
    setError(null);
    try {
      const { shareToken } = await TripsApiService.postItineraryShare(tripId);
      setShareLink(getPublicItineraryShareUrl(shareToken));
      setIsOpen(true);
    } catch {
      setError("Não foi possível gerar o link. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [tripId, loading]);

  return (
    <div className="inline-flex flex-col items-center gap-1">
      <button
        type="button"
        onClick={handleShare}
        disabled={loading}
        className={className ?? variantClasses[variant]}
      >
        {loading ? "Gerando link..." : "Compartilhar itinerário"}
      </button>
      {error ? (
        <p className="text-xs text-red-200 font-comfortaa text-center max-w-xs">{error}</p>
      ) : null}

      {shareLink ? (
        <ShareModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          link={shareLink}
          message={defaultMessage}
        />
      ) : null}
    </div>
  );
}

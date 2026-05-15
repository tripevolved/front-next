"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { PublicTripAccommodation, PublicTripAccommodationRoom } from "@/core/types/public-itinerary";
import { ImageGrid } from "@/components/common/ImageGrid";
import { VideoSlider } from "@/components/VideoSlider";
import {
  accommodationPaymentPillClass,
  accommodationReservationPillClass,
  parsePaymentStatus,
  parseReservationStatus,
  translateAccommodationPaymentStatus,
  translateAccommodationReservationStatus,
} from "@/utils/helpers/accommodation-status.helpers";

const PLACEHOLDER_IMAGE = "/assets/blank-image.png";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  accommodation: PublicTripAccommodation;
};

function imageUrl(img?: { url?: string | null } | null): string {
  const u = img?.url?.trim();
  return u || PLACEHOLDER_IMAGE;
}

function buildGalleryImages(accommodation: PublicTripAccommodation) {
  const fromList = (accommodation.images ?? []).filter((img) => img.url?.trim());
  if (fromList.length > 0) {
    return fromList.map((img) => ({
      url: img.url,
      shortDescription: img.shortDescription,
    }));
  }
  if (accommodation.coverImage?.url?.trim()) {
    return [
      {
        url: accommodation.coverImage.url,
        shortDescription: accommodation.coverImage.shortDescription,
      },
    ];
  }
  return [];
}

function roomBoardLabel(room: PublicTripAccommodationRoom): string | null {
  if (room.boardDescription?.trim()) return room.boardDescription.trim();
  const parts: string[] = [];
  if (room.isAllInclusive) parts.push("All inclusive");
  else {
    if (room.hasFullBoard) parts.push("Pensão completa");
    if (room.hasHalfBoard) parts.push("Meia pensão");
    if (room.hasBreakfast) parts.push("Café da manhã");
  }
  return parts.length > 0 ? parts.join(" · ") : null;
}

export function PublicAccommodationDetailsModal({ isOpen, onClose, accommodation }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const galleryImages = buildGalleryImages(accommodation);
  const videoUrls = (accommodation.videos ?? []).map((v) => v.url).filter(Boolean);
  const rooms = accommodation.rooms ?? [];

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="public-accommodation-modal-title"
    >
      <div
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Fechar"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="overflow-y-auto flex-1 min-h-0">
          {galleryImages.length > 0 ? (
            <ImageGrid
              images={galleryImages}
              title={accommodation.name}
              edgeToEdge
              lightboxZIndex={80}
            />
          ) : null}

          <div className="p-6 md:p-8 space-y-8">
            <h2
              id="public-accommodation-modal-title"
              className="font-baloo text-2xl md:text-3xl font-bold text-secondary-900 leading-tight"
            >
              {accommodation.name}
            </h2>

            {accommodation.description ? (
              <div
                className="prose prose-sm max-w-none text-secondary-700 [&_*]:text-secondary-700"
                dangerouslySetInnerHTML={{ __html: accommodation.description }}
              />
            ) : null}

            {(accommodation.tags?.length || accommodation.recommendedFor?.length) ? (
              <div className="flex flex-wrap gap-2">
                {(accommodation.tags ?? []).filter(Boolean).map((tag) => (
                  <span
                    key={`tag:${tag}`}
                    className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {tag}
                  </span>
                ))}
                {(accommodation.recommendedFor ?? []).filter(Boolean).map((rec) => (
                  <span
                    key={`rec:${rec}`}
                    className="bg-accent-100 text-accent-700 px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {rec}
                  </span>
                ))}
              </div>
            ) : null}

            {videoUrls.length > 0 ? (
              <section className="space-y-3">
                <h3 className="font-baloo text-xl font-bold text-secondary-900">Vídeos</h3>
                <VideoSlider videos={videoUrls} />
              </section>
            ) : null}

            {rooms.length > 0 ? (
              <section className="space-y-4">
                <h3 className="font-baloo text-xl md:text-2xl font-bold text-secondary-900">Quartos</h3>
                <div className="space-y-4">
                  {rooms.map((room, index) => {
                    const reservationStatus = parseReservationStatus(room.reservationStatus);
                    const paymentStatus = parsePaymentStatus(room.paymentStatus);
                    const board = roomBoardLabel(room);
                    return (
                      <div
                        key={`${room.name}-${index}`}
                        className="rounded-2xl border border-secondary-200 bg-white overflow-hidden"
                      >
                        <div className="md:grid" style={{ gridTemplateColumns: "35% 65%" }}>
                          <div className="relative w-full h-44 md:h-full min-h-[11rem] bg-secondary-100">
                            <Image
                              src={imageUrl(room.coverImage)}
                              alt={room.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 320px"
                            />
                          </div>
                          <div className="p-5 md:p-6 min-w-0">
                            <p className="font-baloo text-lg font-bold text-secondary-900">{room.name}</p>
                            {board ? (
                              <p className="font-comfortaa text-sm text-secondary-700 mt-1">{board}</p>
                            ) : null}
                            {room.description ? (
                              <div
                                className="prose prose-sm max-w-none text-secondary-700 mt-3 [&_*]:text-secondary-700"
                                dangerouslySetInnerHTML={{ __html: room.description }}
                              />
                            ) : null}
                          </div>
                        </div>

                        <div className="px-5 pb-6 md:px-6 md:pb-7 border-t border-secondary-100 pt-5 space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {reservationStatus ? (
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${accommodationReservationPillClass(reservationStatus)}`}
                              >
                                {translateAccommodationReservationStatus(reservationStatus)}
                              </span>
                            ) : null}
                            {paymentStatus ? (
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${accommodationPaymentPillClass(paymentStatus)}`}
                              >
                                {translateAccommodationPaymentStatus(paymentStatus)}
                              </span>
                            ) : null}
                          </div>

                          {room.adults != null || room.children != null ? (
                            <p className="font-comfortaa text-sm text-secondary-600">
                              {room.adults != null
                                ? `Para ${room.adults} adulto${room.adults === 1 ? "" : "s"}`
                                : ""}
                              {room.children != null && room.children > 0
                                ? `${room.adults != null ? " · " : ""}${room.children} criança${room.children === 1 ? "" : "s"}`
                                : ""}
                            </p>
                          ) : null}

                          {room.externalReservationId ? (
                            <p className="font-comfortaa text-xs text-secondary-500">
                              Reserva externa:{" "}
                              <span className="font-semibold">{room.externalReservationId}</span>
                            </p>
                          ) : null}

                          {room.reservationStatusReason ? (
                            <p className="font-comfortaa text-xs text-secondary-600">{room.reservationStatusReason}</p>
                          ) : null}

                          {room.cancellationPolicy ? (
                            <p className="font-comfortaa text-xs text-secondary-600">{room.cancellationPolicy}</p>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

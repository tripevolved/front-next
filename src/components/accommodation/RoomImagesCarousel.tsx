"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

import type { PublicAccommodationImage } from "@/core/types/accommodations";

export function RoomImagesCarousel({ images, title }: { images: PublicAccommodationImage[]; title: string }) {
  const urls = useMemo(() => (images ?? []).map((i) => i.url?.trim()).filter(Boolean) as string[], [images]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [title, urls.join("|")]);

  const goPrev = useCallback(() => {
    if (urls.length <= 1) return;
    setIndex((i) => (i - 1 + urls.length) % urls.length);
  }, [urls.length]);

  const goNext = useCallback(() => {
    if (urls.length <= 1) return;
    setIndex((i) => (i + 1) % urls.length);
  }, [urls.length]);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 40;

  if (urls.length === 0) {
    return (
      <div className="relative w-full h-44 md:h-52 bg-secondary-100">
        <Image src="/assets/blank-image.png" alt={title} fill className="object-cover" />
      </div>
    );
  }

  if (urls.length === 1) {
    return (
      <div className="relative w-full h-44 md:h-52 bg-secondary-100">
        <Image src={urls[0]} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-44 md:h-52 bg-secondary-100"
      onTouchStart={(e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
      }}
      onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
      onTouchEnd={() => {
        if (touchStart == null || touchEnd == null) return;
        const distance = touchStart - touchEnd;
        if (distance > minSwipeDistance) goNext();
        if (distance < -minSwipeDistance) goPrev();
        setTouchStart(null);
        setTouchEnd(null);
      }}
    >
      {urls.map((url, i) => (
        <div
          key={`${url}:${i}`}
          className={`absolute inset-0 transition-opacity duration-500 ${i === index ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          <Image
            src={url}
            alt={`${title} - Foto ${i + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={i === 0}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={goPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-white/90 border border-secondary-200 text-secondary-800 shadow-sm hover:bg-white"
        aria-label="Foto anterior"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={goNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-white/90 border border-secondary-200 text-secondary-800 shadow-sm hover:bg-white"
        aria-label="Próxima foto"
      >
        ›
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {urls.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === index ? "bg-white" : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Ir para a foto ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

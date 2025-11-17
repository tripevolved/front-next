"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";
import * as pixel from "@/utils/libs/fpixel";

export type EventType =
  | "pageview"
  | "pre_agendar"
  | "agendar"
  | "pre_assinar_newsletter"
  | "assinar_newsletter"
  | "pre_descobrir_viagem"
  | "descobrir_viagem"
  | "entrar";

const FacebookPixel = () => {
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!loaded) return;

    pixel.pageview();
  }, [pathname, loaded]);

  return (
    <Script
      id="fb-pixel"
      src="/scripts/pixel.js"
      strategy="afterInteractive"
      onLoad={() => setLoaded(true)}
      data-pixel-id={pixel.FB_PIXEL_ID}
    />
  );
};

export default FacebookPixel;
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { ItineraryItem } from "@/components/itineraries/ItineraryContent";

type ItineraryScrollContextValue = {
  itinerary: ItineraryItem[];
  activeItem: number | null;
  showItemNav: boolean;
  scrollToSection: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
  setItemRef: (index: number, el: HTMLElement | null) => void;
  setItemOneRef: (el: HTMLElement | null) => void;
};

const ItineraryScrollContext = createContext<ItineraryScrollContextValue | null>(null);

export function useItineraryScroll() {
  const ctx = useContext(ItineraryScrollContext);
  if (!ctx) {
    throw new Error("useItineraryScroll must be used within ItineraryScrollProvider");
  }
  return ctx;
}

type ProviderProps = {
  itinerary: ItineraryItem[];
  children: ReactNode;
};

export function ItineraryScrollProvider({ itinerary, children }: ProviderProps) {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [showItemNav, setShowItemNav] = useState(false);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const itemOneRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = entry.target.id;
            const itemNumber = parseInt(itemId.split("-")[1], 10);
            if (!Number.isNaN(itemNumber)) setActiveItem(itemNumber);
          }
        });
      },
      { threshold: 0.5 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      itemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [itinerary.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowItemNav(true);
          } else if (entry.boundingClientRect.top > 0) {
            setShowItemNav(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    const el = itemOneRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [itinerary.length]);

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  }, []);

  const setItemRef = useCallback((index: number, el: HTMLElement | null) => {
    itemRefs.current[index] = el;
  }, []);

  const setItemOneRef = useCallback((el: HTMLElement | null) => {
    itemOneRef.current = el;
  }, []);

  return (
    <ItineraryScrollContext.Provider
      value={{
        itinerary,
        activeItem,
        showItemNav,
        scrollToSection,
        setItemRef,
        setItemOneRef,
      }}
    >
      {children}
    </ItineraryScrollContext.Provider>
  );
}

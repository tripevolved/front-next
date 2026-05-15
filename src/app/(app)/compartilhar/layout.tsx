import type { Metadata } from "next";

/** Private share links — must not be indexed or followed by crawlers. */
export const metadata: Metadata = {
  title: "Itinerário compartilhado",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function CompartilharLayout({ children }: { children: React.ReactNode }) {
  return children;
}
